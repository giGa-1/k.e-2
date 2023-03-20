export default function getJson(path) {
	return fetch(`https://kinopoiskapiunofficial.tech/api/${path}`, {
		method: 'GET',
		headers: {
			'X-API-KEY': '8cf31ece-1bd7-4c03-824e-7613feddfdb3',
			'Content-Type': 'application/json',
		},
	}).catch(err => {
		console.log(`fetch err ${err}`)
	}).then(res => res.json());
}