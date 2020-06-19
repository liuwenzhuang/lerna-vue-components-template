import { Component, Vue } from 'vue-property-decorator'
import ProductTopbar from '@lwz-fe/product-topbar'

@Component({})
export default class ProductTopbarComp extends Vue {
  render() {
    return <ProductTopbar {...{ props: { msg: 'product topbar' } }} />
  }
}
