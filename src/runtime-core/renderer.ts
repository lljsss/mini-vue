import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
}
function patch(vnode, container) {
  // 去处理组件
  // 判断是不是element
  processComponent(vnode, container)
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}
function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}
function setupRenderEffect(instance, container) {
  const subTree = instance.render()
  // vnode-> patch
  // vnode-> element ->mountElement
  patch(subTree, container)
}
