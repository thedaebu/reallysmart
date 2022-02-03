const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./frontend/entry.tsx",
  // entry: "./frontend/entry.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            happyPackMode: true,
            configFile: path.resolve(__dirname, 'tsconfig.json')
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  }
};
