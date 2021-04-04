import vnode from './vnode'

// 低配版h函数, 必须接收3个参数
// 相当于它的重置功能较弱
// 也就是说，调用的时候形态必须是下面的三种之一
/*
  形态①：h('div', {}, '文字')
  形态②：h('div', {}, [])
  形态③：h('div', {}, h())
*/
export default function (sel, data, c) {
    // 检查参数的个数
    if (arguments.length !== 3) throw new Error('h函数需要传递3个参数')

    // 判断c的类型
    if (typeof c === 'string' || typeof c === 'number') {
        //这时是形态1
        return vnode(sel, data, undefined, c, undefined)

    } else if (Array.isArray(c)) {
        // c是数组 说明现在调用h函数的是形态②

        let children = []
        for (let i = 0; i < c.length; i++) {
            // 检查c的第[i]是不是对象, 不满足报错
            if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('传入的数组结果有项目不是h函数 ')
            }
            // 这里不用执行 c[i]，因为你的调用语句中已经有了执行
            // 此时只要收集好就行了
            children.push(c[i])
        }
        // 循环结束说明收集完毕, 返回虚拟节点, 有children属性
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        // 是一个对象 并且有sel属性
        // 说明现在调用h函数的是形态③
        // 传入的c是children唯一的参数，不用执行
        let children = [c]
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('传入的第3个参数类型不对 ')
    }
}