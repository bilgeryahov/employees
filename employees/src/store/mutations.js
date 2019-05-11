import * as types from './mutation-types';
import {
    DEFAULT_STATE
} from './defaults';

export const mutations = {
    [types.SIGN_IN](state, user_payload) {
        state.user = user_payload;
    },
    [types.SIGN_OUT](state) {
        state = { ...DEFAULT_STATE };
    },
    [types.SET_EMPLOYEES](state, employees_payload) {
        state.employees = employees_payload;
    },
    [types.SET_EMPLOYEE_FOR_DETAILS](state, employee_for_details_payload) {
        state.empoyee_for_details = employee_for_details_payload;
    }
};
