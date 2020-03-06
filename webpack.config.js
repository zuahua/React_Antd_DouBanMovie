const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //导入 在内存中自动生成 index页面的插件

// 创建一个插件的实例
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), //源文件
    filename: 'index.html' //生成的内存中的首页的名称
})


// 向外暴露一个打包的配置对象
// webpack 默认只能打包处理 .js后缀类型的文件；像.png .vue无法主动处理，所有要配置第三方的loader
module.exports = {
    mode: 'development', // development production
    // 导入插件
    plugins: [
        htmlPlugin
    ],
    module: { //所有第三方模块的配置规则
        rules: [ // 第三方匹配规则
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',                       
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // 可以在 css-loader 后，通过 ? 追加参数
                // 其中，有个固定参数，叫做 modules，表示为 普通的 css 样式表启用模块化 
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                    },
                ],                   
            }, // 打包处理 CSS 样式表的第三方loader    
            
            {test: /\.ttf|woff|woff2|eot|svg|jpg|webp$/, use: 'url-loader'}, // 打包处理字体文件的loader
            { 
                test: /\.scss$/, 
                use: [
                    'style-loader', 
                    {
                        loader: require.resolve('css-loader'),
                        options: {                        
                            modules: { 
                                localIdentName: '[path][name]-[local]-[hash:5]',
                            }
                        },
                    }, 
                    'sass-loader',
                ] 
            }, // 打包处理 .scss 文件的 loader
            
        ]

    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 表示，这几个文件的后缀名可以不写
        alias: {
            '@': path.join(__dirname, './src') // 这样，@就表示项目根目录中 src 这一层路径；绝对路径
        }
    }
} // node语法 因为webpack是基于node构建的，支持所有node API和语法

// webpack 4.x中有一个很大的特性，就是约定大于配置，默认的打包入口路径是/src -> index.js


// 不能使用 export default {} 因为这是ES6语法，node不支持，node基于chrome浏览器