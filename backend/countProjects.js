// countProjects.js

// veriyi daha düzenli bir formata çevirme
const formatData = (data) => {
    const years = [];
    const counts = [];
    
    console.log("Initial data received for parsing:", data);

    // ekstra düzenleme
    const regex = /Yıl:.*?(\d{4}).*?Proje Sayısı:\s*(\d+)/g;
    let match;

    while ((match = regex.exec(data)) !== null) {
        years.push(parseInt(match[1])); // yıllar
        counts.push(parseInt(match[2])); // sayılar
    }

    // uyarı durumu
    if (years.length === 0 || counts.length === 0) {
        console.warn("No valid pairs found in input data.");
    }     
    return { years, counts };
};


async function dataFormat(data) {
    // Veriyi formatla
    const formattedData = formatData(data);
    
    console.log("Formatlanmış veri:", formattedData);

    return formattedData;
}

export { dataFormat };
