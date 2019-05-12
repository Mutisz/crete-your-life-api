import createConfig from "./config/config";
import createServer from "./config/server";

const config = createConfig();
const server = createServer(config);

server.start((): void => console.log("Server is running on localhost:4000"));
