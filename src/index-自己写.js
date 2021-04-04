import h from './mysnabbdom/h'
import { init, classModule, propsModule, styleModule, eventListenersModule } from "snabbdom";
// 创建patch函数
// 类名 props 样式 事件监听
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const myVnode1 = h('div', {}, [
    h("p", {}, '文字1'),
    h("p", {}, '文字2'),
    h("p", {}, '文字3'),
    h("p", {}, [
        h('span', {}, 'a'),
        h('span', {}, 'b')
    ]),
    h("p", {}, h('span', {}, 'd')),
])
console.log(myVnode1);


const myVnode2 = h('ul',{}, [
    h('li', {}, '白马'),
    h('li', {}, '黑马'),
    h('li', {}, [
        h('div', {}, [
            h('p', {}, '这是p1'),
            h('p', {}, '这是p2')
        ])
    ]),
    h('li',{}, h('span',{}, "这是sapn")),
])
console.log(myVnode2);
const container = document.getElementById('container')
patch(container,myVnode2)