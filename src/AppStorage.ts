import { Workday } from "./types/Workday";

export namespace AppStorage {
	export function saveWorkdays(workdays: Workday[]) {
		localStorage.setItem("workdays", JSON.stringify(workdays.map(wd => ({
			...wd,
			date: wd.date.toISOString()
		}))));
	}

	export function loadWorkdays(): Workday[] {
		const storedWorkdays = localStorage.getItem("workdays");
		if (storedWorkdays === null) {
			return [];
		}

		return JSON.parse(storedWorkdays).map((wd: Workday) => ({
			...wd,
			date: new Date(wd.date)
		}));
	}
}
