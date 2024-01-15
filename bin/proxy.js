const Express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = Express.Router();

const LOG_LEVEL = process.env.PROXY_LOG_LEVEL || 'debug'; // ['debug', 'info', 'warn', 'error', 'silent']

router.use('/api', createProxyMiddleware({
  changeOrigin: true,
  //pathRewrite: { '^/api': '' },
  target: 'http://localhost:7003',
  logLevel: LOG_LEVEL,
}));

module.exports = router;
