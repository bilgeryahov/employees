import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';
import * as actions from './actions';
import {
    DEFAULT_STATE
} from './defaults';

Vue.use(Vuex);

// Default the state.
const state = { ...DEFAULT_STATE };

// Initialize the main Vuex Store.
export default new Vuex.Store({
    state,
    mutations,
    actions
});
