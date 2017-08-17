export function getParams(){
	let data = {};
	for(let item of location.search.replace("?", "").split("&")) {
		let keyValue = item.split('=');
		data[keyValue[0]] = keyValue[1];
	}
	return data;
}
export function hashToValue() {
	let data = {};
	for(let item of location.hash.replace("#/", "").split("&")) {
		let keyValue = item.split('=');
		data[keyValue[0]] = keyValue[1];
	}
	return data;
}
