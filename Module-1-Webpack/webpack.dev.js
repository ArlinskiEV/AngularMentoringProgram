
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
    , hot: true
    , historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
    , new webpack.NamedModulesPlugin()
    , new webpack.HotModuleReplacementPlugin()
  ]
};
