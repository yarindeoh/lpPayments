'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const DEV = process.argv[1].indexOf('webpack-dev-server') >= 0;
const apiMocker = require('webpack-api-mocker');

module.exports = () => {
    let srcPath = [path.resolve(__dirname, 'src')];
    let modulePath = [path.resolve('.'), path.join(__dirname, 'node_modules')];

    let webpackConfig = {
        performance: { hints: false },
        mode: DEV ? 'development' : 'production',
        entry: __dirname + '/src/index.js',
        devtool: DEV ? 'eval-source-map' : 'none',
        resolve: {
            modules: modulePath,
            alias: {
                common: path.resolve(__dirname, 'src/common'),
                utils: path.resolve(__dirname, 'src/utils')
            }
        },
        output: {
            path: path.resolve(__dirname, '/dist'),
            publicPath: '/',
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: srcPath,
                    use: [{ loader: 'babel-loader' }]
                },
                {
                    test: /\.(js|jsx)$/,
                    loader: 'source-map-loader',
                    include: srcPath,
                    enforce: 'pre'
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                output: { path: path.join(__dirname, 'dist') }
                            }
                        }
                    ],
                    include: [/resources/, path.join(__dirname, 'node_modules')]
                },
                {
                    test: /\.(jpg|png|gif|svg|ico|ttf|woff|woff2)(\?.*)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
        },
        plugins: [
            new DefinePlugin({
                DEBUG: DEV === true
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: __dirname + '/index.html'
            })
        ],
        devServer: {
            before(app) {
                apiMocker(app, path.resolve('./mockers/index.js'), {});
            },
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        }
    };

    return webpackConfig;
};
