import { init, classModule, propsModule, styleModule, eventListenersModule, h, } from "snabbdom";


// 创建patch函数
// 类名 props 样式 事件监听
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const vnode1 = h('ul', {}, [
    h('li', {key:'a'}, "a"),
    h('li', {key:'b'}, "b"),
    h('li', {key:'c'}, "c"),
    h('li', {key:'d'}, "d"),
])
const vnode2 = h('ul', {}, [
    h('li', {key:'a'}, "a"), 
    h('li', {key:'b'}, "b"),
    h('li', {key:'c'}, "c"),
    h('li', {key:'d'}, "d"),
    h('li', {key:'e'}, "e"),
])

// key是这个节点的唯一标识 告诉diff算法 在更改前后是同一个dom节点
// 只有是同一个虚拟节点，才进行虚拟化比较，否则就是暴力删除旧的、插入新的。延伸问题：如何定义同一个虚拟节点？答：选择器相同且 key 相同
// 只进行同层比较，不会进行跨层比较。即使是同一片虚拟节点，但是如果跨层了，那么 diff 算法也不会进行精细化比较。而是暴力删除旧的、然后插入新的。
// 有key的话顺序不同也会精细化比较
// index作为key值在中间插入可能会有重新渲染的问题
const container = document.getElementById('container')
const btn = document.getElementById('btn')
patch(container, vnode1)
console.log(vnode1);
//点击按钮变成vnode2
btn.addEventListener('click', function () {
    patch(vnode1, vnode2)
})