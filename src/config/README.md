# Konfiguracja API

## Przełączanie między środowiskami

W pliku `api.js` możesz łatwo przełączać między środowiskiem lokalnym a produkcyjnym:

```javascript
const API_CONFIG = {
  environment: 'production', // Zmień na 'local' dla środowiska lokalnego
  // ...
};
```

## Dostępne środowiska

### Lokalne (`local`)
- **URL:** `http://localhost:8000`
- **Użycie:** Podczas rozwoju lokalnego
- **Wymagania:** Lokalny serwer FastAPI uruchomiony na porcie 8000

### Produkcyjne (`production`)
- **URL:** `https://najshajs.mywire.org`
- **Użycie:** Wersja produkcyjna aplikacji
- **Wymagania:** Dostęp do internetu

## Jak zmienić środowisko

1. Otwórz plik `Frontend/src/config/api.js`
2. Zmień wartość `environment` na:
   - `'local'` - dla środowiska lokalnego
   - `'production'` - dla środowiska produkcyjnego
3. Zapisz plik
4. Zrestartuj aplikację React (`npm start`)

## Uwagi

- Zmiana środowiska wpływa na wszystkie żądania API w aplikacji
- Upewnij się, że odpowiedni serwer jest uruchomiony przed zmianą środowiska
- W środowisku produkcyjnym wymagane jest połączenie z internetem

