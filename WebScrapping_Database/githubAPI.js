// githubAPI.js
import dotenv from 'dotenv';
import get from 'axios';
dotenv.config();


// GitHub API anahtarı
const token = process.env.GITHUB_TOKEN; // .env dosyası

// Belirli bir yıl ve konu için GitHub'da projeleri arayan fonksiyon
async function fetchProjectCountByYear(query, year) {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+created:${year}-01-01..${year}-12-31`;
    try {
        const response = await get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data.total_count;
    } catch (error) {
        console.error(`Error fetching data for year ${year}:`, error.response ? error.response.data : error.message);
        return 0;
    }
}

async function fetchProjectStats(query, startYear, endYear) {
    const stats = [];
    for (let year = startYear; year <= endYear; year++) {
        const count = await fetchProjectCountByYear(query, year);
        stats.push({ year, title: `Projects for Year: ${year}`, count });
        console.log(`Year: ${year}, Projects: ${count}`);
    }
    return stats;
}

// Ana fonksiyon
async function countProjects() {
    const query = 'Security projects';
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear - 1;

    console.log(`Fetching project statistics for: "${query}" from ${startYear} to ${endYear}`);
    const articles = await fetchProjectStats(query, startYear, endYear);

    // Genel istatistikleri göster
    console.log(`\nTotal Projects by Year for "${query}":`);
    articles.forEach(article => {
        console.log(`Year ${article.year}: ${article.count} projects`);
    });

    return { articles };
}

export { countProjects };
