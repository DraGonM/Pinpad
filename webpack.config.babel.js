const Config = require('webpack-config').default

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

module.exports = new Config().extend(`configs/webpack.${process.env.NODE_ENV}.config.js`)