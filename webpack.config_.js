const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require("webpack");
const isDevelop = NODE_ENV == "development";

module.exports = {
    context: __dirname + '/frontend',
    entry: {
        home: "./main",
    },
    output: {
        path: __dirname + '/public',
        filename: "[name].js",
        library: "name"
    },
    watch: isDevelop,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: isDevelop && "source-map",
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            // колличество точек сборки в которых должен использоваться
            // модуль для его вынесения о общие
            minChunks: 3
        })
    ],
    module: {
        loaders: [

            /* Замечу, что это видео - про Babel5. Для Babel6 нужно поставить:
             npm i babel-core babel-loader babel-preset-es2015
             И затем подключить лоадер babel?presets[]=es2015﻿*/
            { test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
                exclude: /node_modules/
            },
            // { test: /\.css$/, loader: "style!css" },
            // { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url?limit=8192' },
            // { test: /\.(otf|eot|ttf)$/, loader: "file?prefix=font/" },
            // { test: /\.svg$/, loader: "file" }
        ],
    },
    resolve: {
        modelsDirectories: ["node_modules"],
        extentions: ['', '.js']
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}