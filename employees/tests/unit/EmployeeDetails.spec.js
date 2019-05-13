import { mount } from '@vue/test-utils';
import EmployeeDetails from '../../src/components/EmployeeDetails.vue';

// Import the mocks to be used.
import { EMPLOYEE_MOCK } from '../mocks';

describe('EmployeeDetails', () => {
    const wrapper = mount(EmployeeDetails, {
        propsData: {
            employeeDetails: EMPLOYEE_MOCK
        }
    });
    it('it is able to correctly set Component props.', () => {
        expect(Object.keys(wrapper.props().employeeDetails)).toEqual(Object.keys(EMPLOYEE_MOCK));
    });
    it('it fetches a correct employee name from within the props data.', () => {
        expect(wrapper.find('h5').text()).toBe(EMPLOYEE_MOCK.first_name);
    });
    it('it renders the employee info list with correct number of items.', () => {
        expect(wrapper.find('ul').findAll('li').length).toBe(Object.keys(EMPLOYEE_MOCK).length);
    });
});
