import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

// grafik için 
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

function App() {
    const [chartData, setChartData] = useState(null);
    const [titlesData, setTitlesData] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);
    const [countsData, setCountsData] = useState();

    const handleSelection = async (query, label) => {
        if (!selectedQuery) {
            setSelectedQuery(query);
            setSelectedLabel(label);
            try {
                const responseOfTitleData = await axios.get(`http://localhost:3000/api/table/${query}`);
                setTitlesData(responseOfTitleData.data.titles); // debug için
                setAnalysisData(responseOfTitleData.data.analysisResult);

                const responseOfCountsData = await axios.get(`http://localhost:3000/api/tableGit/${query}`);
                setCountsData(responseOfCountsData.data);

                setChartData({
                    labels: responseOfCountsData.data.years,
                    datasets: [
                        {
                            label: 'Proje Sayısı',
                            data: responseOfCountsData.data.counts,
                            borderColor: 'rgba(0, 0, 0, 1)',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            borderWidth: 2,
                            tension: 0.2,
                            pointRadius: 3,
                        },
                    ],
                });
            } catch (error) {
                console.error('Veri alınırken hata oluştu:', error);
            }
        }
    };

    const buttons = [
        { label: 'Yapay Zeka', query: 'ai' },
        { label: 'Gömülü Sistemler', query: 'EmbeddedSystems' },
        { label: 'İnternet Ağları', query: 'Network' },
        { label: 'Robotik', query: 'Robotics' },
        { label: 'Güvenlik', query: 'Security' },
    ];

    return (
        // Arayüz elemanları
        <div className="container-wrapper my-5">
            <div className="left-container rounded border p-4">
                <h2 className="text-white text-center mb-4">PROJECT FIELDS</h2>
                {buttons.map((button) => (
                    <button
                        key={button.query}
                        type="button"
                        className={`buttons btn btn-light ${selectedQuery === button.query ? 'active' : ''}`}
                        style={{ marginBottom: "15px", width: "200px", marginLeft: "20px" }}
                        onClick={() => handleSelection(button.query, button.label)}
                        disabled={!!selectedQuery}
                    >
                        {button.label}
                    </button>
                ))}

                {/* Gemini API Analiz Sonucu */}
                {analysisData && (
                    <div className="alert alert-success mt-4 analysis-result">
                        <p>
                            {analysisData.includes('.') ? (
                                analysisData.indexOf('Bu proje') < analysisData.indexOf('.') && analysisData.includes('Bu proje') ? (
                                    <>
                                        <strong>{analysisData.split('Bu proje')[0]}</strong>
                                        <br /><br />
                                        {"Bu proje" + analysisData.split('Bu proje')[1]}
                                    </>
                                ) : (
                                    <>
                                        <strong>{analysisData.split('.')[0]}</strong>
                                        <br /><br />
                                        {analysisData.substring(analysisData.indexOf('.') + 1).trim()}
                                    </>
                                )
                            ) : (
                                analysisData.includes('Bu proje') ? (
                                    <>
                                        <strong>{analysisData.split('Bu proje')[0]}</strong>
                                        <br /><br />
                                        {"Bu proje" + analysisData.split('Bu proje')[1]}
                                    </>
                                ) : (
                                    <>
                                        <strong>{analysisData}</strong>
                                    </>
                                )
                            )}
                        </p>
                    </div>
                )}
            </div>
            
            {/* grafik */}
            {chartData && (
                <div className="right-container bg-info-subtle border rounded shadow p-3 mb-4">
                    <h2 className='graph_h2'>Github verilerine göre:</h2>
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: `${selectedLabel} Alanında Yıllara Göre Proje Sayısı` },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default App;