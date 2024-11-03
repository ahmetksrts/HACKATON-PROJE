// database.js
import { createConnection } from 'mysql2';

// MySQL bağlantısı
const dbT = createConnection({
  host: '127.0.0.1',
  user: 'root', // MySQL kullanıcı adınız
  password: 'new_password', // MySQL şifreniz
  database: 'PROJECT_TITLES' // Veritabanı adınız
});

// Bağlantı testi
dbT.connect((err) => {
  if (err) {
    console.error('Bağlantı hatası:', err);
  } else {
    console.log('Bağlantı başarılı');
  }
});

export {dbT}; // local de bulunan veritabanını export ediyoruz
