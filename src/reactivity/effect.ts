let activeEffect
class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}
const tragetMap = new Map()
export function track(target, key) {
  let depsMap = tragetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    tragetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}
export function trigger(target, key) {
  let depsMap = tragetMap.get(target)
  let dep = depsMap.get(key)
  for (let d of dep) {
    d.run()
  }
}
export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  return _effect.run.bind(_effect)
}
