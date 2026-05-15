const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

function run_with_context(context, callback) {
    return asyncLocalStorage.run(context, callback);
}

function get_context() {
    return asyncLocalStorage.getStore() || {};
}

module.exports = {
    run_with_context,
    get_context,
};