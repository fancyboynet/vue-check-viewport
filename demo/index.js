import Vue from 'vue'
import VueCheckViewport from '../src/vue-check-viewport'
function createList () {
  let list = []
  for(let i = 0; i < 20; i++){
    list.push({
      val: i,
      visited: false
    })
  }
  return list
}
new Vue({
  el: '#app',
  data: {
    list: createList()
  },
  methods: {
    onVisible(index){
      console.log('in', index)
      this.$set(this.list[index], 'visited', true)
    },
    onUnVisible(index){
      console.log('out', index)
      this.$set(this.list[index], 'visited', false)
    }
  },
  components: {
    VueCheckViewport
  }
})