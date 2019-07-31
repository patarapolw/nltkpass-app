import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import "./index.scss";

Vue.config.productionTip = false

new Vue({
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
