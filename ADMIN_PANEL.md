# Panel Administratora - NajsHajs

## Przegląd
Panel administratora to zaawansowany interfejs do zarządzania systemem NajsHajs, dostępny tylko dla użytkowników z uprawnieniami administratora.

## Dostęp
- **URL:** `/admin`
- **Wymagania:** Użytkownik musi być zalogowany i mieć `admin = true` w bazie danych
- **Dane logowania:** `admin` / `admin123`

## Funkcjonalności

### 1. Dashboard ze statystykami
- **Liczba użytkowników** - całkowita liczba zarejestrowanych użytkowników
- **Wpisy w historii** - całkowita liczba sprawdzeń banknotów
- **Ostatnia aktywność** - liczba sprawdzeń z ostatnich 24 godzin

### 2. Zarządzanie użytkownikami
- **Lista użytkowników** z informacjami:
  - ID użytkownika
  - Nazwa użytkownika
  - Status administratora (Tak/Nie)
  - Data utworzenia konta
- **Akcje:**
  - Przełączanie statusu administratora
  - Usuwanie użytkowników (z potwierdzeniem)

### 3. Historia aktywności
- **Lista wszystkich sprawdzeń** banknotów w systemie
- **Informacje:**
  - ID wpisu
  - Użytkownik (ID)
  - Przewidywanie banknotu
  - Data i godzina sprawdzenia
- **Ograniczenie:** Ostatnie 100 wpisów

## Bezpieczeństwo

### Ochrona tras
- Wszystkie endpointy administratora wymagają JWT token
- Dodatkowa weryfikacja uprawnień `admin = true`
- Automatyczne przekierowanie na `/user` dla użytkowników bez uprawnień

### Ograniczenia
- Administrator nie może usunąć własnego konta
- Administrator nie może zmienić własnych uprawnień
- Wszystkie akcje wymagają potwierdzenia

## Endpointy API

### Statystyki
```
GET /api/admin/stats
Authorization: Bearer <JWT_TOKEN>
```
**Odpowiedź:**
```json
{
  "total_users": 5,
  "total_history": 150,
  "recent_activity": 12
}
```

### Użytkownicy
```
GET /api/admin/users
Authorization: Bearer <JWT_TOKEN>
```
**Odpowiedź:**
```json
[
  {
    "id": 1,
    "username": "admin",
    "admin": true,
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

### Historia
```
GET /api/admin/history
Authorization: Bearer <JWT_TOKEN>
```
**Odpowiedź:**
```json
[
  {
    "id": 1,
    "user_id": 2,
    "username": "test",
    "prediction": "50 PLN",
    "timestamp": "2024-01-15T10:30:00Z"
  }
]
```

### Usuwanie użytkownika
```
DELETE /api/admin/users/{user_id}
Authorization: Bearer <JWT_TOKEN>
```

### Przełączanie statusu administratora
```
PUT /api/admin/users/{user_id}/admin
Authorization: Bearer <JWT_TOKEN>
```

## Interfejs użytkownika

### Design
- **Ciemny motyw** zgodny z resztą aplikacji
- **Responsywny layout** z grid system
- **Interaktywne elementy** z hover effects
- **Ikony** z react-icons/fi

### Komponenty
- **AdminContainer** - główny kontener
- **AdminHeader** - nagłówek z nawigacją
- **StatsGrid** - karty ze statystykami
- **DataTable** - tabele z danymi
- **ActionButton** - przyciski akcji

### Nawigacja
- **Powrót do aplikacji** - przekierowanie na `/user`
- **Wyloguj się** - wylogowanie i przekierowanie na `/`

## Implementacja

### Frontend
- **Plik:** `Frontend/src/Admin/AdminPage.js`
- **Trasa:** Dodana do `App.js` jako `/admin`
- **Ochrona:** Komponent `AdminRoute` sprawdza uprawnienia

### Backend
- **Endpointy:** Dodane do `Backend/V2/mainserv.py`
- **Autoryzacja:** Funkcja `get_admin_user()` sprawdza uprawnienia
- **Baza danych:** Pole `admin` w tabeli `users`

### Baza danych
```sql
ALTER TABLE users ADD COLUMN admin BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
```

## Testowanie

### 1. Logowanie jako administrator
```
POST /api/token
Content-Type: application/x-www-form-urlencoded

username=admin&password=admin123
```

### 2. Dostęp do panelu
- Otwórz `/admin` w przeglądarce
- Sprawdź czy widzisz dashboard ze statystykami

### 3. Testowanie funkcji
- Przełącz status administratora użytkownika
- Usuń użytkownika (z potwierdzeniem)
- Sprawdź historię aktywności

## Rozwiązywanie problemów

### Błąd 403 Forbidden
- Sprawdź czy użytkownik ma `admin = true` w bazie danych
- Sprawdź czy JWT token jest ważny

### Błąd 404 Not Found
- Sprawdź czy endpointy administratora są dostępne
- Sprawdź czy serwer jest uruchomiony

### Brak danych w panelu
- Sprawdź połączenie z bazą danych
- Sprawdź czy są dane w tabelach `users` i `history`

