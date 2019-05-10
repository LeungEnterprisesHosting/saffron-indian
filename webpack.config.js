const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const srcRoot = path.join(__dirname, 'src');
const distRoot = path.join(__dirname, 'dist');

module.exports = (env, options) => {
  const isProd = options.mode === 'production';
  return {
    entry: {
      main: path.join(srcRoot, 'index.js'),
      home: path.join(srcRoot, 'js', 'home.js'),
      specials: path.join(srcRoot, 'js', 'specials.js'),
    },
    output: {
      path: distRoot,
      filename: isProd ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].css',
      }),
      new HtmlWebpackPlugin({
        filename: 'about.html',
        template: path.join(srcRoot, 'about.jade'),
        chunks: ['vendor', 'main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'ambler.html',
        template: path.join(srcRoot, 'ambler.jade'),
        chunks: ['vendor', 'main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'bala-cynwyd.html',
        template: path.join(srcRoot, 'bala-cynwyd.jade'),
        chunks: ['vendor', 'main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'dinner.html',
        template: path.join(srcRoot, 'dinner.jade'),
        chunks: ['vendor', 'main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(srcRoot, 'home.jade'),
        chunks: ['vendor', 'main', 'home'],
      }),
      new HtmlWebpackPlugin({
        filename: 'lunch.html',
        template: path.join(srcRoot, 'lunch.jade'),
        chunks: ['vendor', 'main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'press.html',
        template: path.join(srcRoot, 'press.jade'),
        chunks: ['vendor', 'main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'specials.html',
        template: path.join(srcRoot, 'specials.jade'),
        chunks: ['vendor', 'main', 'specials'],
      }),
      new HtmlWebpackPlugin({
        filename: 'wayne.html',
        template: path.join(srcRoot, 'wayne.jade'),
        chunks: ['vendor', 'main'],
      }),
      new CopyPlugin([
        {
          from: path.join(srcRoot, 'specials-data'),
          to: path.join(distRoot, 'specials-data'),
        },
        {
          from: path.join(srcRoot, 'uploads'),
          to: path.join(distRoot, 'uploads'),
        },
        {
          from: path.join(srcRoot, 'icons'),
          to: path.join(distRoot, 'icons'),
        },
        {
          from: path.join(srcRoot, 'sitemap.xml'),
          to: path.join(distRoot, 'sitemap.xml'),
        },
      ]),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        { test: /\.jade$/, loader: 'pug-loader' },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.styl$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'stylus-loader',
          ],
        },
        {
          test: /\.(xml|ico|ttf|woff|woff2|eot)$/,
          use: 'file-loader',
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
            },
          ],
        },
        {
          type: 'javascript/auto',
          test: /\.json$/,
          use: 'file-loader',
          exclude: /node_modules/,
        },
        {
          test: require.resolve('jquery'),
          use: [
            {
              loader: 'expose-loader',
              options: 'jQuery',
            },
          ],
        },
      ],
    },
    optimization: isProd
      ? {
        splitChunks: {
          chunks: 'all',
          name: 'vendor',
        },
        minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
      }
      : {},
  };
};
