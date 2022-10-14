const Astronomy = require('astronomy-engine');
const functions = require('./database/bot/functions.js');

function DisplayEvent(name, evt) {
	let text = evt ? evt.date.toISOString() : '';
	return (name.padEnd(32) + ' : ' + functions.ParseDate(text));
}

function Demo() {
	if (process.argv.length === 3) {
		let year = parseInt(process.argv[2]);
		if (!Number.isSafeInteger(year)) {
			console.log(`ERROR: Not a valid year: "${process.argv[2]}"`);
			process.exit(1);
		}
		let seasons = Astronomy.Seasons(year);
		out = "";
		out += DisplayEvent('March equinox (Spring start)', seasons.mar_equinox) + "\n";
		out += DisplayEvent('June solstice (Summer start', seasons.jun_solstice) + "\n";
		out += DisplayEvent('September equinox (Fall start)', seasons.sep_equinox) + "\n";
		out += DisplayEvent('December solstice (Winter start)', seasons.dec_solstice);
		console.log(out)
		process.exit(0);
	} else {
		console.log('USAGE: node seasons.js year');
		process.exit(1);
	}
}

Demo();