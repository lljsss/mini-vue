import { isObject } from '../shared/index'
import { ShapeFlages } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}
function patch(vnode, container) {
  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlages.ELEMENT) {
    // 生成元素
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlages.STATEFUAL_COMPONENT) {
    // 去处理组件
    processComponent(vnode, container)
  }
}
function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}
function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type))
  const { childern, shapeFlag } = vnode
  if (shapeFlag & ShapeFlages.TEXT_CHILDREN) {
    // text_children
    el.textContent = childern
  } else if (shapeFlag & ShapeFlages.ARRAY_CHILDREN) {
    // array-children
    mountChildren(vnode, el)
  }
  const { props } = vnode
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.appendChild(el)
}
function mountChildren(vnode, el) {
  vnode.childern.forEach((v) => {
    patch(v, el)
  })
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}
function mountComponent(initinalVnode: any, container: any) {
  const instance = createComponentInstance(initinalVnode)
  setupComponent(instance)
  setupRenderEffect(instance, initinalVnode, container)
}
function setupRenderEffect(instance, initinalVnode, container) {
  const { proxy } = instance

  const subTree = instance.render.call(proxy)
  // vnode-> patch
  // vnode-> element ->mountElement
  patch(subTree, container)
  initinalVnode.el = subTree.el
}
