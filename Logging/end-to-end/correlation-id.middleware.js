const { v4: uuidv4 } = require('uuid');
const { run_with_context } = require('./context');

function correlation_id_middleware(req, res, next) {
    const correlation_id = req.headers['x-correlation-id'] || uuidv4();

    res.setHeader('x-correlation-id', correlation_id);

    run_with_context(
        {
            correlation_id,
            method: req.method,
            path: req.originalUrl,
        },
        next
    );
}

module.exports = {
    correlation_id_middleware,
};