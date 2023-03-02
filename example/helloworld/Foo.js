import { h, renderSlots } from '../../lib/guid-mini-vue.esm.js'
/* export const Foo = {
  setup(props, { emit }) {
    // console.log(props)
    // // readonly
    // props.count++
    // console.log(props)
    const emitAdd = () => {
      console.log('emit add')
      emit('add', 1, 2)
      emit('add-foo', 1, 2)
    }
    return {
      emitAdd,
    }
  },
  render() {
    const btn = h(
      'button',
      {
        onClick: this.emitAdd,
      },
      'emitAdd'
    )
    const foo = h('p', {}, 'foo')
    return h('div', {}, [foo, btn])
  },
} */
export const Foo = {
  setup() {
    return {}
  },
  render() {
    const foo = h('p', {}, 'foo')
    console.log(this.$slots)
    const age = 18
    return h('div', {}, [
      renderSlots(this.$slots, 'header', { age }),
      foo,
      renderSlots(this.$slots, 'footer'),
    ])
  },
}
