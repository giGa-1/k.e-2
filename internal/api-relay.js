export default function getJson(path) {
	return fetch(`https://kinopoiskapiunofficial.tech/api/${path}`, {
		method: 'GET',
		headers: {
			'X-API-KEY': '7ebcfdcb-9d10-4209-a398-030ec26370f8',
			'Content-Type': 'application/json',
		},
	}).then(res => res.json());
}