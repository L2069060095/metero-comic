const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/v', {
<<<<<<< HEAD
    target: 'https://www.kuaikanmanhua.com/',
=======
    target: 'https://www.kuaikanmanhua.com',
>>>>>>> origin/xf
    changeOrigin: true,
});

module.exports = function (app) {
    app.use(apiProxy);
};