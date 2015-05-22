
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:{
    	entryA: "./src/a.js",
    	entryB: "./src/b.js"
    },
    output: {
        path: './build',
        filename: "[name].js",
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "Foo"
    },
    externals: {
    	'jquery' : 'jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
        ]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
    	new CommonsChunkPlugin("commons", "commons.js"),
        new ExtractTextPlugin("[name].css",{allChunks: true})
    ]
};
