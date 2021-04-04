import vnode from './vnode'
import createElement from './createElement'
import patcnVnode from './patchVnode'
export default function (oldVnode, newVnode) {
    // 判断传入的第一个参数是dom节点, 还是虚拟节点  判断是否有sel属性
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        // 传入的第一个参数是dom节点, 此时要包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    // console.log(oldVnode);
    // 判断oldVnode和newVnode是否是同一个节点
    if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
        console.log('是同一个节点');
        patcnVnode(oldVnode, newVnode)
    } else {
        console.log('不是同一个节点, 插入新的, 删除旧的');

        let newVnodeElm = createElement(newVnode)
        // 插入到老节点之前
        if (oldVnode.elm.parentNode && newVnodeElm)
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        // 删除老节点
        oldVnode.elm.remove()
    }
}