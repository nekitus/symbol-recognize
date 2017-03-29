const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require("webpack");
const isDevelop = NODE_ENV == "development";
const path = require('path');


module.exports = {
    context: __dirname + '/frontend',
    entry: {
        main: "./main"
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
    plugins: [
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: 3
        })
    ],

    // resolve: {
    //     modulesDirectories: ["node_modules"],
    //     extentions: ['', '.js']
    // },
    devtool: isDevelop && "source-map",
    module: {
        loaders: [
            /*{ test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
               /!* loaders: [
                    {
                        test: /\.js[x]?$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true,
                            presets: true ? ["react-hmre"] : null
                        }
                    }
                ],*!/
                exclude: /node_modules/
            },*/
            /*{
                test: /\.js[x]?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: "babel",
                query:
                    {
                        presets: ['es2015', 'stage-0', 'react'],
                    }
            },*/
            {
                loader: "babel-loader",
                exclude: /node_modules/,
                // Skip any files outside of your project's `src` directory
                // include: [
                //     path.resolve(__dirname, "src"),
                // ],

                // Only run `.js` and `.jsx` files through Babel
                test: /\.js?$/,

                // Options to configure babel with
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            },

            // {
            //     test: /\.js?$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader?presets[]=es2015'
            // },
            {
                test: /\.json$/,
                // We could restrict using json-loader only on .json files in the
                // node_modules/pixi.js directory, but the ability to load .json files
                // could be useful elsewhere in our app, so I usually don't.
                //include: path.resolve(__dirname, 'node_modules/pixi.js'),
                loader: 'json'
            }
        ],
        postLoaders: [
            {
                include: path.resolve(__dirname, 'node_modules/pixi.js'),
                loader: 'transform?brfs'
            }
        ]
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