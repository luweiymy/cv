import _ from 'lodash';
import Vue from 'vue';
import App from './App';


if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }

 Vue.config.productionTip = false

 /* eslint-disable no-new */
 new Vue({
   el: '#app',
   components: { App },
   template: '<App/>'
 })

if (module.hot) {
   module.hot.accept('./App.vue', function() {
     console.log('Accepting the updated printMe module!');
   })
 }
