import express from "express";
import { router } from "./routes";
import path from "path";
import "dotenv/config";

const server = express();

server.use(express.json());

server.use(express.static(path.join(__dirname, "../public")));

server.use(router);

export { server };
