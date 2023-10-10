/* ------------------------------ Node Modules ------------------------------ */
const path = require('node:path')
/* ------------------------------ Dependencies ------------------------------ */
const nodeExternals = require('webpack-node-externals')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')
const TerserPlugin = require('terser-webpack-plugin')
/* -------------------------------------------------------------------------- */

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    target: 'node',
    watch: false,
    externals: [nodeExternals()],
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'src/index.js',
    },
    resolve: {
        alias: {
            // '@src': path.resolve(__dirname, 'src')
        },
        extensions: ['.ts', '.js', '.json'],
        modules: ['node_modules', path.resolve(__dirname, 'src')],
    },
    module: {
        rules: [{ test: /\.ts$/, use: ['ts-loader'] }],
    },
    plugins: [
        new WebpackShellPluginNext({
            onAfterDone: { scripts: ['echo "Build complete!"'] },
        }),
    ],
    optimization: { minimize: true, minimizer: [new TerserPlugin()] },
}
