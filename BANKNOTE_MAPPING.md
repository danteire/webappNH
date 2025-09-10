# Mapowanie nazw banknotów na czytelne nazwy

## Problem
System używał technicznych oznaczeń banknotów (np. `PLN50`, `USD100`, `NONOTE0`), które nie były czytelne dla użytkowników.

## Rozwiązanie
Stworzono system mapowania, który zamienia techniczne oznaczenia na czytelne nazwy.

## Mapowanie nazw

### PLN (Polski Złoty)
- `PLN10` → `10 PLN`
- `PLN20` → `20 PLN`
- `PLN50` → `50 PLN`
- `PLN100` → `100 PLN`
- `PLN200` → `200 PLN`
- `PLN500` → `500 PLN`

### EUR (Euro)
- `EUR5` → `5 EUR`
- `EUR10` → `10 EUR`
- `EUR20` → `20 EUR`
- `EUR50` → `50 EUR`
- `EUR100` → `100 EUR`
- `EUR200` → `200 EUR`
- `EUR500` → `500 EUR`

### USD (Dolar Amerykański)
- `USD1` → `1 USD`
- `USD2` → `2 USD`
- `USD5` → `5 USD`
- `USD10` → `10 USD`
- `USD20` → `20 USD`
- `USD50` → `50 USD`
- `USD100` → `100 USD`

### TRY (Lira Turecka)
- `TRY5` → `5 TRY`
- `TRY10` → `10 TRY`
- `TRY20` → `20 TRY`
- `TRY50` → `50 TRY`
- `TRY100` → `100 TRY`
- `TRY200` → `200 TRY`

### Nie rozpoznano
- `NONOTE0` → `Nie rozpoznano`

## Implementacja

### Plik `banknoteMapper.js`
- `mapBanknoteName(code)` - mapuje pojedynczy kod
- `mapResultsNames(results)` - mapuje cały obiekt wyników

### Zastosowanie
- **ResultPage** - wykresy słupkowe z czytelnymi nazwami
- **Historia** - szczegóły i podglądy z czytelnymi nazwami
- **Upload** - wyniki uploadu z czytelnymi nazwami

## Testowanie

### 1. Strona wyników (`/results`)
- Sprawdź czy wykresy pokazują `50 PLN` zamiast `PLN50`
- Sprawdź czy `NONOTE0` pokazuje się jako `Nie rozpoznano`

### 2. Historia (`/user`)
- Sprawdź szczegóły wpisów w historii
- Sprawdź podglądy przy najechaniu myszką

### 3. Upload
- Wgraj obraz i sprawdź wyniki
- Sprawdź czy wszystkie nazwy są czytelne

## Przykłady

### Przed mapowaniem:
```
KNN: PLN50 (85.2%)
RF: PLN50 (82.1%)
SVM: PLN50 (79.8%)
```

### Po mapowaniu:
```
KNN: 50 PLN (85.2%)
RF: 50 PLN (82.1%)
SVM: 50 PLN (79.8%)
```

## Pliki zmienione
- `Frontend/src/utils/banknoteMapper.js` - nowy plik z mapowaniem
- `Frontend/src/User/Result/ResultPage.js` - używa mapowania
- `Frontend/src/User/Menu/History/HistoryUtils.js` - mapuje historię
- `Frontend/src/User/Menu/uploadutils.js` - mapuje wyniki uploadu

