const express = require('express');
const { correlation_id_middleware } = require('./correlation-id.middleware');
const logger = require('./logger');

const app = express();

app.use(express.json());
app.use(correlation_id_middleware);

app.get('/orders/:id', async (req, res) => {
    logger.info('Order request started', {
        order_id: req.params.id,
    });

    await fake_service_call(req.params.id);

    logger.info('Order request finished', {
        order_id: req.params.id,
    });

    res.json({
        order_id: req.params.id,
    });
});

async function fake_service_call(order_id) {
    logger.info('Loading order from database', {
        order_id,
    });

    await new Promise(resolve => setTimeout(resolve, 100));

    logger.info('Order loaded from database', {
        order_id,
    });
}

app.listen(3000, () => {
    logger.info('Server started', {
        port: 3000,
    });
});
