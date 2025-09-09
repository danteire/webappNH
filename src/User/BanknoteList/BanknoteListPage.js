import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiInfo } from 'react-icons/fi';
import banknoteService from '../../services/banknoteService';
import './BanknoteListPage.css';

const BanknoteListPage = () => {
  const navigate = useNavigate();
  const [banknotes, setBanknotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBanknotes();
  }, []);

  const loadBanknotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await banknoteService.getBanknotes();
      setBanknotes(data);
    } catch (err) {
      setError('Nie udało się załadować banknotów');
      console.error('Error loading banknotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBanknoteClick = (banknoteId) => {
    navigate(`/user/banknote/${banknoteId}`);
  };

  // Grupuj banknoty według waluty
  const groupedBanknotes = banknotes.reduce((acc, banknote) => {
    const currency = banknote.currency || 'Inne';
    if (!acc[currency]) {
      acc[currency] = [];
    }
    acc[currency].push(banknote);
    return acc;
  }, {});

  const banknotesData = [
    // PLN - Złoty polski
    {
      id: 'PLN10',
      name: '10 PLN',
      description: 'Banknot dziesięciozłotowy',
      year: '2014',
      currency: 'PLN',
      color: '#4CAF50',
      frontImage: '/images/banknotes/PLN10_front.jpg',
      backImage: '/images/banknotes/PLN10_back.jpg'
    },
    {
      id: 'PLN20',
      name: '20 PLN',
      description: 'Banknot dwudziestozłotowy',
      year: '2014',
      currency: 'PLN',
      color: '#4CAF50',
      frontImage: '/images/banknotes/PLN20_front.jpg',
      backImage: '/images/banknotes/PLN20_back.jpg'
    },
    {
      id: 'PLN50',
      name: '50 PLN',
      description: 'Banknot pięćdziesięciozłotowy',
      year: '2014',
      currency: 'PLN',
      color: '#4CAF50',
      frontImage: '/images/banknotes/PLN50_front.jpg',
      backImage: '/images/banknotes/PLN50_back.jpg'
    },
    {
      id: 'PLN100',
      name: '100 PLN',
      description: 'Banknot stuzłotowy',
      year: '2014',
      currency: 'PLN',
      color: '#4CAF50',
      frontImage: '/images/banknotes/PLN100_front.jpg',
      backImage: '/images/banknotes/PLN100_back.jpg'
    },
    {
      id: 'PLN200',
      name: '200 PLN',
      description: 'Banknot dwustuzłotowy',
      year: '2014',
      currency: 'PLN',
      color: '#4CAF50',
      frontImage: '/images/banknotes/PLN200_front.jpg',
      backImage: '/images/banknotes/PLN200_back.jpg'
    },
    {
      id: 'PLN500',
      name: '500 PLN',
      description: 'Banknot pięćsetzłotowy',
      year: '2014',
      currency: 'PLN',
      color: '#4CAF50',
      frontImage: '/images/banknotes/PLN500_front.jpg',
      backImage: '/images/banknotes/PLN500_back.jpg'
    },
    // EUR - Euro
    {
      id: 'EUR5',
      name: '5 EUR',
      description: 'Banknot pięcioeurowy',
      year: '2013',
      currency: 'EUR',
      color: '#2196F3',
      frontImage: '/images/banknotes/EUR5_front.jpg',
      backImage: '/images/banknotes/EUR5_back.jpg'
    },
    {
      id: 'EUR10',
      name: '10 EUR',
      description: 'Banknot dziesięcioeurowy',
      year: '2014',
      currency: 'EUR',
      color: '#2196F3',
      frontImage: '/images/banknotes/EUR10_front.jpg',
      backImage: '/images/banknotes/EUR10_back.jpg'
    },
    {
      id: 'EUR20',
      name: '20 EUR',
      description: 'Banknot dwudziestoeurowy',
      year: '2015',
      currency: 'EUR',
      color: '#2196F3',
      frontImage: '/images/banknotes/EUR20_front.jpg',
      backImage: '/images/banknotes/EUR20_back.jpg'
    },
    {
      id: 'EUR50',
      name: '50 EUR',
      description: 'Banknot pięćdziesięcioeurowy',
      year: '2017',
      currency: 'EUR',
      color: '#2196F3',
      frontImage: '/images/banknotes/EUR50_front.jpg',
      backImage: '/images/banknotes/EUR50_back.jpg'
    },
    {
      id: 'EUR100',
      name: '100 EUR',
      description: 'Banknot stueurowy',
      year: '2019',
      currency: 'EUR',
      color: '#2196F3',
      frontImage: '/images/banknotes/EUR100_front.jpg',
      backImage: '/images/banknotes/EUR100_back.jpg'
    },
    {
      id: 'EUR200',
      name: '200 EUR',
      description: 'Banknot dwustueurowy',
      year: '2019',
      currency: 'EUR',
      color: '#2196F3',
      frontImage: '/images/banknotes/EUR200_front.jpg',
      backImage: '/images/banknotes/EUR200_back.jpg'
    },
    {
      id: 'EUR500',
      name: '500 EUR',
      description: 'Banknot pięćseteurowy',
      year: '2019',
      currency: 'EUR',
      color: '#2196F3',
      frontImage: '/images/banknotes/EUR500_front.jpg',
      backImage: '/images/banknotes/EUR500_back.jpg'
    },
    // USD - Dolar amerykański
    {
      id: 'USD1',
      name: '1 USD',
      description: 'Banknot jednodolarowy',
      year: '2017',
      currency: 'USD',
      color: '#FF9800',
      frontImage: '/images/banknotes/USD1_front.jpg',
      backImage: '/images/banknotes/USD1_back.jpg'
    },
    {
      id: 'USD5',
      name: '5 USD',
      description: 'Banknot pięciodolarowy',
      year: '2017',
      currency: 'USD',
      color: '#FF9800',
      frontImage: '/images/banknotes/USD5_front.jpg',
      backImage: '/images/banknotes/USD5_back.jpg'
    },
    {
      id: 'USD10',
      name: '10 USD',
      description: 'Banknot dziesięciodolarowy',
      year: '2017',
      currency: 'USD',
      color: '#FF9800',
      frontImage: '/images/banknotes/USD10_front.jpg',
      backImage: '/images/banknotes/USD10_back.jpg'
    },
    {
      id: 'USD20',
      name: '20 USD',
      description: 'Banknot dwudziestodolarowy',
      year: '2017',
      currency: 'USD',
      color: '#FF9800',
      frontImage: '/images/banknotes/USD20_front.jpg',
      backImage: '/images/banknotes/USD20_back.jpg'
    },
    {
      id: 'USD50',
      name: '50 USD',
      description: 'Banknot pięćdziesięciodolarowy',
      year: '2017',
      currency: 'USD',
      color: '#FF9800',
      frontImage: '/images/banknotes/USD50_front.jpg',
      backImage: '/images/banknotes/USD50_back.jpg'
    },
    {
      id: 'USD100',
      name: '100 USD',
      description: 'Banknot stodolarowy',
      year: '2017',
      currency: 'USD',
      color: '#FF9800',
      frontImage: '/images/banknotes/USD100_front.jpg',
      backImage: '/images/banknotes/USD100_back.jpg'
    },
    // TRY - Lira turecka
    {
      id: 'TRY5',
      name: '5 TRY',
      description: 'Banknot pięciolir tureckich',
      year: '2019',
      currency: 'TRY',
      color: '#9C27B0',
      frontImage: '/images/banknotes/TRY5_front.jpg',
      backImage: '/images/banknotes/TRY5_back.jpg'
    },
    {
      id: 'TRY10',
      name: '10 TRY',
      description: 'Banknot dziesięciolir tureckich',
      year: '2019',
      currency: 'TRY',
      color: '#9C27B0',
      frontImage: '/images/banknotes/TRY10_front.jpg',
      backImage: '/images/banknotes/TRY10_back.jpg'
    },
    {
      id: 'TRY20',
      name: '20 TRY',
      description: 'Banknot dwudziestolir tureckich',
      year: '2019',
      currency: 'TRY',
      color: '#9C27B0',
      frontImage: '/images/banknotes/TRY20_front.jpg',
      backImage: '/images/banknotes/TRY20_back.jpg'
    },
    {
      id: 'TRY50',
      name: '50 TRY',
      description: 'Banknot pięćdziesięciolir tureckich',
      year: '2019',
      currency: 'TRY',
      color: '#9C27B0',
      frontImage: '/images/banknotes/TRY50_front.jpg',
      backImage: '/images/banknotes/TRY50_back.jpg'
    },
    {
      id: 'TRY100',
      name: '100 TRY',
      description: 'Banknot stulir tureckich',
      year: '2019',
      currency: 'TRY',
      color: '#9C27B0',
      frontImage: '/images/banknotes/TRY100_front.jpg',
      backImage: '/images/banknotes/TRY100_back.jpg'
    },
    {
      id: 'TRY200',
      name: '200 TRY',
      description: 'Banknot dwustulir tureckich',
      year: '2019',
      currency: 'TRY',
      color: '#9C27B0',
      frontImage: '/images/banknotes/TRY200_front.jpg',
      backImage: '/images/banknotes/TRY200_back.jpg'
    }
  ];

  const handleBack = () => {
    navigate('/user');
  };

  if (loading) {
    return (
      <div className="banknote-list-page">
        <header className="banknote-list-header">
          <button className="back-button" onClick={handleBack}>
            <FiArrowLeft />
            Powrót
          </button>
          <h1 className="page-title">Lista Banknotów</h1>
        </header>
        <div className="loading-message">Ładowanie banknotów...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="banknote-list-page">
        <header className="banknote-list-header">
          <button className="back-button" onClick={handleBack}>
            <FiArrowLeft />
            Powrót
          </button>
          <h1 className="page-title">Lista Banknotów</h1>
        </header>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="banknote-list-page">
      <header className="banknote-list-header">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft />
          Powrót
        </button>
        <h1 className="page-title">Lista Banknotów</h1>
      </header>

      <main className="banknote-list-content">
        {Object.entries(groupedBanknotes).map(([currency, currencyBanknotes]) => {
          const currencyNames = {
            'PLN': 'Złoty polski',
            'EUR': 'Euro',
            'USD': 'Dolar amerykański',
            'TRY': 'Lira turecka'
          };
          
          return (
            <div key={currency} className="currency-section">
              <h2 className="currency-title">{currencyNames[currency] || currency} ({currency})</h2>
              <div className="banknote-grid">
                {currencyBanknotes.map((banknote) => (
                  <div
                    key={banknote.id}
                    className="banknote-card"
                    onClick={() => handleBanknoteClick(banknote.id)}
                  >
                    <div className="banknote-image-container">
                      <img
                        src={banknoteService.getImageUrl(banknote.image_avers)}
                        alt={`${banknote.denomination} - Awers`}
                        className="banknote-image"
                        onError={(e) => {
                          console.error('Error loading banknote image:', e.target.src);
                          e.target.src = '/resources/nieznany_banknot.png';
                        }}
                        onLoad={() => {
                          console.log('Banknote image loaded successfully:', banknoteService.getImageUrl(banknote.image_avers));
                        }}
                      />
                    </div>
                    <div className="banknote-info">
                      <h3 className="banknote-name">{banknote.denomination}</h3>
                      <p className="banknote-description">
                        {banknote.country} - {banknote.currency}
                      </p>
                      {banknote.effigy && (
                        <p className="banknote-effigy">Wizerunek: {banknote.effigy}</p>
                      )}
                      {banknote.dimensions && (
                        <p className="banknote-dimensions">Wymiary: {banknote.dimensions}</p>
                      )}
                    </div>
                    <div className="banknote-action">
                      <FiInfo className="info-icon" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default BanknoteListPage;
