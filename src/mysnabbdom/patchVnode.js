import createElement from "./createElement";
import updateChildren from './updateChildren'

// 对比同一个虚拟节点
export default function patchVnode(oldVnode, newVnode) {
    // 判断新旧vnode是否是同一个对象
    if (oldVnode === newVnode) return

    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
        // 新的vnode有text属性
        console.log('新的vnode有text属性');
        // 比较新的vnode节点中的文字和老的vnode中的文字是否相同
        if (newVnode.text != oldVnode.text) {
            // 如果新的vnode节点中的文字和老的vnode中的文字不相同
            // 直接让新的节点文字, 写入老的elm中
            // 如果老的elm中是节点, 也会立即消失掉
            oldVnode.elm.innerText = newVnode.text
        }
    } else {
        // 新vnode没有text属性, 有children
        console.log('新的vnode没有text属性');
        // 判断老的有没有children
        if (oldVnode.children != undefined && oldVnode.children.length > 0) {
            // 老的有children, 此时是最复杂的情况, 新老都有children
           updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)

        } else {
            // 老的没有children, 新的有children

            // newVnode.children.forEach(i => {
            //     let dom = createElement(i)
            //     oldVnode.elm.appendChild(dom)
            // });
            // 清空老节点的内容
            oldVnode.elm.innerHTML = ''
            // 遍历新的vnode子节点, 创建dom上树
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }

        }
    }
}