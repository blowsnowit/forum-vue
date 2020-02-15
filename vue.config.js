const webpack = require('webpack')

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  },
}
