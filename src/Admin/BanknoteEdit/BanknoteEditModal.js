import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiImage } from 'react-icons/fi';
import ImageUpload from './ImageUpload';
import './BanknoteEditModal.css';

const BanknoteEditModal = ({ banknote, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: banknote?.id || null,
    country: banknote?.country || '',
    currency: banknote?.currency || '',
    denomination: banknote?.denomination || '',
    effigy: banknote?.effigy || '',
    dimensions: banknote?.dimensions || '',
    description: banknote?.description || '',
    image_avers: banknote?.image_avers || '',
    image_rewers: banknote?.image_rewers || ''
  });

  // Aktualizuj formularz gdy zmienia się banknote
  useEffect(() => {
    if (banknote) {
      setFormData({
        id: banknote.id || null,
        country: banknote.country || '',
        currency: banknote.currency || '',
        denomination: banknote.denomination || '',
        effigy: banknote.effigy || '',
        dimensions: banknote.dimensions || '',
        description: banknote.description || '',
        image_avers: banknote.image_avers || '',
        image_rewers: banknote.image_rewers || ''
      });
    } else {
      // Resetuj formularz dla nowego banknotu
      setFormData({
        id: null,
        country: '',
        currency: '',
        denomination: '',
        effigy: '',
        dimensions: '',
        description: '',
        image_avers: '',
        image_rewers: ''
      });
    }
  }, [banknote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edytuj Banknot</h2>
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Kraj *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="np. Polska"
                required
              />
            </div>

            <div className="form-group">
              <label>Waluta *</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                required
              >
                <option value="">Wybierz walutę</option>
                <option value="PLN">PLN - Złoty polski</option>
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - Dolar amerykański</option>
                <option value="TRY">TRY - Lira turecka</option>
                <option value="GBP">GBP - Funt brytyjski</option>
                <option value="CHF">CHF - Frank szwajcarski</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nominał *</label>
              <input
                type="text"
                name="denomination"
                value={formData.denomination}
                onChange={handleInputChange}
                placeholder="np. 10 PLN"
                required
              />
            </div>

            <div className="form-group">
              <label>Wizerunek</label>
              <input
                type="text"
                name="effigy"
                value={formData.effigy}
                onChange={handleInputChange}
                placeholder="np. Mieszko I, Fryderyk Chopin"
              />
            </div>

            <div className="form-group">
              <label>Wymiary</label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                placeholder="np. 120 x 62 mm"
              />
            </div>

            <div className="form-group full-width">
              <label>Opis</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Opis banknotu..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <ImageUpload
                label="Zdjęcie awersu"
                value={formData.image_avers}
                onChange={(value) => setFormData(prev => ({ ...prev, image_avers: value }))}
                required={true}
              />
            </div>

            <div className="form-group">
              <ImageUpload
                label="Zdjęcie rewersu"
                value={formData.image_rewers}
                onChange={(value) => setFormData(prev => ({ ...prev, image_rewers: value }))}
                required={true}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Anuluj
          </button>
          <button className="save-button" onClick={handleSave}>
            <FiSave />
            Zapisz zmiany
          </button>
        </div>
      </div>
    </div>
  );
};

export default BanknoteEditModal;
