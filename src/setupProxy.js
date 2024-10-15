const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.lorcast.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  );
};
