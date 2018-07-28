const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  context: __dirname,
  devtool: 'source-map', // create source map so you can easily debug minified js files

  entry: {
    home: ['babel-polyfill', `${__dirname}/src/home.js`],
    register: ['babel-polyfill', `${__dirname}/src/register.js`], // 모카로 테스팅 하는 방법 예시
    ppt: ['babel-polyfill', `${__dirname}/src/ppt.js`],
    login: ['babel-polyfill', `${__dirname}/src/login.js`],
  },

  output: {
    path: `${__dirname}/assets/js`,
    filename: '[name].js',
    sourceMapFilename: '[name].map',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },

  node: {
    dns: 'mock',
    net: 'mock',
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],

};
