import Vue from 'vue'
import VueCheckViewport from '../src/index'
function createList () {
  let list = []
  for (let i = 0; i < 1000; i++) {
    list.push({
      val: i,
      visited: false
    })
  }
  return list
}
let vm = new Vue({
  data: {
    list: createList()
  },
  methods: {
    onVisible (index) {
      console.log('in', index)
      this.$set(this.list[index], 'visited', true)
    },
    onUnVisible (index) {
      console.log('out', index)
      this.$set(this.list[index], 'visited', false)
    },
    removeTopOne () {
      this.list.shift()
    }
  },
  components: {
    VueCheckViewport
  },
  mounted () {}
})
vm.$mount('#app')
