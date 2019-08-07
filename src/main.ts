import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import "./index.scss";
import { g } from './shared';
import NltkPass from './lib/NltkPass';

Vue.config.productionTip = false

new Vue({
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app');

if ((window as any).cordova) {
  document.addEventListener("deviceready", async () => {
    try {
      g.nltkPass = await NltkPass.build();
    } catch(e) {
      alert(JSON.stringify(e));
    }
  }, false);
} else {
  (async () => {
    g.nltkPass = await NltkPass.build();
  })();
}
