// src/Admin/Dashboard.js
import React from "react";
import styled from "styled-components";
import { FaBell, FaUserCircle, FaDatabase, FaFlag, FaMoneyBill, FaCogs } from "react-icons/fa";

// --- STYLE --- //
const MainContainer = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #1A1A1D;
  display: flex;
  position: relative;
`;

const RightColumn = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 40px;

  svg {
    font-size: 1.4rem;
    color: #B0B0B0;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const Title = styled.h3`
  color: #E0E0E0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 28px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

const Card = styled.div`
  background-color: #2A2A2E;
  border: 1px solid #4A4A52;
  border-radius: 12px;
  padding: 20px;
  color: #E0E0E0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #3A3A40;
    transform: translateY(-3px);
  }

  svg {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #7FB3D3;
  }
`;

const CardTitle = styled.h4`
  font-size: 1.1rem;
  margin: 0;
  margin-bottom: 8px;
`;

const CardValue = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
  color: #E0E0E0;
`;

// --- DASHBOARD COMPONENT --- //
const Dashboard = () => {
  return (
    <MainContainer>
      <RightColumn>
        <TopBar>
          <FaBell />
          <FaUserCircle />
        </TopBar>

        <Title>Panel Administratora – Dashboard</Title>

        <Grid>
          <Card>
            <FaMoneyBill />
            <CardTitle>Łączna liczba banknotów</CardTitle>
            <CardValue>152</CardValue>
          </Card>

          <Card>
            <FaFlag />
            <CardTitle>Kraje w systemie</CardTitle>
            <CardValue>34</CardValue>
          </Card>

          <Card>
            <FaDatabase />
            <CardTitle>Ostatnio dodane</CardTitle>
            <CardValue>10 banknotów</CardValue>
          </Card>

          <Card>
            <FaCogs />
            <CardTitle>Status modelu ML</CardTitle>
            <CardValue>✅ Aktualny</CardValue>
          </Card>
        </Grid>
      </RightColumn>
    </MainContainer>
  );
};

export default Dashboard;
