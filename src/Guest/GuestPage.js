import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiImage, FiArrowLeft } from 'react-icons/fi';
import { mapResultsNames } from '../utils/banknoteMapper';
import Button from '../components/Button';
import './GuestPage.css';

const GuestPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Sprawdź typ pliku
      if (!file.type.startsWith('image/')) {
        setError('Proszę wybrać plik obrazu');
        return;
      }

      // Sprawdź rozmiar pliku (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Plik jest za duży. Maksymalny rozmiar to 10MB');
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Utwórz podgląd
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect({ target: { files: [file] } });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Proszę wybrać plik');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('https://najshajs.mywire.org/api/guest/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Błąd podczas analizy obrazu');
      }

      const result = await response.json();
      
      // Mapuj nazwy banknotów (tak jak w głównej stronie)
      const mappedResult = mapResultsNames(result);
      
      // Przekieruj na stronę wyników z danymi (w formacie jak w głównej stronie)
      navigate('/guest-results', { 
        state: { 
          serverResponses: mappedResult,
          originalImageBase64: previewUrl?.split(',')[1] // Usuń prefix data:image
        } 
      });

    } catch (err) {
      console.error('Błąd uploadu:', err);
      setError(err.message || 'Wystąpił błąd podczas analizy obrazu');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="guest-page">
      <div className="guest-container">
        <div className="guest-header">
          <Button 
            variant="ghost" 
            size="medium" 
            onClick={handleBackToLogin}
            className="back-button"
          >
            <FiArrowLeft />
            Powrót do logowania
          </Button>
          <h1>Tryb Gościa</h1>
          <p>Prześlij zdjęcie banknotu, aby otrzymać analizę</p>
        </div>

        <div className="guest-content">
          <div className="upload-section">
            <div 
              className="upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              
              {previewUrl ? (
                <div className="preview-container">
                  <img src={previewUrl} alt="Podgląd" className="preview-image" />
                  <div className="preview-overlay">
                    <FiImage />
                    <span>Kliknij, aby zmienić zdjęcie</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <FiUpload />
                  <h3>Przeciągnij i upuść zdjęcie tutaj</h3>
                  <p>lub kliknij, aby wybrać plik</p>
                  <p className="upload-info">Obsługiwane formaty: JPG, PNG, WebP (max 10MB)</p>
                </div>
              )}
            </div>

            {selectedFile && (
              <div className="file-info">
                <p><strong>Wybrany plik:</strong> {selectedFile.name}</p>
                <p><strong>Rozmiar:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <Button 
              variant="primary" 
              size="large" 
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="upload-button"
            >
              {isUploading ? 'Analizuję...' : 'Analizuj banknot'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;

