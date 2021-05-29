const parseJson = str => {
	try {
		return JSON.parse(str);
	} catch (e) {
		return str;
	}
}

export const getItem = (key, value) => {
	let item = localStorage.getItem(key);
	item = parseJson(item);
	return item ? item : value;
}

export const setItem = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
}

export const removeItem = key => {
	localStorage.removeItem(key);
}

export const clear = () => {
	localStorage.clear();
}

export const getUrlParam = (url, key) => {
	if (url.indexOf(key) < 0) { return null }

	const offsetSearchByAssignMark = 1;
	const startSearchIndex = url.indexOf(key) + key.length + offsetSearchByAssignMark;
	const endOfParam = url.substring(startSearchIndex).indexOf('&');
	const endSearchIndex = endOfParam < 0 ? undefined : startSearchIndex + endOfParam;

	return url.substring(startSearchIndex, endSearchIndex);
}

export const filterObjectArray = (objectArray, allowedKeys) =>
	objectArray.map(object => filterObject(object, allowedKeys));

export const filterObject = (object, allowedKeys) =>
	Object.keys(object)
		.filter(key => allowedKeys.includes(key))
		.reduce((obj, key) => {
			obj[key] = object[key];
			return obj;
		}, {});
