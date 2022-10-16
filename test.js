const fetch = require("node-fetch");


start();
async function start() {
	var latitude = -12
	var longitude = -76
	var url = `https://visible-planets-api.herokuapp.com/v3?latitude=${latitude}&longitude=${longitude}}`
	let data = await fetch(url).then(res => res.json());
	console.log()
	for (body of data.data) {
		console.log(body.name)
		console.log(`Constellation: ${body.constellation}`)
		console.log(`Altitude: ${body.altitude.toFixed(5)}`)
		console.log(`Azimuth: ${body.azimuth.toFixed(5)}`)
		console.log(`Magnitude: ${body.magnitude.toFixed(5)}`)
		console.log(`Is visible to the naked eye: ${body.nakedEyeObject ? "Yes": "No"}\n\n`)
		
		console.log(`Name: ${body.name}`)
		console.log(`Constellation: ${body.constellation}`)
		console.log(`Right Ascension:`)
		console.log(`-Negative: ${body.rightAscension.negative}`)
		console.log(`-Hours: ${body.rightAscension.hours}`)
		console.log(`-Minutes: ${body.rightAscension.minutes}`)
		console.log(`-Seconds: ${body.rightAscension.seconds}`)
		console.log(`-Raw: ${body.rightAscension.raw}`)
		console.log(`Declination:`)
		console.log(`-Negative: ${body.declination.negative}`)
		console.log(`-Degrees: ${body.declination.degrees}`)
		console.log(`-Arc Minutes: ${body.declination.arcminutes}`)
		console.log(`-Arc Seconds: ${body.declination.arcseconds}`)
		console.log(`-Raw: ${body.declination.raw}`)
		console.log(`Altitude: ${body.altitude}`)
		console.log(`Azimuth: ${body.azimuth}`)
		console.log(`Above Horizon: ${body.aboveHorizon}`)
		console.log(`Magnitude: ${body.magnitude}`)
		console.log(`Naked Eye Object: ${body.nakedEyeObject}`)
	}
}