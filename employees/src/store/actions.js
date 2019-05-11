import * as types from './mutation-types';

export const signIn = ({ commit }, user_payload) => commit(types.SIGN_IN, user_payload);
export const signOut = ({ commit }) => commit(types.SIGN_OUT);
export const setEmployees = ({ commit }, employees_payload) => commit(types.SET_EMPLOYEES, employees_payload);
export const setEmployeeForDetails = ({ commit }, employee_for_details_payload) => commit(types.SET_EMPLOYEE_FOR_DETAILS, employee_for_details_payload);
