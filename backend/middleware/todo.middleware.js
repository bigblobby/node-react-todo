const fs = require('fs');

const logger = (req, res, next) => {
    let data = '['+ new Date() + '] A request to ' + req.originalUrl + ' was made\n';

    fs.appendFile('logs/log.txt', data, (err) => {
        // Ignore 'err', silently fail
        next();
    });
};

module.exports = {
    logger: logger
};
