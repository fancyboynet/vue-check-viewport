import Vue from 'vue'
import VueCheckViewport from '../src/vue-check-viewport'
function createList () {
  let list = []
  for (let i = 0; i < 1; i++) {
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
    },
    reRenderTopOne () {
      this.$refs.check[0].$forceUpdate()
    }
  },
  components: {
    VueCheckViewport
  },
  mounted () {
    console.log(this.$refs.check)
  }
})
vm.$mount('#app')
