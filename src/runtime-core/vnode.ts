export function createVNode(type, props?, childern?) {
  const vnode = {
    type,
    props,
    childern,
  }
  return vnode
}
