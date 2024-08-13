const catsAPI = 'https://catfact.ninja/fact';

async function getCat(api: string = catsAPI): Promise<void> {
	try {
		const catsResponse = await fetch(api);
		if (!catsResponse.ok) {
			throw new Error('Network response was not ok');
		}
		const catsData = await catsResponse.json();

		await catsTranslator({
			factEN: catsData.fact,
			sourceLang: 'en',
			targetLang: 'ru',
		});
	} catch (e) {
		console.error('Error fetching cat fact:', e);
	}
}
s;
type TranslateorTypes = {
	factEN: string;
	sourceLang?: string;
	targetLang?: string;
};
async function catsTranslator({
	factEN,
	sourceLang = 'en',
	targetLang = 'ru',
}: TranslateorTypes): Promise<void> {
	try {
		const response = await fetch(
			`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
				factEN
			)}&langpair=${sourceLang}|${targetLang}`
		);

		if (!response.ok) {
			throw new Error('Translation request failed');
		}
		const data = await response.json();

		return data.responseData.translatedText;
	} catch (e) {
		console.error('Error translating text:', e);
	}
}

getCat();
