import Dashboard from '../../src/components/Dashboard.vue';

describe('Dashboard component', () => {
    it('has a mounted hook', () => expect(typeof Dashboard.mounted).toBe('function'));
    it('sets the correct default data', () => {
        expect(typeof Dashboard.data).toBe('function');
        const defaultData = Dashboard.data();
        expect(defaultData.error.message).toBe('');
    });
});
