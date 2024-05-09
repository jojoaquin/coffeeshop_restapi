import web from "./application/web.js"
import logger from "./application/logging.js";
import dotenv from "dotenv"

dotenv.config({path: "../.env"})

web.listen(process.env.PORT, () => {
  logger.info(`Listen in PORT ${process.env.PORT}`)
});
