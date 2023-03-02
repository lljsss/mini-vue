import { h } from '../../lib/guid-mini-vue.esm.js'
import { Foo } from './Foo.js'
window.self = null
/* export const App = {
  name: 'App',
  render() {
    window.self = this
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        // onClick() {
        //   console.log('click')
        // },
        // onMousedown() {
        //   console.log('Mousedown')
        // },
      },
      [
        h('div', {}, 'hi,' + this.msg),
        h(Foo, {
          onAdd(a, b) {
            console.log('onAdd', a, b)
          },
          onAddFoo(a, b) {
            console.log('onAddFoo', a, b)
          },
        }),
      ]
      // [
      //   h('p', { class: 'red' }, 'hi'),
      //   h('p', { class: 'blue' }, 'vue'),
      // ]
      // 'hi' + this.msg
    )
  },
  setup() {
    return {
      msg: 'mini-vue',
    }
  },
} */
export const App = {
  name: 'App',
  render() {
    const app = h('div', {}, 'App')
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => h('p', {}, '123' + age),
        footer: () => h('p', {}, '456'),
      }
      // h('p', {}, '123')
    )
    return h('div', {}, [app, foo])
  },
  setup() {
    return {}
  },
}
