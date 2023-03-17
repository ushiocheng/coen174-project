import Rule from "../Rule"
import Schedule from "../Schedule";

class NoTimeConflict implements Rule {
    private _minBetweenClass : number;
    test (s : Schedule) : boolean {
        // TODO
        console.log(this._minBetweenClass);
        console.log(s); // Log s to prevent unused var warning
        return false;
    }
    toString(): String {
        return `Min time between class: ${this._minBetweenClass} min`;
    }
    constructor(minBetweenClass:number) {
        this._minBetweenClass = minBetweenClass;
    }
}
export default NoTimeConflict;
