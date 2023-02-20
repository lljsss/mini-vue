import { hasChange, isObject } from '../shared'
import { isTracking, trackEffects, triggerEffects } from './effect'
import { reactive } from './reactive'

class RefImpl {
  private _value: any
  public dep
  private _rawValue: any
  public __v__isRef = true
  constructor(value) {
    this._rawValue = value
    this._value = convert(value)
    this.dep = new Set()
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    if (hasChange(newValue, this._rawValue)) {
      this._value = convert(newValue)
      this._rawValue = newValue
      triggerEffects(this.dep)
    }
  }
}
function convert(value) {
  return isObject(value) ? reactive(value) : value
}
function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}
export function ref(value) {
  return new RefImpl(value)
}
export function isRef(ref) {
  return !!ref.__v__isRef
}
export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}
export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    },
  })
}
