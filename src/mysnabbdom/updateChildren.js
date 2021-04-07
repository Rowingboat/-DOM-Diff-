import patchVnode from './patchVnode'
import createElement from './createElement'
// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
    return a.sel == b.sel && a.key == b.key
}

// 父节点 老的子元素 新的子元素
// 更新节点
export default function updateChildren(parentElm, oldCh, newCh) {
    console.log('这是updateChildren');
    console.log(oldCh, newCh);

    // 旧的开始的节点 
    // 旧前 指针
    let oldStartIdx = 0
    // 新前 指针
    let newStartIdx = 0
    // 旧后 指针
    let oldEndIdx = oldCh.length - 1
    // 新后 指针
    let newEndIdx = newCh.length - 1
    // 旧前节点
    let oldStartVnode = oldCh[0]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新前节点
    let newStartVnode = newCh[0]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]
    let keyMap = null

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        console.log("❤");
        // 首先不判断命中, 要略过加undefined标记的
        if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh[--newEndIdx]
        } else
            if (checkSameVnode(oldStartVnode, newStartVnode)) {
                // 新前和旧前
                console.log('1新前和旧前命中');
                // 判断是否是同一个节点
                patchVnode(oldStartVnode, newStartVnode)
                // 让指针后移
                oldStartVnode = oldCh[++oldStartIdx]
                newStartVnode = newCh[++newStartIdx]
            } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
                console.log('2新后与旧后命中');
                // 新后与旧后
                patchVnode(oldEndVnode, newEndVnode)
                // 让指针上移
                oldEndVnode = oldCh[--oldEndIdx]
                newEndVnode = newCh[--newEndIdx]
            } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
                console.log('3新后与旧前命中');
                // 新后与旧前
                patchVnode(oldStartVnode, newEndVnode)
                // 当3新后与旧前命中的时候, 此时要移动节点, 移动新前指向的这个节点到老节点的旧后的后面
                // 如何移动节点  只要插入一个已经在dom书上的节点 他就会被移动
                parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
                // 让旧前指针下移, 新后指针上移
                oldStartVnode = oldCh[++oldStartIdx]
                newEndVnode = newCh[--newEndIdx]
            } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
                console.log('4新前与旧后命中');
                // 新后与旧前
                patchVnode(oldStartVnode, newEndVnode)
                // 当4新后与旧前命中的时候, 此时要移动节点, 移动新前指向的这个节点到老节点的旧前的前面
                parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
                // 让信号欧指针下移, 旧前指针上移
                oldEndVnode = oldCh[--oldEndIdx]
                newStartVnode = newCh[++newStartIdx]
            } else {
                // 4种都没有命中的情况
                // 制作key的map映射对象, 这样不用每次都遍历老对象
                if (!keyMap) {
                    keyMap = {}
                    // 从oldStartIdx开始 到oldEndIdx结束  创建keyMap映射对象
                    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                        const key = oldCh[i].key
                        if (key != undefined) {
                            keyMap[key] = i
                        }
                    }
                }
                console.log(keyMap);
                // 寻找当前这项(newStartIdx) 这项在keyMap中的映射的位置序号
                const idxInOld = keyMap[newStartVnode.key]
                console.log(idxInOld);
                if (idxInOld == undefined) {
                    // 判断如果idxInOld是undefined 表示是新的项
                    // 被加入的项 就是newStartVnode这项  现在还不是真正的dom节点
                    parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
                } else {
                    // 如果不是undefined 不是新的 就要移动
                    const elmToMove = oldCh[idxInOld]
                    patchVnode(elmToMove, newStartVnode)
                    // 把这项设置为undefined 表示处理完了
                    oldCh[idxInOld] = undefined
                    // 移动  调用insertBefore也可以移动
                    parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)

                }
                // 指针下移, 只移动新的头
                newStartVnode = newCh[++newStartIdx]
                // newStartIdx++
            }
    }

    // 是否有剩余节点 循环结束了start还是比old大
    if (newStartIdx >= newEndIdx) {
        console.log('new还有剩余节点, 要添加项');
        // 插入的标杆(源库中的写法)
    
        const bofore = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        // 遍历新的newCh, 添加到老的没有添加的之前
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore方法可以自动识别null  如果是null或者undefined就会自动排到队尾, 和appendChild一致
            // newCh[i] 现在还没有成为真正的dom createElement()函数变为dom
            parentElm.insertBefore(createElement(newCh[i]), bofore)
            // parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
        }
    } else if (newStartIdx <= newEndIdx) {
        console.log('new还有剩余节点, 要添加项');
        // 插入的标杆(源库中的写法)
        // const bofore = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        // 遍历新的newCh, 添加到老的没有添加的之前
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore方法可以自动识别null  如果是null或者undefined就会自动排到队尾, 和appendChild一致
            // newCh[i] 现在还没有成为真正的dom createElement()函数变为dom
            // parentElm.insertBefore(createElement(newCh[i]), bofore)
            parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
        }
    } else if (oldStartIdx <= oldEndIdx) {
        console.log('old还有剩余节点, 要移除项');
        // 批量删除oldStrat和oldEnd指针之间的项
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }

        }
    }
}