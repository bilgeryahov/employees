import Vue from 'vue';
import EmployeeDetails from '../../src/components/EmployeeDetails.vue';

import { EMPLOYEE_MOCK } from '../mocks';

function testHelper(Component, propsData) {
    const Constructor = Vue.extend(Component);
    const vm = new Constructor({ propsData }).$mount();
    return vm.$options.propsData;
}

describe('EmployeeDetails', () => {
    it('renders correctly with different props', () => {
        expect(Object.keys(testHelper(EmployeeDetails, { employeeDetails: EMPLOYEE_MOCK }).employeeDetails))
            .toEqual(Object.keys(EMPLOYEE_MOCK));
    });
});
