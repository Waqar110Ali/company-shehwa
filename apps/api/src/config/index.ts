import app from "./app.config";
import database from "./database.config";
import jwt from "./jwt.config";

export default [
    () => ({
        app: {
            port: parseInt(process.env.PORT ?? "5000", 10),

            clientUrl: process.env.CLIENT_URL,
        },

        database: {
            uri: process.env.MONGODB_URI,
        },

        jwt: {
            secret: process.env.JWT_SECRET,

            refreshSecret:
                process.env.JWT_REFRESH_SECRET,

            expiresIn:
                process.env.JWT_EXPIRES ??
                "15m",

            refreshExpiresIn:
                process.env.JWT_REFRESH_EXPIRES ??
                "30d",
        },

        ai: {
            geminiKey: process.env.GEMINI_API_KEY,
        },
    }),
];