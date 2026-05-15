const pino = require('pino');
const { get_context } = require('./context');

const transport = pino.transport({
    target: 'pino-pretty',
    options: {
        destination: './logs/app.log',
        mkdir: true,
        colorize: false,
        singleLine: false,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
    },
});

const base_logger = pino(
    {
        level: 'info',
    },
    transport
);

function info(message, data = {}) {
    base_logger.info(
        {
            ...get_context(),
            ...data,
        },
        message
    );
}

function error(message, data = {}) {
    base_logger.error(
        {
            ...get_context(),
            ...data,
        },
        message
    );
}

module.exports = {
    info,
    error,
};