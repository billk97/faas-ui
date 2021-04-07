import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueGoogleMaps, {
    load: {
        key: "thats my key :)",
        libraries: "places" // necessary for places input
    }
})
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
