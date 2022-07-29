const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('', {
    target: 'https://www.kuaikanmanhua.com',
    changeOrigin: true,
});

module.exports = function (app) {
    app.use(apiProxy);
};