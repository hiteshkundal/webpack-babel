const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: ['webpack-hot-middleware/client?reload=true', path.resolve(__dirname, '../src/main.js')]
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        hot: true,
        contentBase: path.resolve(__dirname, '../dist'),
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [
                    { loader: 'babel-loader' }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.html/,
                use: [
                    { loader: 'html-loader' }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:8]'
                            }
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ]
}