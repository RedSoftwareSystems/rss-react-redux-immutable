const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const NpmInstallWebpackPlugin = require("npm-install-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");


const path = require('path');

const webpack = require("webpack");

const commonAppEntry = ['babel-polyfill', 'whatwg-fetch'];

const isProd = process.env.NODE_ENV === "production";



console.log(`building for profuction: ${isProd}`);


const wpClientPort = 3000,
    wpClientHost = "localhost";

const entry = {
    // vendor: ['babel-polyfill', 'whatwg-fetch'],
    app: isProd ?
        commonAppEntry.concat(['./src/index.js']) :
        commonAppEntry.concat([
            //'react-hot-loader/patch',
            // activate HMR for React
            `webpack-dev-server/client?http://${wpClientHost}:${wpClientPort}`,
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            './src/index.js',
            // the entry point of our app
        ])

};


const styleLessLoaders = [
    {loader: 'style-loader'},
    {loader: 'css-loader'},
    {
        loader: './devless-loader',
        options: {
            inject: [
                '@import "~antd/lib/style/themes/default.less";',
                '@import "~www/style/variables.less";'
            ],
            javascriptEnabled: true
        }
    }];

const htmlContent = [
    "index.html",
].map(page => new HtmlWebpackPlugin({
    filename: page,
    template: `./src/www/templates/${page}`,
    inject: true
}));

const webpackConfig = {
    devtool: isProd ? undefined : 'source-map',
    entry,

    // the resulting Javascript file, bundled by Webpack
    output: {
        filename: `js/[name].bundle.[hash].js`,
        path: path.join(__dirname, "./dist/"),
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, "./src/app"),
            www: path.resolve(__dirname, "./src/www"),
        },
        extensions: [".js", ".json", ".jsx", ".css", ".less", ".scss"],
    },
    module: {
        rules: [

            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false,
                        removeComments: true,
                        collapseWhitespace: true,
                        interpolate: true,
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    'postcss-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // This is a feature of `babel-loader` for Webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        cacheDirectory: true,
                        plugins: isProd ? undefined : ['react-hot-loader/babel'],
                    },
                },
                exclude: /node_modules/
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: `[name].[ext]`,
                    useRelativePath: true,
                },
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: {
                    loader: "file-loader",

                    options: {

                        name: `[path][name].[ext]`,
                        useRelativePath: true,

                    },
                },
                exclude: /node_modules/
            },
        ]
    },
    // the place where you configure which plugins Webpack will use
    plugins: htmlContent
        .concat([
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]),

    devServer: {
        host: wpClientHost,
        port: wpClientPort,
        https: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        // proxy: {
        //     "/rest/v1": {
        //         target: "http://localhost:3080",
        //         changeOrigin: true,
        //         cookieDomainRewrite: 'localhost',
        //         autoRewrite: true,
        //     },
        //     "/auth": {
        //         target: "http://localhost:3080",
        //         changeOrigin: true,
        //         cookieDomainRewrite: 'localhost',
        //         autoRewrite: true,
        //
        //     }
        // },
        historyApiFallback: true,
        // respond to 404s with index.html

        hot: true
        // enable HMR on the server
    }
};

module.exports = webpackConfig;
