# HACKATON PROJE

## Genel Bakış
Bu proje, BTK Akademi'nin düzenlemiş olduğu HACKATON 2024 kapsamında geliştirilmiştir.. Proje, **backend** ve **frontend** bileşenlerinden oluşmakta olup, web scraping işlevselliği ve MySQL ile **local** de çalışan bir veritabanından oluşmaktadır.

## Proje Yapısı
HACKATON PROJE/ 
│ ├── backend/ # Arka uç (Node.js) dosyaları 
    │ ├── analyzer.js # Verileri analiz eden modül 
    │ ├── countProjects.js # Proje sayısını hesaplayan modül 
    │ ├── projectCountsDatabase.js # Proje sayıları veritabanı işlemleri 
    │ ├── projectTitlesDatabase.js # Proje başlıkları veritabanı işlemleri 
    │ ├── server.js # Sunucu başlangıç dosyası 
    │ ├── package.json # Arka uç bağımlılıkları 
    │ └── package-lock.json # Arka uç bağımlılık kilidi 
│ ├── frontend/ # Ön yüz (React/Vite) dosyaları 
    │ ├── public/ # Statik dosyalar 
    │ ├── src/ # Uygulama kaynak dosyaları 
    │ ├── index.html # Ana HTML dosyası 
    │ ├── vite.config.js # Vite yapılandırma dosyası 
    │ ├── package.json # Ön yüz bağımlılıkları 
    │ └── package-lock.json # Ön yüz bağımlılık kilidi 
│ ├── WebScrapping_Database/ # Web scraping için veritabanı dosyaları 
    │ ├── database.js # Veritabanı bağlantısı ve işlemleri 
    │ ├── githubAPI.js # GitHub API ile etkileşim 
    │ ├── githubDatabase.js # GitHub veritabanı işlemleri 
    │ ├── index.js # Web scraping başlangıç dosyası 
    │ ├── package.json # Web scraping bağımlılıkları 
    │ └── package-lock.json # Web scraping bağımlılık kilidi 
│ └── README.md #


## Kurulum

1. **Node.js ve npm'yi yükleyin.**
   Projeyi çalıştırmadan önce, sisteminizde Node.js ve npm yüklü olmalıdır. Yüklemek için [Node.js resmi web sitesini](https://nodejs.org/) ziyaret edin.

2. **Bağımlılıkları Yükleme**
   Hem arka uç hem de ön yüz bağımlılıklarını yüklemek için, aşağıdaki komutları her klasör içinde çalıştırın:

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install

   cd ../WebScrapping_Database
   npm install

## Veritabanını Hazırlama
Öncelikle veritabanı için MySQL kullanılmıştır. **Local** de iki tane veritabanı oluşturmamız gerek. Bir tanesi web scrapping ile çekilen proje başlıkları verilerini depolamak için oluşturulacak. Diğeri ise GithubAPI kullanılarak çekilen proje sayıları verilerini depolamak için oluşturulacak.

Veritabanına proje başlıklarını eklemek için projenin ana dizininde şu komut çalıştırılmalıdır:
    ```
    cd WebScrapping_Database
    node database.js

Veritabanına proje sayılarını eklemek için projenin ana dizininde şu komut çalıştırılmalıdır:
    ```
    cd WebScrapping_Database
    node githubDatabase.js

Not: GithubAPI (githubAPI.js) de yapılan proje sayıları araması "[query] projects" şeklinde yapılmıştır.
Not: arxiv.com da yapılan proje başlıkları araması için doğrudan "[query]" kullanılmıştır.
Not: Projenin **backend** klasöründe bulunan **.env** dosyasında, Gemini AI API yi kullanabilmek için API anahtarını yazmak gerekmektedir.

## Çalıştırma
Projeyi başlatmak için ana dizinde aşağıdaki komutu çalıştırın:
    ```
    npm start

## Kullanım
Proje, kullanıcı arayüzünde seçilmiş olan (kullanıcı tarafından) proje alanı için, web scrapping ile hazırlanan proje başlıkları veritabanını kullanarak Gemini AI ile yeni bir proje konusu önerisi almayı amaçlıyor. Aynı zamanda kullanıcı arayüzü kısmında seçilen proje alanı ile ilgili yıllara göre proje sayıları dağılımını grafik olarak vererek daha canlı bir kullanıcı arayüzü sunmak amaçlanmıştır.

## Lisans
Bu proje MIT Lisansı altında lisanslanmıştır.