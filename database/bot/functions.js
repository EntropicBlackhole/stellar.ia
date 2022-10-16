exports.Pad = Pad
exports.FormatDate = FormatDate
exports.printEclipse = printEclipse
exports.ParseDate = ParseDate
exports.subStrBetweenChar = subStrBetweenChar
exports.DisplayEvent = DisplayEvent
exports.randomColor = randomColor
exports.shortenText = shortenText

function Pad(s, w) {
	s = s.toFixed(0);
	while (s.length < w) {
		s = '0' + s;
	}
	return s;
}
function DisplayEvent(name, evt) {
	let text = evt ? evt.date.toISOString() : '';
	return (name.padEnd(32) + ' : ' + functions.ParseDate(text));
}
function FormatDate(t) {
	const date = t.date;
	var year = Pad(date.getUTCFullYear(), 4);
	var month = Pad(1 + date.getUTCMonth(), 2);
	var day = Pad(date.getUTCDate(), 2);
	var hour = Pad(date.getUTCHours(), 2);
	var minute = Pad(date.getUTCMinutes(), 2);
	var svalue = date.getUTCSeconds() + (date.getUTCMilliseconds() / 1000);
	var second = Pad(Math.round(svalue), 2);
	return `${year}-${month}-${day} ${hour}:${minute}:${second} UTC`;
}
function printEclipse(e, type) {
	const MINUTES_PER_DAY = 24 * 60;
	let out = ""
	if (type == 'solar-local') {
		const p1 = e.partial_begin.time;
		out += (`${FormatDate(p1)} - Partial eclipse begins.\n`);
		if (e.total_begin != undefined) {
			const t1 = e.total_begin.time;
			out += (`${FormatDate(t1)} - Total eclipse begins.\n`);
		}
		out += (`${FormatDate(e.peak.time)} - Peak of ${e.kind} eclipse.\n`);
		if (e.total_end != undefined) {
			const t2 = e.total_end.time
			out += (`${FormatDate(t2)} - Total eclipse ends.\n`);
		}
		const p2 = e.partial_end.time
		out += (`${FormatDate(p2)} - Partial eclipse ends.`);
	}
	else if (type == 'solar-global') {
		out += `${FormatDate(e.peak)} - Peak of ${e.kind} eclipse.`
	}
	else if (type == 'lunar') {
		const p1 = e.peak.AddDays(-e.sd_partial / MINUTES_PER_DAY);
		out += (`${FormatDate(p1)} - Partial eclipse begins.\n`);
		if (e.sd_total > 0) {
			const t1 = e.peak.AddDays(-e.sd_total / MINUTES_PER_DAY);
			out += (`${FormatDate(t1)} - Total eclipse begins.\n`);
		}
		out += (`${FormatDate(e.peak)} - Peak of ${e.kind} eclipse.\n`);
		if (e.sd_total > 0) {
			const t2 = e.peak.AddDays(+e.sd_total / MINUTES_PER_DAY);
			out += (`${FormatDate(t2)} - Total eclipse ends.\n`);
		}
		const p2 = e.peak.AddDays(+e.sd_partial / MINUTES_PER_DAY);
		out += (`${FormatDate(p2)} - Partial eclipse ends.`);

	} else return `Error: ${type} is not a valid type of eclipse`;
	return out;
}
function ParseDate(text) {
	const d = new Date(text);
	if (!Number.isFinite(d.getTime())) {
		console.error(`ERROR: Not a valid date: "${text}"`);
		return null
	}
	return d;
}
function subStrBetweenChar(string, start, end) {
	return string.split(start)[1].split(end)[0]
}
function randomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
function shortenText(text, delimiter, max) {
	if (text.length <= max) return text;
	else {
		newText = text.toString().split(delimiter.toString())
		newText.pop();
		return shortenText(newText.join(delimiter), delimiter, max);
	}
}