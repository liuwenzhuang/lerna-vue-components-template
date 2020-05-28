// @ts-nocheck
import __PACKAGE_CLASS_NAME__ from './__PACKAGE_CLASS_NAME__.vue'

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('__PACKAGE_NAME__', __PACKAGE_CLASS_NAME__)
}

// Create module definition for Vue.use()
const plugin = {
	install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = (global as any).Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

__PACKAGE_CLASS_NAME__.install = install

// To allow use as module (npm/webpack/etc.) export component
export default __PACKAGE_CLASS_NAME__
