import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

// const myvnode1 = h('h1',{},'你好')
const myvnode1 = h('ul', {}, [
    h('li', { key: 'a' }, 'a'),
    h('li', { key: 'b' }, 'b'),
    h('li', { key: 'c' }, 'c'),
    h('li', { key: 'd' }, 'd'),
    h('li', { key: 'e' }, 'e'),
])

// 得到按钮和盒子
const container = document.getElementById('container')
const btn = document.getElementById('btn')

// 第一次上树
patch(container, myvnode1)

// 新的节点
const myvnode2 = h('ul', {}, [
    h('li', { key: 'qq' }, 'qq'),
    h('li', { key: 'a' }, 'a'),
    h('li', { key: 'b' }, 'b'),
    h('li', { key: 'c' }, 'c'),
    h('li', { key: 'd' }, 'd'),
    h('li', { key: 'e' }, 'e'),
    h('li', { key: 'q' }, 'q'),
]
)


btn.addEventListener('click', () => {
    patch(myvnode1, myvnode2)
})


