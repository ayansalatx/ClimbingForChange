import http from "http";
import app from "./app.js";
import config from "./utils/config.js";

const server = http.createServer(app)

const PORT = config.PORT;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
