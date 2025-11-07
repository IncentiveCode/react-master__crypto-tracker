export async function fetchCoins() {
	return fetch("/react-master__crypto-tracker/data.json")
		.then((res) => res.json());
}

export async function fetchCoinInfo(coinId: string) {
	return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
		.then((res) => res.json());
}

export async function fetchPriceInfo(coinId: string) {
	return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
		.then((res) => res.json());
}