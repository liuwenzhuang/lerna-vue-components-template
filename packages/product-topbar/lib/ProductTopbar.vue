<template>
  <div class="product-topbar">
    {{ msg }}
    <ProductNavigation msg="product navigation in product topbar" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ProductNavigation from '@lwz-fe/product-navigation'

@Component({
  components: {
    ProductNavigation
  }
})
export default class ProductTopbar extends Vue {
  @Prop({
    default: 'product-topbar'
  })
  private msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-topbar {
  font-size: 16px;
}
</style>
