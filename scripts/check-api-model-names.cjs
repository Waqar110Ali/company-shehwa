// Run after the API bundle build: node scripts/check-api-model-names.cjs
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const Module = require('node:module');
const mongoose = require('mongoose');

// ConfigModule validates env values while importing the bundle. Use dummy
// values for this offline check; Nest and the database connection never start.
process.env.CLIENT_URL = 'http://localhost:5173';
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/offline-model-check';
process.env.JWT_SECRET = 'offline-model-check-secret-32-characters';
process.env.JWT_REFRESH_SECRET = 'offline-model-check-refresh-32-characters';

const bundlePath = resolve(__dirname, '../api/index.js');
const compiled = new Module(bundlePath, module);
compiled.filename = bundlePath;
compiled.paths = Module._nodeModulePaths(resolve(__dirname, '../api'));
// Expose schema classes in this isolated test module without starting Nest.
compiled._compile(readFileSync(bundlePath, 'utf8') +
  '\nmodule.exports.modelNameCheck = { User, UserSchema, Message, MessageSchema };', bundlePath);
const schemas = compiled.exports.modelNameCheck;
const connection = mongoose.createConnection();
try {
  for (const [name, collection] of [['User', 'users'], ['Message', 'messages']]) {
    assert.equal(schemas[name].name, name, `${name} class name changed in the bundle`);
    const model = connection.model(schemas[name].name, schemas[`${name}Schema`]);
    assert.equal(model.collection.name, collection, `${name} points at the wrong collection`);
  }
  console.log('Bundled User and Message models use the original collection names.');
} finally {
  connection.destroy();
}
