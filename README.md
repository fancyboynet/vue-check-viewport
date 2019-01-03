# vue-check-viewport
A simple vue component which can check the element whether in the specail(`window` default) viewport

## features
1. Use [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) first if the browser support.

## install
```bash
$ npm i vue-check-viewport
```
    
## usage

```html
<ul>
    <vue-check-viewport tag="li" :class="{visited: item.visited}" v-for="(item, index) in list" @on-visible="onVisible(index)" @on-un-visible="onUnVisible(index)">{{ item.val }}</vue-check-viewport>
</ul>
```
