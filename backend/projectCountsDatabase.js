// projectCountDatabase.js
import { createConnection } from 'mysql2';

// MySQL bağlantısı
const dbC = createConnection({
  host: '127.0.0.1',
  user: 'root', // MySQL kullanıcı adınız
  password: 'new_password', // MySQL şifreniz
  database: 'PROJECT_COUNT' // Veritabanının ismi
});

// Bağlantı testi
dbC.connect((err) => {
  if (err) {
    console.error('Bağlantı hatası:', err);
  } else {
    console.log('Bağlantı başarılı');
  }
});

export {dbC}; // local de bulunan veritabanını export ediyoruz