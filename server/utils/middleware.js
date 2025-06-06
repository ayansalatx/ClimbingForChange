import logger from "./logger.js";

export const requestLogger = (request, _response,next) => {
    logger.info("Method: ", request.method);
    logger.info("Path: ", request.path);
    logger.info("Body: ", request.body);
    logger.info("---------");
    next();
};
