import { mount } from '@vue/test-utils';
import Signin from '../../src/components/Signin.vue';

describe('Signin component', () => {
    const signIn = jest.fn();
    const wrapper = mount(Signin, {
        methods: {
            signIn
        }
    });
    it('calls "signIn" when button is clicked', () => {
        wrapper.find('button.signin-btn').trigger('click');
        expect(signIn).toHaveBeenCalled();
    });
    it('expects the initial data email and password to be empty', () => {
        expect(typeof Signin.data).toBe('function');
        const defaultData = Signin.data();
        expect(defaultData.email).toBe('');
        expect(defaultData.password).toBe('');
    });
});
