// Set the custom styles.
require("../public/index.css");

// Import functional packages.
import Vue from 'vue';
import App from './components/App';
import VueRouter from 'vue-router';
import { firebaseApp } from './firebaseApp';

// Import app-components.
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Employee from './components/Employee';

// Router configs.
import {
    DASHBOARD_ROUTE,
    SIGNIN_ROUTE,
    EMPLOYEE_ROUTE,
    EMPLOYEE_ROUTE_ID
} from './routes';

import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: DASHBOARD_ROUTE, component: Dashboard },
        { path: SIGNIN_ROUTE, component: Signin },
        { path: EMPLOYEE_ROUTE + EMPLOYEE_ROUTE_ID, component: Employee }
    ]
});

// Routes allowed to be addressed, while a User is present.
const allowedAuthRoutes = [
    DASHBOARD_ROUTE,
    EMPLOYEE_ROUTE + EMPLOYEE_ROUTE_ID
];

/**
 * If the following rules are not satisfied, the app needs
 * to redirect to the main page.
 * 
 * @returns { Boolean }
 */
function redirectMainIfNot() {
    return (
        store.state.empoyee_for_details
    );
}

/**
 * Firebase auth state changes listener.
 * Make sure to route based on User presence respectively.
 */
firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        // User is present. Determiine which route should be navigated to.
        user.getIdToken(true)
            .then(fetchedIdToken => store.dispatch('signIn', { ...user, fetchedIdToken }))
            .then(() => {
                if (!router.currentRoute.matched[0] ||
                    !allowedAuthRoutes.includes(router.currentRoute.matched[0].path) ||
                    !redirectMainIfNot()) {
                    router.push(DASHBOARD_ROUTE);
                }
            });
    } else {
        // User not present. Bye.
        router.replace('/signin');
    }
});

// Initialize the main Vue instance.
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
