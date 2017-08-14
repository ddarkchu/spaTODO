
function hashToValue() {
	let data = {};
	for(let item of location.hash.replace("#/", "").split("&")) {
		let keyValue = item.split('=');
		data[keyValue[0]] = keyValue[1];
	}
	return data;
}

function hashToValue() {
	let data = {};
	for(let item of location.hash.replace("#/", "").split("&")) {
		let keyValue = item.split('=');
		data[keyValue[0]] = keyValue[1];
	}
	return data;
}
