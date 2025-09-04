// src/Admin/Dashboard.styles.js
import styled from "styled-components";

export const MainContainer = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #1A1A1D;
  display: flex;
  position: relative;
`;

export const RightColumn = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // margin-bottom: 40px; // Usunięte, aby tytuł mógł być wyżej

  svg {
    font-size: 1.4rem;
    color: #B0B0B0;
    margin-left: 20px;
    cursor: pointer;
  }
`;

export const Title = styled.h3`
  color: #E0E0E0;
  margin-top: 10px; // Bliżej góry
  margin-bottom: 30px; // Odstęp od siatki
  text-align: left; // Wyrównanie do lewej
  font-size: 32px; // Większy tytuł
  padding-left: 10px; // Lekkie wcięcie
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Zmiana na 2x2
  gap: 20px;
  width: 100%;
`;

export const Card = styled.div`
  background-color: #2A2A2E;
  border: 1px solid #4A4A52;
  border-radius: 12px;
  padding: 25px; // Nieco większy padding dla lepszego wyglądu
  color: #E0E0E0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
  cursor: pointer; // Ustawienie kursora na wskaźnik, aby sygnalizować klikalność
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Lekki cień

  &:hover {
    background-color: #3A3A40;
    transform: translateY(-5px); // Większe uniesienie na hover
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); // Większy cień na hover
  }

  &:active {
    transform: translateY(-2px); // Lekkie "wciśnięcie" po kliknięciu
    background-color: #4A4A52;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  }

  svg {
    font-size: 2.5rem; // Nieco większe ikony
    margin-bottom: 15px; // Większy odstęp
    color: #7FB3D3;
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.2rem; // Nieco większy tytuł karty
  margin: 0;
  margin-bottom: 10px; // Większy odstęp
`;

export const CardValue = styled.p`
  font-size: 1.8rem; // Nieco większa wartość karty
  font-weight: bold;
  margin: 0;
  color: #E0E0E0;
`;
export const AppContainer = styled.div`
  display: flex;
  width: 1200px;
  height: 700px;
  background-color: #1A1A1D;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;