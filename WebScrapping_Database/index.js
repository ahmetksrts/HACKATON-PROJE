import axios from 'axios';
import { load } from 'cheerio';

// Gecikme fonksiyonu
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchArticles(query, maxResults) {
    const articles = [];
    const baseUrl = 'https://arxiv.org/search/?query=' + encodeURIComponent(query) + '&searchtype=all&source=header';

    const pagesToFetch = Math.ceil(maxResults / 25);
    let totalFetched = 0;

    for (let i = 0; i < pagesToFetch; i++) {
        const url = `${baseUrl}&start=${i * 25}`;
        try {
            const { data } = await axios.get(url);  // axios.get olarak güncellendi
            const $ = load(data);
            let pageResults = 0;

            $('.arxiv-result').each((index, element) => {
                const title = $(element).find('p.title').text().trim();

                articles.push({ title });
                pageResults++;
                totalFetched++;

                if (articles.length >= maxResults) {
                    return false;
                }
            });

            if (pageResults < 25 || articles.length >= maxResults) {
                break;
            }

            await delay(1000); // Her istek arasında 1 saniye bekleme

        } catch (error) {
            console.error('Error fetching articles:', error);
            break;
        }
    }

    return {
        articles: articles.slice(0, maxResults),
        totalFetched
    };
}

async function getArticles() {
    const query = 'AI';
    const maxResults = 200;
    const response = await fetchArticles(query, maxResults);
    return response;
}

export { getArticles }; // Export ediyoruz
