const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015",
                            "stage-1"
                        ]
                    }
                },
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "./dist")
            }
        ]
    }
}
