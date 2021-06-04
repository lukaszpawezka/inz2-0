export const sleep = ms =>
	new Promise(resolve => setTimeout(resolve, ms));

export const pause = ms => {
	const now = new Date().getTime();
	while (new Date().getTime() < now + ms) { }
}

export const formatAsCurrency = value =>
	new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN'
	}).format(value);
