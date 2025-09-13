import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiGlobe } from 'react-icons/fi';
import banknoteService from '../../services/banknoteService';
import './BanknoteDetailPage.css';

const BanknoteDetailPage = () => {
  const { banknoteId } = useParams();
  const navigate = useNavigate();
  const [banknote, setBanknote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBanknote();
  }, [banknoteId]);

  const loadBanknote = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await banknoteService.getBanknote(banknoteId);
      setBanknote(data);
    } catch (err) {
      setError('Nie udało się załadować szczegółów banknotu');
      console.error('Error loading banknote:', err);
    } finally {
      setLoading(false);
    }
  };

  const banknoteData = {
    PLN10: {
      name: '10 PLN',
      fullName: 'Dziesięć złotych',
      description: 'Banknot dziesięciozłotowy z wizerunkiem księcia Mieszka I',
      year: '2014',
      country: 'Polska',
      currency: 'PLN',
      color: '#8B4513',
      features: [
        'Wizerunek księcia Mieszka I',
        'Elementy architektoniczne z epoki',
        'Wodny znak z orłem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '120 x 60 mm',
      material: 'Papier bawełniany'
    },
    PLN20: {
      name: '20 PLN',
      fullName: 'Dwadzieścia złotych',
      description: 'Banknot dwudziestozłotowy z wizerunkiem króla Bolesława I Chrobrego',
      year: '2014',
      country: 'Polska',
      currency: 'PLN',
      color: '#228B22',
      features: [
        'Wizerunek króla Bolesława I Chrobrego',
        'Elementy architektoniczne romańskie',
        'Wodny znak z orłem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '126 x 63 mm',
      material: 'Papier bawełniany'
    },
    PLN50: {
      name: '50 PLN',
      fullName: 'Pięćdziesiąt złotych',
      description: 'Banknot pięćdziesięciozłotowy z wizerunkiem króla Kazimierza III Wielkiego',
      year: '2014',
      country: 'Polska',
      currency: 'PLN',
      color: '#4169E1',
      features: [
        'Wizerunek króla Kazimierza III Wielkiego',
        'Elementy architektoniczne gotyckie',
        'Wodny znak z orłem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '132 x 66 mm',
      material: 'Papier bawełniany'
    },
    PLN100: {
      name: '100 PLN',
      fullName: 'Sto złotych',
      description: 'Banknot stuzłotowy z wizerunkiem króla Władysława II Jagiełły',
      year: '2014',
      country: 'Polska',
      currency: 'PLN',
      color: '#8B008B',
      features: [
        'Wizerunek króla Władysława II Jagiełły',
        'Elementy architektoniczne gotyckie',
        'Wodny znak z orłem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '138 x 69 mm',
      material: 'Papier bawełniany'
    },
    PLN200: {
      name: '200 PLN',
      fullName: 'Dwieście złotych',
      description: 'Banknot dwustuzłotowy z wizerunkiem króla Zygmunta I Starego',
      year: '2014',
      country: 'Polska',
      currency: 'PLN',
      color: '#FF8C00',
      features: [
        'Wizerunek króla Zygmunta I Starego',
        'Elementy architektoniczne renesansowe',
        'Wodny znak z orłem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '144 x 72 mm',
      material: 'Papier bawełniany'
    },
    PLN500: {
      name: '500 PLN',
      fullName: 'Pięćset złotych',
      description: 'Banknot pięćsetzłotowy z wizerunkiem króla Jana III Sobieskiego',
      year: '2014',
      country: 'Polska',
      currency: 'PLN',
      color: '#DC143C',
      features: [
        'Wizerunek króla Jana III Sobieskiego',
        'Elementy architektoniczne barokowe',
        'Wodny znak z orłem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '150 x 75 mm',
      material: 'Papier bawełniany'
    },
    EUR5: {
      name: '5 EUR',
      fullName: 'Pięć euro',
      description: 'Banknot pięcioeurowy z elementami architektonicznymi klasycznymi',
      year: '2013',
      country: 'Unia Europejska',
      currency: 'EUR',
      color: '#C0C0C0',
      features: [
        'Elementy architektoniczne klasyczne',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram',
        'Mikrodruk'
      ],
      dimensions: '120 x 62 mm',
      material: 'Papier bawełniany'
    },
    EUR10: {
      name: '10 EUR',
      fullName: 'Dziesięć euro',
      description: 'Banknot dziesięcioeurowy z elementami architektonicznymi romańskimi',
      year: '2014',
      country: 'Unia Europejska',
      currency: 'EUR',
      color: '#FFD700',
      features: [
        'Elementy architektoniczne romańskie',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram',
        'Mikrodruk'
      ],
      dimensions: '127 x 67 mm',
      material: 'Papier bawełniany'
    },
    EUR20: {
      name: '20 EUR',
      fullName: 'Dwadzieścia euro',
      description: 'Banknot dwudziestoeurowy z elementami architektonicznymi gotyckimi',
      year: '2015',
      country: 'Unia Europejska',
      currency: 'EUR',
      color: '#87CEEB',
      features: [
        'Elementy architektoniczne gotyckie',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram',
        'Mikrodruk'
      ],
      dimensions: '133 x 72 mm',
      material: 'Papier bawełniany'
    },
    EUR50: {
      name: '50 EUR',
      fullName: 'Pięćdziesiąt euro',
      description: 'Banknot pięćdziesięcioeurowy z elementami architektonicznymi renesansowymi',
      year: '2017',
      country: 'Unia Europejska',
      currency: 'EUR',
      color: '#FFA500',
      features: [
        'Elementy architektoniczne renesansowe',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram',
        'Mikrodruk'
      ],
      dimensions: '140 x 77 mm',
      material: 'Papier bawełniany'
    },
    EUR100: {
      name: '100 EUR',
      fullName: 'Sto euro',
      description: 'Banknot stueurowy z elementami architektonicznymi barokowymi',
      year: '2019',
      country: 'Unia Europejska',
      currency: 'EUR',
      color: '#32CD32',
      features: [
        'Elementy architektoniczne barokowe',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram',
        'Mikrodruk'
      ],
      dimensions: '147 x 82 mm',
      material: 'Papier bawełniany'
    },
    EUR200: {
      name: '200 EUR',
      fullName: 'Dwieście euro',
      description: 'Banknot dwustueurowy z elementami architektonicznymi secesyjnymi',
      year: '2019',
      country: 'Unia Europejska',
      currency: 'EUR',
      color: '#9370DB',
      features: [
        'Elementy architektoniczne secesyjne',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram',
        'Mikrodruk'
      ],
      dimensions: '153 x 82 mm',
      material: 'Papier bawełniany'
    },
    EUR500: {
      name: '500 EUR',
      fullName: 'Pięćset euro',
      description: 'Banknot pięćseteurowy z elementami architektonicznymi modernistycznymi',
      year: '2019',
      country: 'Unia Europejska',
      currency: 'EUR',
      color: '#2196F3',
      features: [
        'Elementy architektoniczne modernistyczne',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Hologram',
        'Mikrodruk'
      ],
      dimensions: '160 x 82 mm',
      material: 'Papier bawełniany'
    },
    // USD - Dolar amerykański
    USD1: {
      name: '1 USD',
      fullName: 'Jeden dolar',
      description: 'Banknot jednodolarowy z wizerunkiem George\'a Washingtona',
      year: '2017',
      country: 'Stany Zjednoczone',
      currency: 'USD',
      color: '#FF9800',
      features: [
        'Wizerunek George\'a Washingtona',
        'Wielka pieczęć Stanów Zjednoczonych',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '156 x 66 mm',
      material: 'Papier bawełniany'
    },
    USD5: {
      name: '5 USD',
      fullName: 'Pięć dolarów',
      description: 'Banknot pięciodolarowy z wizerunkiem Abrahama Lincolna',
      year: '2017',
      country: 'Stany Zjednoczone',
      currency: 'USD',
      color: '#FF9800',
      features: [
        'Wizerunek Abrahama Lincolna',
        'Pomnik Lincolna',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '156 x 66 mm',
      material: 'Papier bawełniany'
    },
    USD10: {
      name: '10 USD',
      fullName: 'Dziesięć dolarów',
      description: 'Banknot dziesięciodolarowy z wizerunkiem Alexandra Hamiltona',
      year: '2017',
      country: 'Stany Zjednoczone',
      currency: 'USD',
      color: '#FF9800',
      features: [
        'Wizerunek Alexandra Hamiltona',
        'Budynek Departamentu Skarbu',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '156 x 66 mm',
      material: 'Papier bawełniany'
    },
    USD20: {
      name: '20 USD',
      fullName: 'Dwadzieścia dolarów',
      description: 'Banknot dwudziestodolarowy z wizerunkiem Andrew Jacksona',
      year: '2017',
      country: 'Stany Zjednoczone',
      currency: 'USD',
      color: '#FF9800',
      features: [
        'Wizerunek Andrew Jacksona',
        'Biały Dom',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '156 x 66 mm',
      material: 'Papier bawełniany'
    },
    USD50: {
      name: '50 USD',
      fullName: 'Pięćdziesiąt dolarów',
      description: 'Banknot pięćdziesięciodolarowy z wizerunkiem Ulyssesa S. Granta',
      year: '2017',
      country: 'Stany Zjednoczone',
      currency: 'USD',
      color: '#FF9800',
      features: [
        'Wizerunek Ulyssesa S. Granta',
        'Kapitol Stanów Zjednoczonych',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '156 x 66 mm',
      material: 'Papier bawełniany'
    },
    USD100: {
      name: '100 USD',
      fullName: 'Sto dolarów',
      description: 'Banknot stodolarowy z wizerunkiem Benjamina Franklina',
      year: '2017',
      country: 'Stany Zjednoczone',
      currency: 'USD',
      color: '#FF9800',
      features: [
        'Wizerunek Benjamina Franklina',
        'Independence Hall',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '156 x 66 mm',
      material: 'Papier bawełniany'
    },
    // TRY - Lira turecka
    TRY5: {
      name: '5 TRY',
      fullName: 'Pięć lir tureckich',
      description: 'Banknot pięciolir tureckich z wizerunkiem Mustafy Kemala Atatürka',
      year: '2019',
      country: 'Turcja',
      currency: 'TRY',
      color: '#9C27B0',
      features: [
        'Wizerunek Mustafy Kemala Atatürka',
        'Elementy architektoniczne tureckie',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '130 x 64 mm',
      material: 'Papier bawełniany'
    },
    TRY10: {
      name: '10 TRY',
      fullName: 'Dziesięć lir tureckich',
      description: 'Banknot dziesięciolir tureckich z wizerunkiem Mustafy Kemala Atatürka',
      year: '2019',
      country: 'Turcja',
      currency: 'TRY',
      color: '#9C27B0',
      features: [
        'Wizerunek Mustafy Kemala Atatürka',
        'Elementy architektoniczne tureckie',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '136 x 64 mm',
      material: 'Papier bawełniany'
    },
    TRY20: {
      name: '20 TRY',
      fullName: 'Dwadzieścia lir tureckich',
      description: 'Banknot dwudziestolir tureckich z wizerunkiem Mustafy Kemala Atatürka',
      year: '2019',
      country: 'Turcja',
      currency: 'TRY',
      color: '#9C27B0',
      features: [
        'Wizerunek Mustafy Kemala Atatürka',
        'Elementy architektoniczne tureckie',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '142 x 68 mm',
      material: 'Papier bawełniany'
    },
    TRY50: {
      name: '50 TRY',
      fullName: 'Pięćdziesiąt lir tureckich',
      description: 'Banknot pięćdziesięciolir tureckich z wizerunkiem Mustafy Kemala Atatürka',
      year: '2019',
      country: 'Turcja',
      currency: 'TRY',
      color: '#9C27B0',
      features: [
        'Wizerunek Mustafy Kemala Atatürka',
        'Elementy architektoniczne tureckie',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '148 x 68 mm',
      material: 'Papier bawełniany'
    },
    TRY100: {
      name: '100 TRY',
      fullName: 'Sto lir tureckich',
      description: 'Banknot stulir tureckich z wizerunkiem Mustafy Kemala Atatürka',
      year: '2019',
      country: 'Turcja',
      currency: 'TRY',
      color: '#9C27B0',
      features: [
        'Wizerunek Mustafy Kemala Atatürka',
        'Elementy architektoniczne tureckie',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '154 x 72 mm',
      material: 'Papier bawełniany'
    },
    TRY200: {
      name: '200 TRY',
      fullName: 'Dwieście lir tureckich',
      description: 'Banknot dwustulir tureckich z wizerunkiem Mustafy Kemala Atatürka',
      year: '2019',
      country: 'Turcja',
      currency: 'TRY',
      color: '#9C27B0',
      features: [
        'Wizerunek Mustafy Kemala Atatürka',
        'Elementy architektoniczne tureckie',
        'Wodny znak z portretem',
        'Nitka zabezpieczająca',
        'Znak UV'
      ],
      security: [
        'Wodny znak',
        'Nitka zabezpieczająca',
        'Znak UV',
        'Mikrodruk',
        'Relief'
      ],
      dimensions: '160 x 72 mm',
      material: 'Papier bawełniany'
    }
  };


  const handleBack = () => {
    navigate('/user/banknotes');
  };

  if (loading) {
    return (
      <div className="banknote-detail-page">
        <header className="banknote-detail-header">
          <button className="back-button" onClick={handleBack}>
            <FiArrowLeft />
            Powrót
          </button>
          <h1 className="page-title">Ładowanie...</h1>
        </header>
        <div className="loading-message">Ładowanie szczegółów banknotu...</div>
      </div>
    );
  }

  if (error || !banknote) {
    return (
      <div className="banknote-detail-page">
        <header className="banknote-detail-header">
          <button className="back-button" onClick={handleBack}>
            <FiArrowLeft />
            Powrót
          </button>
          <h1 className="page-title">Błąd</h1>
        </header>
        <div className="error-message">
          <p>{error || 'Nie udało się załadować banknotu'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="banknote-detail-page">
      <header className="banknote-detail-header">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft />
          Powrót
        </button>
        <h1 className="page-title">{banknote.denomination}</h1>
      </header>

      <main className="banknote-detail-content">
        <div className="banknote-detail-container">
          <div className="banknote-image-section">
            <div className="banknote-images-container">
              <div className="banknote-image-wrapper">
                <h4 className="image-label">Awers</h4>
                <img
                  src={banknoteService.getImageUrl(banknote.image_avers)}
                  alt={`${banknote.denomination} - Awers`}
                  className="banknote-image"
                  onError={(e) => {
                    console.error('Error loading avers image:', e.target.src);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                  onLoad={() => {
                    console.log('Avers image loaded successfully:', banknoteService.getImageUrl(banknote.image_avers));
                  }}
                />
                <div 
                  className="banknote-image-placeholder"
                  style={{ display: 'none' }}
                >
                  {banknote.denomination}
                </div>
                <p className="image-placeholder-text">Zdjęcie awersu</p>
              </div>
              <div className="banknote-image-wrapper">
                <h4 className="image-label">Rewers</h4>
                <img
                  src={banknoteService.getImageUrl(banknote.image_rewers)}
                  alt={`${banknote.denomination} - Rewers`}
                  className="banknote-image"
                  onError={(e) => {
                    console.error('Error loading rewers image:', e.target.src);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                  onLoad={() => {
                    console.log('Rewers image loaded successfully:', banknoteService.getImageUrl(banknote.image_rewers));
                  }}
                />
                <div 
                  className="banknote-image-placeholder"
                  style={{ display: 'none' }}
                >
                  {banknote.denomination}
                </div>
                <p className="image-placeholder-text">Zdjęcie rewersu</p>
              </div>
            </div>
          </div>

          <div className="banknote-info-section">
            <div className="banknote-basic-info">
              <h2 className="banknote-full-name">{banknote.denomination}</h2>
              <p className="banknote-description">
                {banknote.description || 'Brak opisu'}
              </p>
              
              <div className="banknote-meta">
                <div className="meta-item">
                  <FiGlobe className="meta-icon" />
                  <span>Kraj: {banknote.country}</span>
                </div>
                <div className="meta-item">
                  <span>Waluta: {banknote.currency}</span>
                </div>
                {banknote.effigy && (
                  <div className="meta-item">
                    <span>Wizerunek: {banknote.effigy}</span>
                  </div>
                )}
                {banknote.dimensions && (
                  <div className="meta-item">
                    <span>Wymiary: {banknote.dimensions}</span>
                  </div>
                )}
                <div className="meta-item">
                  <FiCalendar className="meta-icon" />
                  <span>Data dodania: {new Date(banknote.created_at).toLocaleDateString('pl-PL')}</span>
                </div>
              </div>
            </div>

            <div className="banknote-images-info">
              <h3 className="section-title">Zdjęcia banknotu</h3>
              <p className="images-description">
                Poniżej znajdują się zdjęcia awersu i rewersu banknotu {banknote.denomination}.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BanknoteDetailPage;
