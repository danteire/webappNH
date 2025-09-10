# Instrukcja wdrożenia frontendu

## Problem z routingiem
Po wdrożeniu na serwer, odświeżenie strony na trasie `/user` powoduje błąd 404 "Not Found". To dlatego, że serwer Apache nie wie o trasach React Router.

## Rozwiązanie

### 1. Pliki konfiguracyjne
Dodano pliki konfiguracyjne dla różnych serwerów:

- **`.htaccess`** - dla Apache
- **`_redirects`** - dla Netlify
- **`web.config`** - dla IIS

### 2. Konfiguracja package.json
Dodano `"homepage": "."` do `package.json` - to sprawia, że React używa względnych ścieżek.

### 3. Kroki wdrożenia

#### Dla Apache:
1. Zbuduj aplikację: `npm run build`
2. Skopiuj zawartość folderu `build/` na serwer
3. Upewnij się, że plik `.htaccess` jest w głównym katalogu
4. Włącz mod_rewrite w Apache

#### Dla Netlify:
1. Zbuduj aplikację: `npm run build`
2. Wdróż folder `build/` na Netlify
3. Plik `_redirects` automatycznie obsłuży routing

#### Dla IIS:
1. Zbuduj aplikację: `npm run build`
2. Skopiuj zawartość folderu `build/` na serwer IIS
3. Plik `web.config` automatycznie obsłuży routing

## Testowanie
Po wdrożeniu:
1. Przejdź na `https://najshajs.mywire.org`
2. Zaloguj się
3. Przejdź na `https://najshajs.mywire.org/user`
4. Odśwież stronę - powinna działać bez błędu 404

## Uwagi
- Upewnij się, że serwer obsługuje pliki konfiguracyjne
- Sprawdź uprawnienia do plików `.htaccess` na serwerze Apache
- Po zmianach w routingu zawsze przebuduj aplikację

