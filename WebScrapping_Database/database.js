import { createConnection } from 'mysql2';
import { getArticles } from './index.js'; // index.js'ten getArticles fonksiyonunu import ediyoruz

// MySQL bağlantısı
const db = createConnection({
  host: '127.0.0.1',
  user: 'root', // MySQL kullanıcı adınız
  password: 'new_password', // MySQL şifreniz
  database: 'PROJECT_TITLES' // Veritabanı adınız
});

db.connect(err => {
  if (err) {
    console.error('MySQL bağlantısı sağlanamadı:', err);
    return;
  }
  console.log('MySQL bağlantısı sağlandı.');
  // Tabloyu oluşturma ve veri ekleme işlemlerini başlatıyoruz
  const query = 'AI'; // index.js den query i al
  insertArticlesWithTable(query); // değişebilir!!
});

// Tabloyu oluşturma ve verileri ekleme fonksiyonu
async function insertArticlesWithTable(query) {
  const tableName = query.replace(/[^a-zA-Z0-9_]/g, ''); // Geçerli tablo adı için yalnızca harf, rakam ve alt çizgi karakterleri bırakılıyor
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    )
  `;
  db.query(`DROP TABLE IF EXISTS \`${tableName}\``);
  db.query(createTableQuery, (err, result) => {
    console.log(`Tablo '${tableName}' oluşturuldu veya zaten mevcut.`);
    insertArticles(tableName); // Verileri tabloya ekleme işlemi
  });
}

// Verileri tabloya ekleme fonksiyonu
async function insertArticles(tableName) {
  const { articles } = await getArticles(); // API'den makaleleri çekiyoruz
  const values = articles.map(article => [article.title]);

  // Eğer values boşsa, tabloya veri eklemeyi atla
  if (values.length === 0) {
    console.log(`Eklenecek makale başlığı bulunamadı. '${tableName}' tablosuna veri eklenmedi.`);
    db.end(); // Bağlantıyı kapatıyoruz
    return;
  }

  const insertQuery = `INSERT INTO ${tableName} (title) VALUES ?`;

  db.query(insertQuery, [values], (err, result) => {
    if (err) throw err;
    console.log(`${result.affectedRows} makale başlığı '${tableName}' tablosuna eklendi.`);
    db.end(); // Bağlantıyı kapatıyoruz
  });
}
