import { resolve } from 'node:path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const mode = isProduction ? 'production' : 'development';

export default {
    mode,
    target: 'web',
    entry: {
        main: resolve('src', 'index.tsx'),
    },
    output: {
        path: resolve('dist'),
        filename: './static/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'swc-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/i,
                use: [
                    // In production version put css to separate file; in dev - inside one js chunk
                    isProduction
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    'css-loader',
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
            filename: 'static/[name].css?ncrnd=[contenthash:8]',
            chunkFilename: './static/[id].css',
        }),
        new HtmlWebpackPlugin({
            template: resolve('public', 'index.html'),
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
            directory: resolve('dist'),
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
};
