const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin'); // Use GenerateSW for service worker

module.exports = () => {
  return {
    mode: 'development', // Change to 'production' for production build
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        template: './install.html',
        filename: 'install.html',
        chunks: ['install'],
      }),
      new WebpackPwaManifest({
        name: 'Progressive Web Application',
        short_name: 'PWA',
        description: 'Description of your app',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          // Add icon configurations here
        ],
      }),
      new GenerateSW({
        swDest: 'service-worker.js', // Output file for the generated service worker
        clientsClaim: true,
        skipWaiting: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
