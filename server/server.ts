//Module imports
import dontenv from "dotenv";
dontenv.config();

import fs from "fs";
import http, { Server } from "http";
import https from "https";

//Config imports
import app from "./app";

import { mongoConnect } from "./services/mongo";
import { redisConnect } from "./services/redis";
const PORT = process.env.PORT || 8080;

// Decide whether to use HTTPS (for local development) or HTTP (for production)
let server: Server;

if (process.env.NODE_ENV === "production") {
  // In production, only use the HTTP server since Render manages HTTPS for you
  server = http.createServer(app);
} else {
  // In development, you can use the HTTPS server with self-signed certificates
  const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  };
  server = https.createServer(options, app);
}

// Start server and connect to databases
async function startServer() {
  await mongoConnect();
  await redisConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
