// Konfiguracja API - łatwe przełączanie między środowiskami

const API_CONFIG = {
  // Zmień na 'production' dla wersji produkcyjnej
  environment: 'production', // 'local' | 'production'
  
  urls: {
    local: 'http://localhost:8000',
    production: 'https://najshajs.mywire.org'
  }
};

export const getApiBaseUrl = () => {
  return API_CONFIG.urls[API_CONFIG.environment];
};

export const isProduction = () => {
  return API_CONFIG.environment === 'production';
};

export default API_CONFIG;

