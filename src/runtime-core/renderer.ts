import { isObject } from '../shared/index'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}
function patch(vnode, container) {
  // 判断vnode 是不是一个element
  //是 element 那么就应该处理element
  // 去处理组件
  // 判断是不是element
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}
function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}
function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type)
  const { childern } = vnode
  if (typeof childern === 'string') {
    el.textContent = childern
  } else if (Array.isArray(childern)) {
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
