import Schedule from './Schedule'

interface Rule {
    test (s: Schedule) : boolean;
}

export default Rule;