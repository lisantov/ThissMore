const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { sourceMapsEnabled } = require('process');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: path.resolve(__dirname, '..', './src'),
    output: {
        path: path.resolve(__dirname, '..', './dist'),
        filename: production
            ? 'static/scripts/[name].[contenthash].js'
            : 'static/scripts/[name].js',
        publicPath: production
            ? '/ThissMore/'
            : '/',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ ]
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                auto: /\.module\.\w+$/i,
                                namedExport: false,
                            },
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/images/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[hash][ext][query]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/styles/[name].[contenthash].css'
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        })
    ]
}