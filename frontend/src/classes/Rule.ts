import Schedule from './Schedule'

interface Rule {
    test (s: Schedule) : boolean;
    /**
     * Convert to String for displaying
     */
    toString() : String;
}

export default Rule;
