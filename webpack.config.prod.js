const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'prod'),
        // new contenthash will alert browser that js has changed so 
        // it will not cache it.
        filename: 'js/[name].[contenthash].js',
        // clean the dev directory of old files
        clean: true,
        assetModuleFilename: 'img/[name][ext]',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'prod')
        },
        port: 3030,
        // opens the webpage immediately on startup
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Does the work of style-loader and 
                    // separates the css file from js bundle
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource' 
            }
        ]
    },
    plugins: [
        // modifies index.html and keeps it current
        new HtmlWebpackPlugin({
            title: 'Estee Lauder',
            filename: 'index.html',
            template: 'src/template.html'
        }),
        // remove css from js bundle
        new MiniCssExtractPlugin({
            filename: 'css/main.[contenthash].css',
          }),
    ]
}