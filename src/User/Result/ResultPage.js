// Plik: src/ResultsPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import banknoteService from "../../services/banknoteService";
import { mapBanknoteName } from "../../utils/banknoteMapper";
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
  const [banknotes, setBanknotes] = useState([]);
  const [matchingBanknote, setMatchingBanknote] = useState(null);

  // Funkcja do obliczania finalnej predykcji
  const getFinalPrediction = (responses) => {
    const predictionCounts = Object.values(responses).reduce((counts, modelData) => {
      counts[modelData.pred] = (counts[modelData.pred] || 0) + 1;
      return counts;
    }, {});
    const consensusPrediction = Object.keys(predictionCounts).reduce((a, b) =>
      predictionCounts[a] > predictionCounts[b] ? a : b
    );
    const relevantProbabilities = Object.values(responses)
      .filter((modelData) => modelData.pred === consensusPrediction)
      .map((modelData) => {
        const topProba = Object.entries(modelData.proba).sort(([, a], [, b]) => b - a)[0];
        return topProba[1];
      });
    const averageProba =
      relevantProbabilities.reduce((sum, proba) => sum + proba, 0) /
      relevantProbabilities.length;
    const isRecognized = averageProba >= 0.7;
    return isRecognized ? consensusPrediction : "Nie rozpoznano";
  };

  // Pobierz banknoty z bazy i sprawdź czy rozpoznany banknot ma odpowiednik
  useEffect(() => {
    const loadBanknotesAndCheckMatch = async () => {
      try {
        const banknotesData = await banknoteService.getBanknotes();
        setBanknotes(banknotesData);
        
        // Sprawdź czy rozpoznany banknot ma odpowiednik w bazie
        if (serverResponses && Object.keys(serverResponses).length > 0) {
          const finalPrediction = getFinalPrediction(serverResponses);
          const mappedPrediction = mapBanknoteName(finalPrediction);
          
          console.log('Debug dopasowania banknotu:');
          console.log('Final prediction:', finalPrediction);
          console.log('Mapped prediction:', mappedPrediction);
          console.log('Banknotes data:', banknotesData);
          
          // Znajdź banknot w bazie po nazwie
          const matching = banknotesData.find(banknote => {
            const matches = 
              banknote.denomination === mappedPrediction || 
              banknote.currency === mappedPrediction || 
              banknote.country === mappedPrediction ||
              `${banknote.country} ${banknote.currency}` === mappedPrediction;
            
            if (matches) {
              console.log('Znaleziono dopasowanie:', banknote);
            }
            
            return matches;
          });
          
          console.log('Matching banknote:', matching);
          setMatchingBanknote(matching);
        }
      } catch (error) {
        console.error('Błąd pobierania banknotów:', error);
      }
    };

    loadBanknotesAndCheckMatch();
  }, [serverResponses]);

  if (!serverResponses || Object.keys(serverResponses).length === 0) {
    return (
      <div className="page-container">
        <header className="header">
          <h2 className="header-title">Błąd</h2>
          <Button 
            variant="secondary" 
            size="medium" 
            onClick={() => navigate("/user")}
            className="back-button"
          >
            Powrót
          </Button>
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
        <Button 
          variant="secondary" 
          size="medium" 
          onClick={() => navigate("/user")}
          className="back-button"
        >
          Powrót
        </Button>
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

        {/* Przycisk "Więcej informacji o banknocie" */}
        {matchingBanknote && isRecognized && (
          <div className="banknote-info-section">
            <Button 
              variant="info" 
              size="medium" 
              onClick={() => navigate(`/user/banknote/${matchingBanknote.id}`)}
              className="banknote-info-button"
            >
              Więcej informacji o banknocie
            </Button>
          </div>
        )}

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