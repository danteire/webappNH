// Mapowanie oznaczeń banknotów na czytelne nazwy

const BANKNOTE_MAPPING = {
  // PLN (Polski Złoty)
  'PLN10': '10 PLN',
  'PLN20': '20 PLN', 
  'PLN50': '50 PLN',
  'PLN100': '100 PLN',
  'PLN200': '200 PLN',
  'PLN500': '500 PLN',
  
  // EUR (Euro)
  'EUR5': '5 EUR',
  'EUR10': '10 EUR',
  'EUR20': '20 EUR',
  'EUR50': '50 EUR',
  'EUR100': '100 EUR',
  'EUR200': '200 EUR',
  'EUR500': '500 EUR',
  
  // USD (Dolar Amerykański)
  'USD1': '1 USD',
  'USD2': '2 USD',
  'USD5': '5 USD',
  'USD10': '10 USD',
  'USD20': '20 USD',
  'USD50': '50 USD',
  'USD100': '100 USD',
  
  // TRY (Lira Turecka)
  'TRY5': '5 TRY',
  'TRY10': '10 TRY',
  'TRY20': '20 TRY',
  'TRY50': '50 TRY',
  'TRY100': '100 TRY',
  'TRY200': '200 TRY',
  
  // Nie rozpoznano
  'NONOTE0': 'Nie rozpoznano'
};

/**
 * Mapuje oznaczenie banknotu na czytelną nazwę
 * @param {string} banknoteCode - Kod banknotu (np. 'PLN50', 'USD100')
 * @returns {string} - Czytelna nazwa (np. '50 PLN', '100 USD')
 */
export const mapBanknoteName = (banknoteCode) => {
  if (!banknoteCode) return 'Nie rozpoznano';
  
  return BANKNOTE_MAPPING[banknoteCode] || banknoteCode;
};

/**
 * Mapuje wszystkie nazwy w obiekcie wyników
 * @param {Object} results - Obiekt z wynikami klasyfikacji
 * @returns {Object} - Obiekt z zmapowanymi nazwami
 */
export const mapResultsNames = (results) => {
  if (!results) return results;
  
  const mappedResults = { ...results };
  
  // Mapuj predykcje
  Object.keys(mappedResults).forEach(modelName => {
    if (mappedResults[modelName] && mappedResults[modelName].pred) {
      mappedResults[modelName].pred = mapBanknoteName(mappedResults[modelName].pred);
    }
    
    // Mapuj nazwy w prawdopodobieństwach
    if (mappedResults[modelName] && mappedResults[modelName].proba) {
      const mappedProba = {};
      Object.keys(mappedResults[modelName].proba).forEach(key => {
        const mappedKey = mapBanknoteName(key);
        mappedProba[mappedKey] = mappedResults[modelName].proba[key];
      });
      mappedResults[modelName].proba = mappedProba;
    }
  });
  
  return mappedResults;
};

export default mapBanknoteName;

