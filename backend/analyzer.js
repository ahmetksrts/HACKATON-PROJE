// analyzer.js
import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
});

const generationConfig = {
    temperature: 1.6,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(titles) { // ana fonksiyon
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    // titles listesini stringe dönüştürerek listeyi düzenle
    const titlesString = titles.join(", ");


    const result = await chatSession.sendMessage(
        `SADECE BU LİSTEYİ ANALİZ EDEREK CEVAP VERMENİ İSTİYORUM:\n${titlesString}.
        \nSADECE BİR CÜMLE, BU LİSTEDE OLMAYAN BİR PROJE BAŞLIĞI OLUŞTUR.
        \nARDINDAN ÇOK AZICIK SADECE 4 CÜMLE OLACAK ŞEKİLDE BU PROJENİN DETAYLARI VE LİSTEDEKİ HANGİ PROJELERDEN İLHAM ALDIĞININ BİLGİSİNİ VER.
        \nCEVABI TAMAMEN TÜRKÇE YAZ!!`
    ); // titles listesini iletin
    console.log("Analysis Result:", result.response.text()); // Konsola yazdırma
    
    return result.response.text(); // Analiz sonucunu döndür
}

export { run }; // Fonksiyonu dışa aktarma