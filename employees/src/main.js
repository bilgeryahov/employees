import Vue from 'vue';
import App from './components/App';
import VueRouter from 'vue-router';
import { firebaseApp } from './firebaseApp';

import Dashboard from './components/Dashboard';
import Signin from './components/Signin';

import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/dashboard', component: Dashboard },
        { path: '/signin', component: Signin }
    ]
});

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        user.getIdToken(true)
            .then(fetchedIdToken => store.dispatch('signIn', { ...user, fetchedIdToken }))
            .then(() => router.push('/dashboard'));
    } else {
        router.replace('/signin');
    }
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
