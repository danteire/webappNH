// uploadUtils.js - Funkcje do obsługi uploadu i przetwarzania obrazów
import { checkStorageQuota, cleanOldEntries } from './History/HistoryUtils';

// Funkcja zapisywania szczegółów gościa
export const saveGuestDetails = async (processId, guestDetails) => {
  // Sprawdź dostępne miejsce przed zapisem
  const storageInfo = checkStorageQuota();
  console.log(`Storage used: ${storageInfo.used}KB, remaining: ${storageInfo.remaining}KB`);
  
  if (storageInfo.remaining < 500) { // Jeśli pozostało mniej niż 500KB
    const cleaned = cleanOldEntries(15); // Ogranicz do 15 najnowszych
    console.log(`Wyczyszczono ${cleaned} starych wpisów`);
  }

  try {
    const detailsStore = JSON.parse(localStorage.getItem('guestHistoryDetails')) || {};
    detailsStore[processId] = guestDetails;
    localStorage.setItem('guestHistoryDetails', JSON.stringify(detailsStore));
    return { success: true };
  } catch (storageError) {
    console.warn('Błąd zapisywania do localStorage:', storageError);
    
    // W przypadku przekroczenia limitu, usuń więcej starych wpisów
    cleanOldEntries(10);
    
    try {
      const detailsStore = JSON.parse(localStorage.getItem('guestHistoryDetails')) || {};
      // Zapisz tylko z małą miniaturą
      const reducedDetails = {
        ...guestDetails,
        imageBase64: guestDetails.thumbnailBase64, // Użyj tylko małej miniatury
      };
      detailsStore[processId] = reducedDetails;
      localStorage.setItem('guestHistoryDetails', JSON.stringify(detailsStore));
      
      return { 
        success: true, 
        warning: 'Obraz został zapisany w niższej jakości z powodu ograniczeń pamięci.' 
      };
    } catch (finalError) {
      console.error('Nie udało się zapisać nawet miniatury:', finalError);
      return { 
        success: false, 
        error: 'Nie udało się zapisać obrazu lokalnie. Historia może być niekompletna.' 
      };
    }
  }
};

// Funkcja dodawania wpisu do historii
const addToHistory = async (processId, userId, currentHistory) => {
  if (userId) {
    try {
      await fetch(`/api/history/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processId }),
      });
      return { success: true };
    } catch (err) {
      console.error('Błąd zapisu historii:', err);
      return { success: false, error: err.message };
    }
  } else {
    try {
      const updated = [...currentHistory, processId];
      localStorage.setItem('guestHistory', JSON.stringify(updated));
      return { success: true, newHistory: updated };
    } catch (err) {
      console.error('Błąd zapisu do localStorage:', err);
      return { success: false, error: err.message };
    }
  }
};
export const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Brak pliku do kompresji'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      try {
        // Oblicz nowe wymiary zachowując proporcje
        let { width, height } = img;
        
        const aspectRatio = width / height;
        
        if (width > height) {
          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }
        } else {
          if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Rysuj skompresowany obraz z anti-aliasing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        // Konwertuj do base64 z kompresją
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64.split(',')[1]);
      } catch (err) {
        reject(new Error(`Błąd kompresji obrazu: ${err.message}`));
      }
    };
    
    img.onerror = () => {
      reject(new Error('Nie udało się załadować obrazu do kompresji'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Funkcja walidacji pliku
export const validateFile = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('Proszę wybrać plik.');
    return { isValid: false, errors };
  }
  
  // Sprawdź typ pliku
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    errors.push('Dozwolone są tylko pliki JPG, PNG i WebP.');
  }
  
  // Sprawdź rozmiar pliku (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    errors.push('Plik jest za duży. Maksymalny rozmiar to 10MB.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    fileInfo: {
      name: file.name,
      size: Math.round(file.size / 1024), // KB
      type: file.type
    }
  };
};

// Funkcja przygotowania danych do wysłania
export const prepareUploadData = async (file, userId = null) => {
  try {
    // Walidacja pliku
    const validation = validateFile(file);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    // Kompresuj obraz do wysłania na serwer
    const compressedBase64 = await compressImage(file, 800, 600, 0.8);
    
    // Przygotuj payload
    const payload = {
      image: compressedBase64,
      metadata: {
        originalName: file.name,
        originalSize: file.size,
        timestamp: Date.now()
      }
    };

    // Dla gości, przygotuj również miniaturę
    let thumbnailBase64 = null;
    if (!userId) {
      thumbnailBase64 = await compressImage(file, 200, 150, 0.5);
    }

    return {
      success: true,
      payload: JSON.stringify(payload),
      compressedBase64,
      thumbnailBase64,
      fileInfo: validation.fileInfo
    };
    
  } catch (err) {
    return {
      success: false,
      errors: [`Błąd przygotowania danych: ${err.message}`]
    };
  }
};

// Funkcja wysyłania na serwer
export const uploadToServer = async (payload, serverUrl = 'http://127.0.0.1:8000/api/upload') => {
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: payload,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd serwera (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    // Walidacja odpowiedzi serwera
    if (!data) {
      throw new Error('Serwer zwrócił pustą odpowiedź');
    }

    return {
      success: true,
      data,
      processId: data.processId || Date.now()
    };
    
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
};

// Główna funkcja obsługi uploadu
export const handleImageUpload = async (file, userId, currentHistory, navigate) => {
  try {
    // 1. Przygotuj dane
    const prepResult = await prepareUploadData(file, userId);
    if (!prepResult.success) {
      return {
        success: false,
        errors: prepResult.errors
      };
    }

    // 2. Wyślij na serwer
    const uploadResult = await uploadToServer(prepResult.payload);
    if (!uploadResult.success) {
      return {
        success: false,
        errors: [uploadResult.error]
      };
    }

    // 3. Zapisz w historii
    const historyResult = await addToHistory(uploadResult.processId, userId, currentHistory);
    if (!historyResult.success) {
      console.warn('Nie udało się zapisać w historii:', historyResult.error);
    }

    // 4. Dla gości - zapisz szczegóły lokalnie
    let storageWarning = null;
    if (!userId) {
      const guestDetails = {
        id: uploadResult.processId,
        predictedBanknote: uploadResult.data.result?.banknote || 'Nie rozpoznano',
        imageBase64: prepResult.compressedBase64,
        thumbnailBase64: prepResult.thumbnailBase64,
        date: new Date().toISOString(),
      };

      const saveResult = await saveGuestDetails(uploadResult.processId, guestDetails);
      if (!saveResult.success) {
        console.warn('Nie udało się zapisać szczegółów:', saveResult.error);
      }
      if (saveResult.warning) {
        storageWarning = saveResult.warning;
      }
    }

    // 5. Przejdź do wyników
    navigate('/results', { 
      state: { 
        serverResponses: uploadResult.data, 
        originalImageBase64: prepResult.compressedBase64 
      } 
    });

    return {
      success: true,
      processId: uploadResult.processId,
      newHistory: historyResult.newHistory || currentHistory,
      warning: storageWarning
    };

  } catch (err) {
    return {
      success: false,
      errors: [`Nieoczekiwany błąd: ${err.message}`]
    };
  }
};

// Funkcja walidacji URL serwera
export const validateServerUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Funkcja sprawdzania połączenia z serwerem
export const checkServerConnection = async (serverUrl = 'http://127.0.0.1:8000/api/health') => {
  try {
    const response = await fetch(serverUrl, {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch {
    return false;
  }
};