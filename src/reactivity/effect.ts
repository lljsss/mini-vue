import { extend } from '../shared'

let activeEffect, shouldTrack
export class ReactiveEffect {
  private _fn: any
  deps = []
  active = true
  onStop = () => {}
  public scheduler: Function | undefined
  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    if (!this.active) {
      return this._fn()
    }
    shouldTrack = true
    activeEffect = this
    const result = this._fn()
    shouldTrack = false
    return result
  }
  stop() {
    if (this.active == true) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}
const tragetMap = new Map()
export function track(target, key) {
  if (!isTracking()) return
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
  trackEffects(dep)
}
export function trackEffects(dep) {
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}
export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}
export function trigger(target, key) {
  let depsMap = tragetMap.get(target)
  let dep = depsMap.get(key)
  triggerEffects(dep)
}
export function triggerEffects(dep) {
  for (let effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  extend(_effect, options)
  _effect.run()
  let runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}
export function stop(runner) {
  runner.effect.stop()
}
