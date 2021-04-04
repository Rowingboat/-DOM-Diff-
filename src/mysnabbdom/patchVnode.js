import createElement from "./createElement";

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
            // 所有未处理的节点的开头
            let un = 0
            for (let i = 0; i < newVnode.children.length; i++) {
                let ch = newVnode.children[i]
                // 再次遍历, 看看oldVnode中有没有节点和他的key相同
                let isExist = false
                for (let j = 0; j < oldVnode.children.length; j++) {
                    if (oldVnode.children[j].sel == ch.sel && oldVnode.children[j].key == ch.key) {
                        isExist = true
                    }
                }
                if (!isExist) {
                    console.log(ch, i);
                    let dom = createElement(ch)
                    ch.elm = dom
                    if (un < oldVnode.children.length) {
                        oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
                    } else {
                        oldVnode.elm.appendChild(dom)
                    }

                } else {
                    // 让处理的节点指针下移
                    un++
                    // 判断存在了位置不一样的情况
                   
                }
            }

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