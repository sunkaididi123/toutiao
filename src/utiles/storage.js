// 封装本地存储操作模块


// 1.存储数据
export const setItem = (key, value) => {
    // 将数组或者对象类型数据，转换成JSON类型字符串
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
}



// 2.获取数据
export const getItem = (key) => {
    const data = localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch {
        return data;
    }
}



// 3.删除数据

export const removeItem = (key) => {
    localStorage.removeItem(key)
}