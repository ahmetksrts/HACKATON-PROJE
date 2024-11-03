// server.js
import express, { json } from 'express'; // sunucu EXPRESS kütüphanesini dahil etme
import cors from 'cors'; // sunucu için CORS kütüphanesini dahil etme
import { dbT } from './projectTitlesDatabase.js'; // proje başlıkları veritabanını dahil etme
import { dbC } from './projectCountsDatabase.js'; // proje sayıları veritabanını dahil etme

const app = express(); // EXPRESS tanımlama
const port = 3000; // sunucunun çalışacağı port
import { run } from './analyzer.js';
import { dataFormat } from './countProjects.js';


// Middleware
app.use(cors());
app.use(json());

// GET endpoint: /api/table/:query
app.get('/api/table/:query', async (request, result) => {
    const query = request.params.query;
    console.log(query);

    // Başlıkların bulunduğu tablo içeriğini döndür
    const sqlQuery = `SELECT * FROM ${query}`;
    dbT.query(sqlQuery, async (error, results) => {
        if (error) {
            console.error('Veritabanı sorgu hatası:', error);
            return result.status(500).json({ error: 'Veritabanı hatası' });
        }

        // "title" alanlarını içeren bir liste oluştur
        const titles = results.map(row => row.title);
        console.log('Title değerleri:', titles);

        // analyzer.js'deki run fonksiyonunu çağır
        const analysisResult = await run(titles); // titles listesini gönder

        // "title" değerlerini ve "analysisResult" değerini JSON formatında döndür
        result.json({ titles, analysisResult });
    });
});

// proje sayısı için endpoint
app.get('/api/tableGit/:query', async (request, result) => {
    const query = request.params.query;
    console.log(query); // seçilen alanın query özelliğini debug için  

    const selectQuery = `SELECT id, title, count FROM ${query}`;

    dbC.query(selectQuery, async (error, results) => {
        if (error) {
            console.error('Veri alınırken hata oluştu:', error);
            return result.status(500).json({ error: 'Tablodan veri alınamadı' });
        }

        // sonuçta alınan JSON dosyasını formatlama
        const resString = results
            .map(row => `Yıl: ${row.title}, Proje Sayısı: ${row.count}`)
            .join(', '); // her satırı virgülle ayır
        
        console.log(resString); // sonuç dizesini debug için konsola yazdır
        const formattedCountResult = await dataFormat(resString); // formatlanan listeyi endpoint ile gönder 
        result.json(formattedCountResult);
    });
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});
