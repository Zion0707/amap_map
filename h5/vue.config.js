const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    publicPath:'./',
    configureWebpack:{
        resolve: {
            alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
				'plugins': '@/plugins',
            }
        },
		plugins: [
			// new HtmlWebpackPlugin({
			// 	title:'高德地图'
			// })
		]	
	}
}