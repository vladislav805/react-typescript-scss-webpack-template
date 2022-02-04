const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const mode = isProduction ? 'production' : 'development';

module.exports = {
    mode,
    target: 'web',
    entry: {
        main: path.resolve('src', 'index.tsx'),
    },
    output: {
        path: path.resolve('dist'),
        filename: 'static/js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/i,
                use: [
                    // In production version put css to separate file; in dev - inside one js chunk
                    isProduction
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp3|webp|ogg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                type: 'asset/inline',
            },
        ],
    },
    resolve: {
        // .js needs webpack for dev-server
        extensions: ['.tsx', '.ts', '.js'],

        plugins: [
            // Pulls the paths from tsconfig.json to resolve.alias
            new TsconfigPathsPlugin(),
        ],
    },
    optimization: {
        minimize: isProduction,
        minimizer: [
            new TerserPlugin({
                // Do not create separate .txt files with licences
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            VERSION: process.env.npm_package_version,
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css?ncrnd=[contenthash:8]',
            chunkFilename: 'static/css/[id].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('public', 'index.html'),
            chunks: ['main'],
            minify: true,
            filename: 'index.html',
        }),
    ],
    devtool: isProduction ? undefined : 'source-map',
    stats: isProduction ? 'minimal' : 'errors-only',
    devServer: {
        host: 'local-ip',
        port: 8080,
        allowedHosts: 'all',
        hot: true,
        static: {
            directory: path.resolve('dist'),
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
};
