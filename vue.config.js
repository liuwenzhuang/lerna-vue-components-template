const webpack = require('webpack')
const path = require('path')

const isProductionMode = process.env.NODE_ENV === 'production'

function getPublicPath() {
  return isProductionMode ? '/public/' : '/'
}

const css = {
  loaderOptions: {
    less: {
      javascriptEnabled: true,
    },
    postcss: {
      plugins: [
        require('autoprefixer')({
          grid: 'autoplace',
        }),
      ],
    },
  },
}

const devServer = {
  port: 8080,
}

const pluginOptions = {
  mock: {
    entry: './mock/index.js',
    debug: true,
    disable: false,
  },
}

module.exports = {
  publicPath: getPublicPath(),
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (!isProductionMode) {
      config.devtool = 'cheap-module-eval-source-map'
      config.output.devtoolModuleFilenameTemplate = (info) =>
        info.resourcePath.match(/\.vue$/) &&
        !info.identifier.match(/type=script/)
          ? `webpack-generated:///${info.resourcePath}?${info.hash}`
          : `webpack-UserCode:///${info.resourcePath}`

      config.output.devtoolFallbackModuleFilenameTemplate =
        'webpack:///[resource-path]?[hash]'
    }
    config.resolve.symlinks = false
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      Packages: path.resolve(__dirname, 'packages'),
      Mock: path.resolve(__dirname, 'mock'),
    }
  },
  chainWebpack: (config) => {
    config
      .plugin('html') // htmlWebpackPlugin 配置
      .tap((options) => {
        options[0].title = 'lerna + Yarn Workspaces管理Vue组件库'
        return options
      })
  },
  css,
  devServer,
  pluginOptions,
  lintOnSave: false,
}
