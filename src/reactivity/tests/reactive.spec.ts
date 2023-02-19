import { isProxy, isReactive, isReadonly, reactive } from '../reactive'
describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { a: 1 } }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(observed.bar)).toBe(true)
    expect(isReactive(observed.foo)).toBe(false)
    expect(isReadonly(observed)).toBe(false)
    expect(isProxy(observed)).toBe(true)
  })
  test('nested reactive', () => {
    const original = { nested: { foo: 1 }, array: [{ bar: 2 }] }
    const observed = reactive(original)
    expect(isReactive(observed.nested.foo)).toBe(false)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
