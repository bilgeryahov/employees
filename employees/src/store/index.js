import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const state = {
    user: null,
    employees: [],
    empoyee_for_details: null
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});
