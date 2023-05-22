module.exports = {
  lintOnSave: false,//关闭语法检查
  runtimeCompiler: true,
  publicPath: "./",// 需要配置 否则打包后的apk文件安装在手机可能白屏


  devServer: {
    hot: true,//自动保存
    // port: "10025", // 配置开发服务器的端口号（打包可以无需配置） 
    // 配置跨域代理(也可以使用CROS解决跨域)
    proxy: {
      "/api": {
        // target: "http://localhost:10025", // 目标服务器地址
        target: "http://146.56.223.16:10025", // 目标服务器地址
        ws: true, // 是否代理websocket
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // "^/api": 'http://localhost:10025' // url重写
          "^/api": '' // url重写
        }
      }
    },
    // https: true
  },
  configureWebpack: {
    devtool: 'source-map'
  },
}