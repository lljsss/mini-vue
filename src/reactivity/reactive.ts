import { mutableHandlers, readonlyHandlers } from './baseHandlers'
import { track, trigger } from './effect'
export const enum ReactiveFlags {
  IS_REACTIVE = '__v__isReactive',
  IS_READONLY = '__v__isReadonly',
}
function createReactiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandlers)
}
export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers)
}
export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}
