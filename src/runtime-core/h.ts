import { createVNode } from './vnode'

export function h(type, props?, childern?) {
  return createVNode(type, props, childern)
}
