const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(commonConfiguration, {
    mode: 'production',
    plugins: [new CleanWebpackPlugin()],
    performance: {
        maxAssetSize: 10000000, // 10 MB
        maxEntrypointSize: 10000000, // 10 MB
        hints: 'warning', // Or 'error' if you want to treat the warnings as errors
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
            new CssMinimizerPlugin(),
        ],
    },
});
