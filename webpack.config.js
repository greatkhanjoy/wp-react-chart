// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'postcss-loader',
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: 'styles.css',
//     }),
//   ],
//   devServer: {
//     contentBase: path.join(__dirname, 'public'),
//     port: 3000,
//     open: true,
//   },
// };



const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    open: true,
  },
};
