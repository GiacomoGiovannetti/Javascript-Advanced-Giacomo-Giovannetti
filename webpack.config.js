const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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