import express from "express";
import accsRouter from "./routes/accounts_routes.js";
import { promises as fs } from "fs";
import winston from "winston";
import cors from "cors";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "mybank-api.log" }),
    ],
    format: combine(label({ label: "mybank-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/account", accsRouter);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        console.log("Server running on port 3000");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: [],
        };
        writeFile(global.fileName, JSON.stringify(initialJson))
            .then(() => {
                console.log("Server running on port 3000 and File Created!");
            })
            .catch((err) => {
                console.log(err);
            });
    }
});
