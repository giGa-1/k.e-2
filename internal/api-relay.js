export default function getJson(path) {
	return fetch(`https://kinopoiskapiunofficial.tech/api/${path}`, {
		method: 'GET',
		headers: {
			'X-API-KEY': 'eb2b25d1-cff2-447a-b471-9f49da564eef',
			'Content-Type': 'application/json',
		},
	}).then(res => res.json());
}