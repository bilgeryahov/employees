import Vue from 'vue';
import EmployeeDetails from '../../src/components/EmployeeDetails.vue';

// Import the mocks to be used.
import { EMPLOYEE_MOCK } from '../mocks';

/**
 * Initialize the Vue component.
 * Attach the props.
 * 
 * @param {*} Component 
 * @param {*} propsData 
 * @returns { Object }
 */
function testHelper(Component, propsData) {
    const Constructor = Vue.extend(Component);
    const vm = new Constructor({ propsData }).$mount();
    return vm.$options.propsData;
}

/**
 * Make sure that the component props are being applied properly.
 */
describe('EmployeeDetails', () => {
    it('renders correctly with different props', () => {
        expect(Object.keys(testHelper(EmployeeDetails, { employeeDetails: EMPLOYEE_MOCK }).employeeDetails))
            .toEqual(Object.keys(EMPLOYEE_MOCK));
    });
});
