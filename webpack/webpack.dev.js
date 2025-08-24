const path = require('path');
const { devServer } = require('./webpack.common');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        open: true,
        hot: true
    }
}
