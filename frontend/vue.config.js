const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

/*
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
    devServer: {
        proxy: {
            '/test_recup.php': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
};*/
