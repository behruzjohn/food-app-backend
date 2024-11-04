const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp:
        /^.*(kerberos|aws4|snappy|socks|gcp-metadata|@aws-sdk\/credential-providers|@mongodb-js\/zstd|mongodb-client-encryption).*$/,
    }),
  ],
};
