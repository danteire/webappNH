// historyUtils.js - Funkcje do zarządzania historią

// Funkcja sprawdzania rozmiaru localStorage
export const checkStorageQuota = () => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return {
    used: Math.round(total / 1024), // KB
    remaining: Math.round((5120 - total) / 1024) // KB, zakładając limit 5MB
  };
};

// Funkcja czyszczenia starych wpisów
export const cleanOldEntries = (maxEntries = 20) => {
  try {
    const history = JSON.parse(localStorage.getItem('guestHistory')) || [];
    const details = JSON.parse(localStorage.getItem('guestHistoryDetails')) || {};
    
    if (history.length > maxEntries) {
      // Usuń najstarsze wpisy
      const toRemove = history.slice(0, history.length - maxEntries);
      const newHistory = history.slice(-maxEntries);
      
      // Usuń szczegóły dla usuwanych wpisów
      toRemove.forEach(id => delete details[id]);
      
      localStorage.setItem('guestHistory', JSON.stringify(newHistory));
      localStorage.setItem('guestHistoryDetails', JSON.stringify(details));
      
      return toRemove.length;
    }
    return 0;
  } catch (err) {
    console.error('Błąd czyszczenia starych wpisów:', err);
    return 0;
  }
};

// Funkcja pobierania historii
export const loadHistory = async (userId) => {
  if (userId) {
    try {
      const response = await fetch(`/api/history/${userId}`);
      if (!response.ok) throw new Error('Błąd pobierania historii z serwera');
      const data = await response.json();
      return { success: true, history: data };
    } catch (err) {
      console.error('Błąd pobierania historii:', err);
      return { success: false, error: err.message, history: [] };
    }
  } else {
    try {
      const localHistory = JSON.parse(localStorage.getItem('guestHistory')) || [];
      return { success: true, history: localHistory };
    } catch (err) {
      console.error('Błąd odczytu localStorage:', err);
      return { success: false, error: err.message, history: [] };
    }
  }
};

// Funkcja usuwania wpisu z historii
export const removeFromHistory = async (itemId, index, userId, currentHistory) => {
  if (userId) {
    try {
      const response = await fetch(`/api/history/${userId}/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Błąd serwera podczas usuwania wpisu.');
      
      const updatedHistory = currentHistory.filter((_, i) => i !== index);
      return { success: true, newHistory: updatedHistory };
    } catch (err) {
      console.error('Nie udało się usunąć wpisu z historii:', err);
      return { success: false, error: 'Nie udało się usunąć wpisu. Spróbuj ponownie.' };
    }
  } else {
    try {
      const updatedHistory = currentHistory.filter((_, i) => i !== index);
      localStorage.setItem('guestHistory', JSON.stringify(updatedHistory));
      
      // Usuń szczegóły z localStorage
      const detailsStore = JSON.parse(localStorage.getItem('guestHistoryDetails')) || {};
      delete detailsStore[itemId];
      localStorage.setItem('guestHistoryDetails', JSON.stringify(detailsStore));
      
      return { success: true, newHistory: updatedHistory };
    } catch (err) {
      console.error('Błąd usuwania z localStorage:', err);
      return { success: false, error: 'Nie udało się usunąć wpisu lokalnie.' };
    }
  }
};

// Funkcja pobierania szczegółów wpisu
export const getItemDetails = async (itemId, userId) => {
  if (userId) {
    try {
      const response = await fetch(`/api/results/${itemId}`);
      if (!response.ok) throw new Error('Nie udało się pobrać szczegółów.');
      const data = await response.json();
      return { success: true, details: data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  } else {
    try {
      const detailsStore = JSON.parse(localStorage.getItem('guestHistoryDetails')) || {};
      const itemDetails = detailsStore[itemId];
      
      if (!itemDetails || !itemDetails.imageBase64) {
        throw new Error('Nie znaleziono prawidłowych szczegółów dla tego wpisu.');
      }
      
      return { success: true, details: itemDetails };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

// Funkcja pobierania podglądu dla tooltip
export const getItemPreview = async (itemId, userId) => {
  if (userId) {
    try {
      const response = await fetch(`/api/results/${itemId}/preview`);
      if (!response.ok) throw new Error('Nie udało się pobrać podglądu.');
      const data = await response.json();
      return { success: true, preview: data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  } else {
    try {
      const detailsStore = JSON.parse(localStorage.getItem('guestHistoryDetails')) || {};
      const itemDetails = detailsStore[itemId];
      
      if (itemDetails) {
        const imageForTooltip = itemDetails.thumbnailBase64 || itemDetails.imageBase64;
        const preview = {
          ...itemDetails,
          imageBase64: imageForTooltip,
          date: itemDetails.date ? new Date(itemDetails.date).toLocaleDateString('pl-PL') : 'Nieznana data'
        };
        return { success: true, preview };
      }
      
      return { success: false, error: 'Nie znaleziono danych' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

// Funkcja czyszczenia całej historii
export const clearAllHistory = () => {
  try {
    localStorage.removeItem('guestHistory');
    localStorage.removeItem('guestHistoryDetails');
    return { success: true };
  } catch (err) {
    console.error('Błąd czyszczenia historii:', err);
    return { success: false, error: err.message };
  }
};