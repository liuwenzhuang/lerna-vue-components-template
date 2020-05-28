<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <ProductTopbar msg="product topbar" />
    <ProductNavigation msg="product navigation" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import ProductTopbar from 'Packages/product-topbar/lib'
import ProductNavigation from 'Packages/product-navigation/lib'

@Component({
  components: {
    HelloWorld,
    ProductTopbar,
    ProductNavigation
  }
})
export default class App extends Vue {}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
}
</style>
