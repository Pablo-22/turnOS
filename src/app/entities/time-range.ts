import { Time } from "./time";


export class TimeRange {
	from:Time = new Time();
	to:Time = new Time();

	getDuration(): Time|undefined {
		return Time.timeInterval(this.from, this.to);
	}

	getIntervals(minutes:number){
		return Time.getIntervals(this.from, this.to, minutes);
	}
}
