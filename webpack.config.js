/* ------------------------------ Dependencies ------------------------------ */
const nodeExternals = require('webpack-node-externals')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')
const TerserPlugin = require('terser-webpack-plugin')
/* -------------------------------------------------------------------------- */

const { NODE_ENV = 'production' } = process.env

module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    target: 'node',
    watch: false,
    externals: [nodeExternals()],
    output: {
        path: process.cwd(),
        filename: 'index.js',
    },
    resolve: { extensions: ['.ts', '.json'] },
    module: { rules: [{ test: /\.ts$/, use: ['ts-loader'] }] },
    plugins: [new WebpackShellPluginNext({ onAfterDone: { scripts: ["echo 'Build complete!'"] } })],
    optimization: { minimize: false, minimizer: [new TerserPlugin()] },
}
