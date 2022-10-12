const Astronomy = require('astronomy-engine');
const functions = require('./database/bot/functions.js');
const observer = new Astronomy.Observer(-12.0406187, -76.9524425, 0);

// console.log((Astronomy.SearchLocalSolarEclipse(new Date(), observer)));
let count = 0;
let eclipse = Astronomy.SearchLocalSolarEclipse(new Date(), observer);
for (; ;) {
	if (eclipse.kind !== Astronomy.EclipseKind.Penumbral) {
		// PrintEclipse(eclipse);
		console.log(eclipse.peak.time.date)
		if (++count === 100) {
			break;
		}
	}
	eclipse = Astronomy.NextLocalSolarEclipse(eclipse.peak.time, observer);
}
// GlobalSolarEclipseInfo {
// 	kind: 'partial',
// 		peak: AstroTime {
// 		date: 2022 - 10 - 25T11: 00: 42.046Z,
// 			ut: 8332.958819980026,
// 				tt: 8332.959666708464
// 	},
// 	distance: 6821.533532450876,
// 		latitude: undefined,
// 			longitude: undefined
// }
// LunarEclipseInfo {
// 	kind: 'total',
// 		peak: AstroTime {
// 		date: 2022 - 11 - 08T10: 59: 49.329Z,
// 			ut: 8346.958209834836,
// 				tt: 8346.959056819238
// 	},
// 	sd_penum: 177.25347031635465,
// 		sd_partial: 110.23512704938184,
// 			sd_total: 42.83427829112043
// }
// LocalSolarEclipseInfo {
// 	kind: 'partial',
// 		partial_begin: EclipseEvent {
// 		time: AstroTime {
// 			date: 2023 - 10 - 14T17: 30: 09.806Z,
// 				ut: 8687.229280171194,
// 					tt: 8687.230133435498
// 		},
// 		altitude: 80.28293802589471
// 	},
// 	total_begin: undefined,
// 		peak: EclipseEvent {
// 		time: AstroTime {
// 			date: 2023 - 10 - 14T19: 05: 26.243Z,
// 				ut: 8687.295442628058,
// 					tt: 8687.296295893593
// 		},
// 		altitude: 57.41521793703402
// 	},
// 	total_end: undefined,
// 		partial_end: EclipseEvent {
// 		time: AstroTime {
// 			date: 2023 - 10 - 14T20: 32: 08.263Z,
// 				ut: 8687.35565120059,
// 					tt: 8687.356504467249
// 		},
// 		altitude: 36.23724990595079
// 	}
// }