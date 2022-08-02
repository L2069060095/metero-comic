const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/v', {
    target: 'https://www.kuaikanmanhua.com/',
    changeOrigin: true,
    pathRewrite: {// 重写接口路径
        '^/api': '',// 把/api变为空字符
      
    }
});

const apiProxy2 = createProxyMiddleware('/test', {
    target: 'https://m.kuaikanmanhua.com/',
    changeOrigin: true,
    pathRewrite: {// 重写接口路径
        '^/test': '',// 把/api变为空字符
        
    }
});

module.exports = function (app) {
    app.use(apiProxy,apiProxy2);
};

