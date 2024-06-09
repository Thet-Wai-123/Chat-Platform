const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    authenticationPage: './src/authenticationPage.js',
    friendChat: './src/friendChat.js',
    contacts: './src/contacts.js',
    groupChat: './src/groupChat.js'
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
      filename: 'friendChat.html',
      template: './src/friendChat.html',
      chunks: ['friendChat'],
    }),
    new HtmlWebpackPlugin({
      filename: 'contacts.html',
      template: './src/contacts.html',
      chunks: ['contacts'],
    }),
    new HtmlWebpackPlugin({
      filename: 'groupChat.html',
      template: './src/groupChat.html',
      chunks: ['groupChat'],
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
