const path = require('path');  //引入node的path模块
module.exports = {
    entry: './src/client/index.js', //入口文件  在vue-cli main.js
    output: {       //webpack如何输出
        path: path.resolve(__dirname, '/public/build'), //定位，输出文件的目标路径
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/build'
    },
    module: {       //模块的相关配置
        rules: [     //根据文件的后缀提供一个loader,解析规则
            {
                test: /\.jsx?$/,  //es6 => es5 
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // exclude:[], 不匹配选项（优先级高于test和include）
                use: 'babel-loader'
            },
        ]                  
    },
    resolve: { //解析模块的可选项  
        // modules: [ ]//模块的查找目录 配置其他的css等文件
        extensions: [".js", ".jsx"],  //用到文件的扩展名
    },
    devServer: {  //服务于webpack-dev-server  内部封装了一个express 
        contentBase: "./public",
        port: "8080",
        host: "localhost",
        proxy: {
          "*": "http://localhost:3000"
        }
    }
}
