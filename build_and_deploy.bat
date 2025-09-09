@echo off
echo Budowanie i przygotowanie do wdrożenia aplikacji NajsHajs...

echo.
echo 1. Instalowanie zależności...
call npm install

echo.
echo 2. Budowanie aplikacji...
call npm run build

echo.
echo 3. Kopiowanie plików konfiguracyjnych...
copy public\.htaccess build\.htaccess
copy public\_redirects build\_redirects
copy public\web.config build\web.config

echo.
echo ✅ Aplikacja została zbudowana!
echo 📁 Zawartość folderu 'build' jest gotowa do wdrożenia na serwer.
echo.
echo 📋 Pliki konfiguracyjne zostały skopiowane:
echo    - .htaccess (dla Apache)
echo    - _redirects (dla Netlify)
echo    - web.config (dla IIS)
echo.
echo 🚀 Skopiuj zawartość folderu 'build' na swój serwer.

pause

