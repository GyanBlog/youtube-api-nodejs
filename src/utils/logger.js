/**
 * Created by gsingal on 6/23/17.
 */
const winston = require('winston');
const config = require('../config/configuration');
require('winston-daily-rotate-file');

const loggingLevel = process.env.APP_DEBUG || 'info';

module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: loggingLevel,
            timestamp: true
        }),
        new winston.transports.DailyRotateFile({
            filename: config.get('filePath.logsFolder') + '/gyanemails.log',
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            level: loggingLevel
        })
    ]
});
