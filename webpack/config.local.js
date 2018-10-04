const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const build = require('./../build.settings');
const babelConfig = require('./babelConfig');

const DIST_DIR = path.resolve(__dirname, '../dist');

babelConfig.presets.push('react-hmre');
babelConfig.plugins.push(
  ['react-transform', {
    transforms: [{
      transform: 'react-transform-hmr',
      imports: ['react'],
      locals: ['module'],
    }, {
      transform: 'react-transform-catch-errors',
      imports: ['react', 'redbox-react'],
    }],
  }],
);

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: ['./src/index.js'],
  },
  output: {
    path: DIST_DIR,
    publicPath: '/', // 為了配合React routeParams，讓js檔案從根目錄存取
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
        ],
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)(\?*[a-z|A-Z|0-9]*)$/,
        use: ['url?prefix=font/&limit=5000'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery',
        }, {
          loader: 'expose-loader',
          options: '$',
        }],
      },
      {
        test: /\.mp4$/,
        use: ['url?limit=100000&mimetype=video/mp4'],
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.js', '.css', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.tpl',
      inject: 'body',
      chunks: ['bundle'],
      filename: 'index.html',
    }),
    new ProgressPlugin((percentage, msg) => {
      process.stdout.write((percentage * 100).toFixed(0) + '% ' + msg + '\r');
    }),

    build.defineJsConstants(),
  ],
};

