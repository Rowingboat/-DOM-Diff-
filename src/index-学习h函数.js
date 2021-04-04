import { init, classModule, propsModule, styleModule, eventListenersModule, h, } from "snabbdom";
// 创建patch函数
// 类名 props 样式 事件监听
const patch = init([classModule, propsModule, styleModule, eventListenersModule])
// 创建虚拟节点
// 1.选择器 2.data样式相关 
// children: undefined, // 子节点，undefined表示没有子节点
// data: {}, // 属性样式等
// elm: undefined, // 该元素对应的真正的DOM节点，undefined表示它还没有上树
// key: undefined, // 节点唯一标识
// sel: 'div', // selector选择器 节点类型（现在它是一个div）
// text: '我是一个盒子' // 文字
const myVnode1 = h('a', { props: { href: 'http://www.baidu.com', target: '_blank' } }, "百度")
console.log(myVnode1);

const myVnode2 = h('div', { class: { 'box': true } }, '这是一个盒子')

//  h函数可以嵌套
const myVnode3 = h('ul', [
    h('li', {}, '白马'),
    h('li', {}, '黑马'),
    h('li', {}, [
        h('div', {}, [
            h('p', {}, '这是p1'),
            h('p', {}, '这是p2')
        ])
    ]),
    h('li', h('span',"这是sapn")),
])
console.log(myVnode3);
// 让虚拟节点上树
const container = document.getElementById('container')
// patch(container,myVnode1)
// patch(container,myVnode2)
patch(container, myVnode3)


