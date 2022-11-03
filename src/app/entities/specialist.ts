import { DayAvailability } from "./day-availability";
import { User } from "./user";

export class Specialist extends User {
	speciality:string[] = [];
	availability:DayAvailability[] = []
}
