/* eslint-disable import/no-extraneous-dependencies, no-console, no-unused-vars, consistent-return, max-len */
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./configs/webpack.development.config');

const port = 3000;
const server = 'localhost';

new WebpackDevServer(Webpack(config), {
  hot: true,
  inline: true,
  historyApiFallback: true,
  compress: true,
  open: true
}).listen(port, server, (err, result) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at http://${server}:${port}/`);
});
