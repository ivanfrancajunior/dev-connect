import express from "express";
import dotenv from "dotenv";
dotenv.config();
const server = express();

server.use(express.json());

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("server running on port", PORT);
});

server.get("/api", (req, res) => {
  res.json({ message: "hello world!" });
});
