<template>
  <div class="product-topbar">{{ msg }}</div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProductTopbar extends Vue {
  @Prop() private msg!: string

  get columns() {
    return <span>abc</span>
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.product-topbar {
  /* styles here */
}
</style>
