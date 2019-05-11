import Vue from 'vue';
import App from './components/App';
import VueRouter from 'vue-router';
import { firebaseApp } from './firebaseApp';

import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Employee from './components/Employee';

const DASHBOARD_ROUTE = '/dashboard';
const SIGNIN_ROUTE = '/signin';
const EMPLOYEE_ROUTE = '/employee/:id';

import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: DASHBOARD_ROUTE, component: Dashboard },
        { path: SIGNIN_ROUTE, component: Signin },
        { path: EMPLOYEE_ROUTE, component: Employee }
    ]
});

const allowedAuthRoutes = [
    DASHBOARD_ROUTE,
    EMPLOYEE_ROUTE
];

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        user.getIdToken(true)
            .then(fetchedIdToken => store.dispatch('signIn', { ...user, fetchedIdToken }))
            .then(() => {
                if (!router.currentRoute.matched[0] || !allowedAuthRoutes.includes(router.currentRoute.matched[0].path) ) {
                    router.push(DASHBOARD_ROUTE);
                }
            });
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
