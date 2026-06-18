const webpack = require('@nativescript/webpack')

module.exports = (env) => {
  webpack.init(env)

  // Usa la configuración para aplicaciones Angular.
  webpack.useConfig('angular')

  return webpack.resolveConfig()
}
