module.exports = {
    plugins: {
        // vuecli内部已经启用过
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'ios>=8 ']
        // },
        // 作用:把px转成rem
        'postcss-pxtorem': {

            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 表示转换所有的css属性
            propList: ['*'],
            // 配置排除不要转换的样式资源
            exclude: 'github-markdown'
        }
    }
}