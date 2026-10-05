// Run after npm run build: node --test test/tutorial-auth-flow.test.cjs
require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { TutorialsAuthService } = require('../dist/tutorial/services/tutorials-auth.service');
const { AuthService } = require('../dist/auth/services/auth.service');
const { MailService } = require('../dist/mail/mail.service');

test('emailed temporary password logs in and verification updates the same account', async () => {
  let user;
  let email;
  const users = {
    existsByEmail: async () => false,
    createUser: async (data) => (user = { ...data, id: 'test-user', _id: 'test-user' }),
    saveVerificationToken: async (_, token) => { user.emailVerificationToken = token; },
    findByEmailWithPassword: async (address) => address === user.email ? user : null,
    findByVerificationToken: async (token) => token === user.emailVerificationToken ? user : null,
    verifyEmail: async () => { user.isVerified = true; user.emailVerificationToken = null; },
    resetLoginAttempts: async () => {},
    incrementLoginAttempts: async () => {},
    updateLastLogin: async () => {},
    updateRefreshToken: async () => {},
  };
  const config = {
    get: (key) => key === 'CLIENT_URL' ? 'http://localhost:5173/' : undefined,
    getOrThrow: () => 'http://localhost:5173/',
  };
  const mail = new MailService({ sendMail: async (message) => { email = message; } }, config, users);
  const register = new TutorialsAuthService(users, mail);
  await register.register({ firstName: 'Test', lastName: 'Student', email: 'student@example.test' });
  assert.match(email.context.verificationUrl, /^http:\/\/localhost:5173\/verify-email\/[\w-]+$/);
  assert.notEqual(user.password, email.context.password);

  const auth = new AuthService(users, { signAsync: async () => 'test-jwt' }, config, mail, {
    findByUserId: async () => null,
  });
  const login = await auth.login({ email: user.email, password: email.context.password });
  assert.equal(login.success, true);
  assert.equal(login.data.user.role, 'STUDENT');
  assert.equal(login.data.user.mustChangePassword, true);
  await assert.rejects(auth.login({ email: user.email, password: 'incorrect-password' }), /Invalid email or password/);
  await auth.verifyEmail(user.emailVerificationToken);
  assert.equal(user.isVerified, true);
  await assert.rejects(auth.verifyEmail('invalid-token'), /Invalid verification link/);
});
