// 真正创建节点, 将vnode创建为dom, 是孤儿节点 不进行插入
export default function createElement(vnode) {
    // 把虚拟节点插入到pivot前
    console.log('目的是把虚拟节点', vnode, '真正变为dom');
    // 创建一个dom节点, 这个节点目前还是一个孤儿节点
    let domNode = document.createElement(vnode.sel)
    // 判断有子节点还是有文本
    if (vnode.text != '' && vnode.children == undefined || vnode.children.length == 0) {
        // 说明内部是文字, 直接等于文字
        domNode.innerText = vnode.text

    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 它内部是子节点就递归创建节点
        for (let i = 0; i < vnode.children.length; i++) {
            // 得到当前这个children
            let ch = vnode.children[i]
            // console.log(ch);
            // 创建出他的dom, 一旦调用了这个函数 意味着: 创建出了dom, 并且elm属性实际指向了创建出的dom, 但还没上树 是孤儿节点
            let chDOM = createElement(ch)
            // 追加节点, 上树
            domNode.appendChild(chDOM)
        }

    }
    // 给节点补充elm属性, 使elm属性指向节点
    vnode.elm = domNode
    // 返回elm, 说明已经上树了, elm属性是纯dom对象
    return vnode.elm
}