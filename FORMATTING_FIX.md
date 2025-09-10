# Naprawa problemów z formatowaniem

## Problem
Plik `ResultPage.css` miał globalne style, które wpływały na całą aplikację, powodując problemy z formatowaniem innych stron.

## Rozwiązanie

### 1. Usunięto globalne style z ResultPage.css
- Usunięto `html, body, #root` z globalnych stylów
- Style są teraz ograniczone tylko do `.page-container`

### 2. Zaktualizowano GlobalStyles.js
- Dodano selektor `body:not(.result-page)` dla głównych stron
- ResultPage ma własne style bez wpływu na resztę aplikacji

### 3. Zaktualizowano ResultPage.js
- Dodano `useEffect` do dodawania/usuwania klasy `result-page` z body
- Klasa jest automatycznie usuwana przy opuszczaniu strony

### 4. Zaktualizowano App.js
- Usunięto inline style z głównego diva
- Dodano GlobalStyles do wszystkich stron

## Testowanie

### Sprawdź formatowanie na każdej stronie:

1. **Strona logowania** (`/`)
   - Powinna być wyśrodkowana
   - Tło ciemne (#121212)
   - Czcionka Inter

2. **Strona użytkownika** (`/user`)
   - Powinna być wyśrodkowana
   - Tło ciemne (#121212)
   - Czcionka Inter

3. **Strona wyników** (`/results`)
   - Pełna szerokość ekranu
   - Gradient tła
   - Czcionka Segoe UI/Roboto
   - Własne style bez wpływu na inne strony

### Kroki testowania:
1. Zaloguj się na `https://najshajs.mywire.org`
2. Przejdź na `/user` - sprawdź formatowanie
3. Wgraj obraz i przejdź na `/results` - sprawdź formatowanie
4. Wróć na `/user` - sprawdź czy formatowanie się nie zepsuło

## Pliki zmienione:
- `Frontend/src/User/Result/ResultPage.css`
- `Frontend/src/components/GlobalStyles.js`
- `Frontend/src/User/Result/ResultPage.js`
- `Frontend/src/App.js`

