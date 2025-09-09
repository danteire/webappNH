// Plik: src/ResultsPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css"; // Import stylów

// Funkcja, która wyświetla poziome wykresy słupkowe
const ModelDetailsList = ({ modelName, modelData }) => {
  const top5Data = Object.entries(modelData.proba || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="chart-card">
      <h4 className="chart-title">{modelName.toUpperCase()}</h4>
      <div className="bar-chart-container">
        {top5Data.map((item, index) => (
          <div key={index} className="bar-item">
            <div className="bar-label">{item.name}</div>
            <div className="bar-wrapper">
              <div 
                className={`bar-fill ${index === 0 ? 'bar-first' : index === 1 ? 'bar-second' : 'bar-other'}`}
                style={{ width: `${item.value * 100}%` }}
              ></div>
            </div>
            <div className="bar-value">{(item.value * 100).toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { serverResponses, originalImageBase64 } = location.state || {};

  if (!serverResponses || Object.keys(serverResponses).length === 0) {
    return (
      <div className="page-container">
        <header className="header">
          <h2 className="header-title">Błąd</h2>
          <button className="back-button" onClick={() => navigate("/user")}>
            Powrót
          </button>
        </header>
        <main className="content">
          <h2 style={{ color: "var(--text-secondary)" }}>Nie znaleziono danych wyników.</h2>
        </main>
      </div>
    );
  }

  const topPredictions = Object.values(serverResponses).map(
    (modelData) => modelData.pred
  );
  const predictionCounts = topPredictions.reduce((acc, pred) => {
    acc[pred] = (acc[pred] || 0) + 1;
    return acc;
  }, {});
  const consensusPrediction = Object.keys(predictionCounts).reduce((a, b) =>
    predictionCounts[a] > predictionCounts[b] ? a : b
  );
  const relevantProbabilities = Object.values(serverResponses)
    .filter((modelData) => modelData.pred === consensusPrediction)
    .map((modelData) => {
      const topProba = Object.entries(modelData.proba).sort(([, a], [, b]) => b - a)[0];
      return topProba[1];
    });
  const averageProba =
    relevantProbabilities.reduce((sum, proba) => sum + proba, 0) /
    relevantProbabilities.length;
  const isRecognized = averageProba >= 0.7;
  const finalPrediction = isRecognized ? consensusPrediction : "Nie rozpoznano";

  const progressBarWidth = {
    width: `${averageProba * 100}%`
  };

  return (
    <div className="page-container">
      <header className="header">
        <h2 className="header-title">Wynik Analizy</h2>
        <button className="back-button" onClick={() => navigate("/user")}>
          Powrót
        </button>
      </header>

      <main className="content">
        {originalImageBase64 && (
          <img
            className="image-preview"
            src={`data:image/jpeg;base64,${originalImageBase64}`}
            alt="Przesłane zdjęcie"
          />
        )}

        <div className={`main-result-card ${isRecognized ? "recognized" : "unrecognized"}`}>
          <h2 className="main-result-title">Wynik Końcowy</h2>
          <p className={`main-prediction ${!isRecognized ? "unrecognized" : ""}`}>
            {finalPrediction}
          </p>
          <div className="confidence-wrapper">
            <span style={{ color: "var(--text-secondary)" }}>Pewność:</span>
            <span className={`confidence-score ${!isRecognized ? "unrecognized" : ""}`}>
              {(averageProba * 100).toFixed(2)}%
            </span>
            <div className="progress-bar-container">
              <div
                className={`progress-bar ${!isRecognized ? "unrecognized" : ""}`}
                style={progressBarWidth}
              ></div>
            </div>
          </div>
        </div>

        <section className="details-section">
          <h3 className="details-title">Wyniki Poszczególnych Modeli</h3>
          <div className="details-grid">
            {Object.entries(serverResponses).map(([modelName, modelData]) => (
              <ModelDetailsList
                key={modelName}
                modelName={modelName}
                modelData={modelData}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}