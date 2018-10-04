const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const build = require('./../build.settings');
const babelConfig = require('./babelConfig');

babelConfig.plugins.push('transform-react-remove-prop-types');
babelConfig.plugins.push('transform-react-pure-class-to-function');

const domainConfig = build.getDomainConfig();
const DIST_DIR = path.resolve(__dirname, '../dist');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: DIST_DIR,
    publicPath: '/', // 為了配合React routeParams，讓js檔案從根目錄存取
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
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
            loader: 'url',
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
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'node-static',
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: 'node-static',
          chunks: 'initial',
          minSize: 1,
        },
      },
    },
  },

  plugins: [
    //new BundleAnalyzerPlugin(),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'bundle.[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new webpack.HashedModuleIdsPlugin(),

    new HtmlWebpackPlugin({
      template: 'static/index.tpl',
      inject: 'body',
      chunks: ['bundle', 'node-static'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      filename: 'index.html',
      timestamp: domainConfig.__TIMESTAMP__,
    }),

    build.defineJsConstants(),
  ],
};
