import express from "express";
import { router } from "./routes";
import path from "path";
import "dotenv/config";

const server = express();

server.use(express.json());

server.use(express.static(path.join(__dirname, "../public")));

server.use('/api', router);

// Iniciar o servidor
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { server };
