// src/Admin/Dashboard.js
import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaDatabase, FaFlag, FaCogs } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import {
  MainContainer,
  RightColumn,
  TopBar,
  Title,
  Grid,
  Card,
  CardTitle,
  CardValue,
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
  const navigate = useNavigate();

  

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch("http://localhost:8000/admin/dashboard", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Błąd serwera: ${res.status}`);
        const json = await res.json();
        setData({
          usersCount: json.users_count,
          countryCount: json.countries,
          historyCount: json.history_count,
          serverStatus: json.server_status
        });
      })
      .catch((err) => {
        console.warn("Błąd pobierania danych:", err.message);
        setData(DEFAULT_DATA);
        setServerError(true);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setIsLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, []);

  const handleCardClick = (moduleName) => {
    navigate(`/admin/${moduleName}`);
  };

  if (isLoading) {
    return (
      <MainContainer>
        <p style={{ color: "white", margin: "auto" }}>Ładowanie danych...</p>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <RightColumn>
        <TopBar>
          <FaBell />
          <FaUserCircle />
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
          <p style={{ color: "orange", marginTop: "20px", textAlign: "center" }}>
            Brak połączenia z serwerem
          </p>
        )}
      </RightColumn>
    </MainContainer>
  );
};

export default Dashboard;