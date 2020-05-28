import Vue from 'vue'
import router from './router'
import App from './App.vue'
import components from './components/'

const getPackages = (packageName: string) =>
  import(`Packages/${packageName}/lib`)

const promises = components.map((demo) => {
  return getPackages(demo.key).then((module) => {
    Vue.use(module.default)
  })
})

Vue.config.productionTip = false

Promise.all(promises)
  .then(() => {
    new Vue({
      router,
      render: (h) => h(App),
    }).$mount('#app')
  })
  .catch((err) => {
    console.error(err)
  })
