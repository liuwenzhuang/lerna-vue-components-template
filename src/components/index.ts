import ProudctTopbarSample from './ProductTopbar'
import ProductNavigationSample from './ProductNavigation'
import { Component } from 'vue'

interface Demo {
  key: string
  title: string
  sample: Component
}

const demos: Demo[] = [
  {
    key: 'product-navigation',
    title: 'Product Navigation',
    sample: ProductNavigationSample,
  },
  {
    key: 'product-topbar',
    title: 'Product Topbar',
    sample: ProudctTopbarSample,
  },
]

export default demos
