const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BrotliWebpackPlugin = require('brotli-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (env) => ({
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, '../src/main.js'),
        other: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
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
                    { loader: MiniCssExtractPlugin.loader },
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
        new UglifyWebpackPlugin(),
        // new BabelMinifyWebpackPlugin(),
        new OptimizeCssPlugin(),
        new MiniCssExtractPlugin('[name]-[contenthash].css'),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env.NODE_ENV)
            }
        }),
        new CompressionWebpackPlugin({
            algorithm: 'gzip'
        }),
        new BrotliWebpackPlugin(),
        new BundleAnalyzer({
            generateStatsFile: true
        })
    ]
})