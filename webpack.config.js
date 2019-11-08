module.exports = {
    module: {
        loaders: [
            { exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/ },
            { loader: 'style-loader!css-loader', test: /\.css$/ },
            { loader: 'url-loader', test: /\.gif$/ },
            { loader: 'file-loader', test: /\.(ttf|eot|svg)$/ },
        ],
        rules: [
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        alias: {
            config$: './configs/app-config.js',
            react: './vendor/react-master',
        },
        extensions: ['', 'js', 'jsx'],
        modules: [
            'node_modules',
            'bower_components',
            'shared',
            '/shared/vendor/modules',
        ],
    },
};