import { effect } from '../effect'
import { reactive } from '../reactive'
import { isRef, proxyRefs, ref, unRef } from '../ref'

describe('ref', () => {
  it('happy path', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })
  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = a.value
    })
    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
  })
  it('should make nested properties reactive', () => {
    const a = ref({ count: 1 })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })
  it('isRef', () => {
    const a = ref({ count: 1 })
    const b = reactive({ count: 1 })
    expect(isRef(a)).toBe(true)
    expect(isRef(b)).toBe(false)
  })
  it('unRef', () => {
    const a = ref(1)
    const b = { count: 1 }
    const c = ref({ count: 1 })
    expect(unRef(a)).toBe(1)
    expect(unRef(b)).toEqual({ count: 1 })
    expect(unRef(c)).toEqual({ count: 1 })
  })
  it('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: 'zhangsan',
    }
    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
    expect(proxyUser.name).toBe('zhangsan')
    proxyUser.name = ref('lisi')
    expect(proxyUser.name).toBe('lisi')
    // expect(user.name.value).toBe('lisi')
    proxyUser.age = 20
    expect(proxyUser.age).toBe(20)
    expect(user.age.value).toBe(20)
    proxyUser.age = ref(10)
    expect(proxyUser.age).toBe(10)
    expect(user.age.value).toBe(10)
  })
})
