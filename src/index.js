let observer = null
function createObserver (options) {
  observer = new window.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio < options.intersectionRatio) {
        entry.target.__vue__.onUnVisible()
      } else {
        entry.target.__vue__.onVisible()
      }
    })
  }, options)
}

function isElementInViewport (el, options) {
  let rect = el.getBoundingClientRect()
  let vW = window.innerWidth || document.documentElement.clientWidth
  let vH = window.innerHeight || document.documentElement.clientHeight
  let intersectionW = rect.width
  let intersectionH = rect.height
  if (rect.bottom <= 0) {
    return false
  }
  if (rect.top >= vH) {
    return false
  }
  if (rect.right <= 0) {
    return false
  }
  if (rect.left >= vW) {
    return false
  }
  if (rect.top < 0) {
    intersectionH = intersectionH + rect.top
  }
  if (rect.bottom > vH) {
    intersectionH = intersectionH + vH - rect.bottom
  }
  if (rect.left < 0) {
    intersectionW = intersectionW + rect.left
  }
  if (rect.right > vW) {
    intersectionW = intersectionW + vW - rect.right
  }
  return (intersectionW * intersectionH) >= (rect.width * rect.height * options.intersectionRatio)
}

export default {
  name: 'VueCheckViewport',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    options: {
      type: Object,
      default () {
        return {
          root: null,
          rootMargin: '0px',
          threshold: [0.0, 0.85, 1.0],
          intersectionRatio: 0.85
        }
      }
    }
  },
  data () {
    return {
      isVisible: undefined
    }
  },
  render (createElement) {
    return createElement(
      this.tag,
      this.$slots.default
    )
  },
  mounted () {
    this.initObserver()
  },
  beforeDestroy () {
    this.destroyObserver()
  },
  methods: {
    initObserver () {
      if (window.IntersectionObserver) {
        this.initIntersectionObserver()
        return
      }
      this.initFallback()
    },
    initIntersectionObserver () {
      if (!observer) {
        createObserver(this.options)
      }
      observer.observe(this.$el)
    },
    initFallback () {
      let root = this.options.root || window
      root.addEventListener('scroll', this.listener, false)
      window.addEventListener('load', this.listener, false)
      window.addEventListener('resize', this.listener, false)
      window.addEventListener('DOMContentLoaded', this.listener, false)
      window.requestAnimationFrame(this.listener)
    },
    listener () {
      if (isElementInViewport(this.$el, this.options)) {
        this.onVisible()
        return
      }
      this.onUnVisible()
    },
    onVisible () {
      if (this.isVisible === true) {
        return
      }
      this.isVisible = true
      this.$emit('on-visible')
    },
    onUnVisible () {
      if (this.isVisible === false) {
        return
      }
      this.isVisible = false
      this.$emit('on-un-visible')
    },
    destroyObserver () {
      if (window.IntersectionObserver) {
        this.destroyIntersectionObserver()
        return
      }
      this.destroyFallback()
    },
    destroyFallback () {
      let root = this.options.root || window
      root.removeEventListener('scroll', this.listener, false)
      window.removeEventListener('load', this.listener, false)
      window.removeEventListener('resize', this.listener, false)
      window.removeEventListener('DOMContentLoaded', this.listener, false)
    },
    destroyIntersectionObserver () {
      if (!observer) {
        return
      }
      observer.unobserve(this.$el)
    }
  }
}
