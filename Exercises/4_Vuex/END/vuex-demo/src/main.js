import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex';

const store = createStore({

});


var app = createApp(App);
app.use(store);

app.mount('#app')
