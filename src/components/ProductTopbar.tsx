import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ProductTopbarComp extends Vue {
  render() {
    return (
      <product-topbar msg="product topbar" />
    )
  }
}
