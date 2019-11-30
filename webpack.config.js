const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: path.join(__dirname, "src/index.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
            }
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'timeline.css',
      }),
      new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        }
    }
};