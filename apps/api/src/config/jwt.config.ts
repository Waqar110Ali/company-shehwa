export default () => ({
  secret: process.env.JWT_SECRET,

  expiresIn:
    process.env.JWT_EXPIRES ?? "15m",

  refreshSecret:
    process.env.JWT_REFRESH_SECRET,

  refreshExpiresIn:
    process.env.JWT_REFRESH_EXPIRES ??
    "30d",
});