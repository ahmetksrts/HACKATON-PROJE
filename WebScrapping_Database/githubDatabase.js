import { createConnection } from 'mysql2';
import { countProjects } from './githubAPI.js';

// MySQL bağlantısı
const db = createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'new_password',
  database: 'PROJECT_COUNT'
});

db.connect(err => {
    if (err) {
      console.error('MySQL bağlantısı sağlanamadı:', err);
      return;
    }
    console.log('MySQL bağlantısı sağlandı.');
    const query = 'Security';
    insertArticlesWithTable(query);
});

async function insertArticlesWithTable(query) {
    const tableName = query.replace(/[^a-zA-Z0-9_]/g, '');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        count INT NOT NULL
      )
    `;
    db.query(`DROP TABLE IF EXISTS \`${tableName}\``);
    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log(`Tablo '${tableName}' oluşturuldu veya zaten mevcut.`);
      insertArticles(tableName);
    });
}

async function insertArticles(tableName) {
    const { articles } = await countProjects(); 
    const values = articles.map(article => [article.title, article.count]);

    if (values.length === 0) {
      console.log(`Eklenecek makale başlığı bulunamadı. '${tableName}' tablosuna veri eklenmedi.`);
      db.end();
      return;
    }

    const insertQuery = `INSERT INTO ${tableName} (title, count) VALUES ?`;

    db.query(insertQuery, [values], (err, result) => {
      if (err) throw err;
      console.log(`${result.affectedRows} makale başlığı '${tableName}' tablosuna eklendi.`);
      db.end();
    });
}
