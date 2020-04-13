module.exports={
  devServer: {
    // host: 'localhost',
    // port: 8020,
    https: false,
    hotOnly: false,
    open: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      '/apiv1': {
        target: 'http://47.95.23.151:18330',
        // target: 'http://192.168.0.66:18330',
        changeOrigin: true,
        pathRewrite: {
          '^/apiv1': '/'
        }
      },
      '/apiv2': {
        target: 'http://47.95.23.151:8130',
        changeOrigin: true,
        pathRewrite: {
          '^/apiv2': '/'
        }
      }
    }
  },
}