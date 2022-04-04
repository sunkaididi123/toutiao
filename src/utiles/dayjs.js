import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载中文语言包，
import 'dayjs/locale/zh-cn'
// dayjs默认是英文,我们这里配置为中文
dayjs.locale('zh-cn')

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 定义filter过滤器
// 过滤器相当于一个全局可用的方法


// 参数1:过滤器的名字
// 参数2:过滤器函数
// 使用方式:{表达式 | 过滤器名字}
// 管道符前面的结果会作为参数传递到过滤器
Vue.filter('filter', value => {
        return dayjs().to(dayjs(value))
    })
    // dayjs获取当前最新时间
    // const timer = dayjs().format('YYYY-MM-DD')
    //     // console.log(timer);
    // console.log(dayjs().from(dayjs('1990'))) // 2 years ago
    // 2 years);
console.log(dayjs().from(dayjs(), true))