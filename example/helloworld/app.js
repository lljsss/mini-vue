import { h } from '../../lib/guid-mini-vue.esm.js'
window.self = null
export const App = {
  render() {
    window.self = this
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        onClick() {
          console.log('click')
        },
        onMousedown() {
          console.log('Mousedown')
        },
      },
      // [
      //   h('p', { class: 'red' }, 'hi'),
      //   h('p', { class: 'blue' }, 'vue'),
      // ]
      'hi' + this.msg
    )
  },
  setup() {
    return {
      msg: 'mini-vue',
    }
  },
}
