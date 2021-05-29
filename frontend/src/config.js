const appName = 'SportsApp';
const version = '1.0.0';
const dev = true;

const devConfig = {
	DEBUG: true,
	APP_NAME: appName,
	VERSION: version,
	API_URL: 'http://localhost:8080'
};
Object.freeze(devConfig);

const prdConfig = {
	DEBUG: false,
	APP_NAME: appName,
	VERSION: version,
	API_URL: 'http://localhost:8080'
};
Object.freeze(prdConfig);

export default dev ? devConfig : prdConfig;