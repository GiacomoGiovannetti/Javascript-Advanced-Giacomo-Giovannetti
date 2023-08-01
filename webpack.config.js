const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/Js/index.js",
     output:{
      assetModuleFilename: '[name][ext]',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        open: true,
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(?:png|jpg|jpeg|svg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                use: 'svg-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template : 'src/template.html',
            favicon : 'src/assets/logo-g-favicon.svg',
        })
    ]
}