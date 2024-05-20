const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    authenticationPage: './src/authenticationPage.js',
    chat: './src/chat.js',
    contacts: './src/contacts.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  devtool: "inline-source-map",
  // for live server reload
  devServer: {
    static: "./src",
  },
  optimization: {
    runtimeChunk: "single",
  },

  // grab html template from src
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login.html',
      chunks: ['authenticationPage'],
    }),
    new HtmlWebpackPlugin({
      filename: 'chat.html',
      template: './src/chat.html',
      chunks: ['chat'],
    }),
    new HtmlWebpackPlugin({
      filename: 'contacts.html',
      template: './src/contacts.html',
      chunks: ['contacts'],
    }),
  ],
  // importing css allowed
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
