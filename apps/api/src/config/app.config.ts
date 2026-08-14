export default () => ({
  port: parseInt(process.env.PORT ?? "5000", 10),

  nodeEnv: process.env.NODE_ENV,

  clientUrl: process.env.CLIENT_URL,
});