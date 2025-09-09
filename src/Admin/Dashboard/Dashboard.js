// src/Admin/Dashboard.js
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaDatabase, FaFlag, FaCogs } from "react-icons/fa";
import { FiUser, FiLogOut, FiSettings, FiHome } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

import {
  MainContainer,
  RightColumn,
  TopBar,
  Title,
  Grid,
  Card,
  CardTitle,
  CardValue,
  ErrorMessage,
  LoadingMessage,
  UserMenuContainer,
  DropdownMenu,
  DropdownItem,
} from "./Dashboard.styles";

const DEFAULT_DATA = {
  usersCount: 0,
  countryCount: 0,
  historyCount: 0,
  serverStatus: "N/A"
};

const Dashboard = () => {
  const [data, setData] = useState(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    // Użyj autoryzowanych endpointów z /api/
    const fetchData = async () => {
      try {
        const response = await authService.authenticatedRequest('/api/admin/stats');
        if (response.ok) {
          const json = await response.json();
          setData({
            usersCount: json.total_users,
            countryCount: json.total_banknotes, // Rzeczywista liczba banknotów z API
            historyCount: json.total_history,
            serverStatus: "on"
          });
        } else {
          throw new Error(`Błąd serwera: ${response.status}`);
        }
      } catch (err) {
        console.warn("Błąd pobierania danych:", err.message);
        setData(DEFAULT_DATA);
        setServerError(true);
      } finally {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => clearTimeout(timeoutId);
  }, []);

  const handleCardClick = (moduleName) => {
    navigate(`/admin/${moduleName}`);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleBackToUser = () => {
    navigate('/user');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackToApp = () => {
    navigate('/user');
  };

  if (isLoading) {
    return (
      <MainContainer>
        <LoadingMessage>Ładowanie danych...</LoadingMessage>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <RightColumn>
        <TopBar>
          <UserMenuContainer>
            <FiUser onClick={handleMenuToggle} />
            {isMenuOpen && (
              <DropdownMenu>
                <DropdownItem onClick={handleBackToApp}>
                  <FiHome />
                  Powrót do aplikacji
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  <FiLogOut />
                  Wyloguj się
                </DropdownItem>
              </DropdownMenu>
            )}
          </UserMenuContainer>
        </TopBar>

        <Title>Panel Administratora – Dashboard</Title>

        <Grid>
          <Card onClick={() => {
            handleCardClick("userlist");
          }
          }>
            <FaUserCircle />
            <CardTitle>Liczba użytkowników</CardTitle>
            <CardValue>{data.usersCount}</CardValue>
          </Card>

          <Card onClick={() =>{
            handleCardClick("banknotelist");
          }}>
            <FaFlag />
            <CardTitle>Banknoty w Bazie Danych</CardTitle>
            <CardValue>{data.countryCount}</CardValue>
          </Card>

          <Card onClick={() => handleCardClick("history")}>
            <FaDatabase />
            <CardTitle>Suma przetworzeń w Historii</CardTitle>
            <CardValue>{data.historyCount} {data.historyCount !== 0 ? "rekordów" : ""}</CardValue>
          </Card>

          <Card>
            <FaCogs />
            <CardTitle>Status systemu</CardTitle>
            <CardValue>{data.serverStatus}</CardValue>
          </Card>
        </Grid>

        {serverError && (
          <ErrorMessage>
            Brak połączenia z serwerem
          </ErrorMessage>
        )}
      </RightColumn>
    </MainContainer>
  );
};

export default Dashboard;
