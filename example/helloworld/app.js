import { h } from '../../lib/guid-mini-vue.esm.js'
export const App = {
  render() {
    return h('div', { id: 'root', class: ['red', 'hard'] }, [
      h('p', { class: 'red' }, 'hi'),
      h('p', { class: 'blue' }, 'vue'),
    ])
  },
  setup() {
    return {
      msg: 'mini-vue',
    }
  },
}
