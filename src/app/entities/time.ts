import { TimeRange } from "./time-range";

export class Time {
	hours:number;
	minutes:number;

	constructor(){
		this.hours = 0;
		this.minutes = 0;
	}

	setHours(hours:number){
		let intHours = Math.round( hours )
		if (intHours < 0) {
			while (intHours < -23) {
				intHours += 24
			}

			this.hours = 23 - (intHours * -1); 
		} else {
			while (intHours > 23) {
				intHours -= 24
			}
			
			this.hours = intHours;
		}
	}

	setMinutes(minutes:number){
		let intMinutes = Math.round( minutes ) 

		if (intMinutes < 0) {
			while (intMinutes < -59) {
				intMinutes += 60
				this.decreaseHour();
			}
			this.decreaseHour();
			this.minutes = 60 + intMinutes;
		} else {
			while (intMinutes > 59){
				intMinutes -= 60
				this.increaseHour();
			}
			
			this.minutes = intMinutes
		}
	}

	increaseHour(){
		if (this.hours + 1 == 24) {
			this.hours = 0;
		} else {
			this.hours++
		}
	}

	decreaseHour(){
		if (this.hours - 1 == -1) {
			this.hours = 23;
		}else {
			this.hours--
		}
	}

	addMinutes(minutes:number){
		let intMinutes = Math.round( minutes ) 

		intMinutes += this.minutes;

		this.setMinutes(intMinutes);
	}

	static addMinutes(time:Time, minutes:number){
		let intMinutes = Math.round( minutes ) 
		let auxTime = Object.assign(new Time, time)

		intMinutes += auxTime.minutes;

		auxTime.setMinutes(intMinutes);

		return auxTime;
	}

	addHours(hours:number){
		let intHours = Math.round( hours ) 

		intHours += this.hours;

		this.setHours(intHours);
	}

	static timeInterval(from:Time, to:Time){
		if (Time.isBiggerThan(from, to)) {
			return;
		}

		let interval = new Time()
		interval.setHours(to.hours - from.hours)
		interval.setMinutes(to.minutes - from.minutes)

		return interval;
	}

	isBiggerThan(timeToCompare:Time):boolean{
		if (this.hours > timeToCompare.hours) {
			return true;
		} else if (this.hours == timeToCompare.hours) {
			if (this.minutes >= timeToCompare.minutes) {
				return true
			}
		}

		return false;
	}

	static isBiggerThan(baseTime:Time, timeToCompare:Time):boolean{
		if (baseTime.hours > timeToCompare.hours) {
			return true;
		} else if (baseTime.hours == timeToCompare.hours) {
			if (baseTime.minutes >= timeToCompare.minutes) {
				return true
			}
		}

		return false;
	}

	isBetween(from:Time, to:Time){
		if (!Time.timeInterval(this, from)) {
			if (Time.timeInterval(this, to)) {
				return true
			}
		}
		return false
	}

	static getIntervals(from:Time, to:Time, minutes:number){
		let totalTime = Time.timeInterval(from, to);

		let auxTime = Object.assign(new Time, from);
		let auxTimePlusMinutes = Time.addMinutes(auxTime, minutes);

		let timeRanges = []

		while(Time.isBiggerThan(to, auxTimePlusMinutes) || Time.isEqualThan(to, auxTimePlusMinutes)){
			let newTimeRange = new TimeRange()
			newTimeRange.from = Object.assign(new Time, auxTime);

			auxTime.addMinutes(minutes);
			newTimeRange.to = Object.assign(new Time, auxTime);

			timeRanges.push(Object.assign(new TimeRange, newTimeRange));
			auxTimePlusMinutes = Time.addMinutes(auxTime, minutes);
		}

		return timeRanges;
	}

	divideBy(minutes:number){
		let auxTime = new Time();
		let auxTimePlusMinutes = Time.addMinutes(auxTime, minutes);

		let timeRanges = []

		while(this.isBiggerThan(auxTimePlusMinutes) || this.isEqualThan(auxTimePlusMinutes)){
			let newTimeRange = new TimeRange()
			newTimeRange.from = Object.assign(new Time, auxTime);

			auxTime.addMinutes(minutes);
			newTimeRange.to = Object.assign(new Time, auxTime);

			timeRanges.push(Object.assign(new TimeRange, newTimeRange));
			auxTimePlusMinutes = Time.addMinutes(auxTime, minutes);
		}

		return timeRanges;
	}

	isEqualThan(time:Time){
		return this.hours == time.hours && this.minutes == time.minutes
	}

	static isEqualThan(baseTime:Time, timeToCompare:Time){
		return baseTime.hours == timeToCompare.hours && baseTime.minutes == timeToCompare.minutes
	}
}
