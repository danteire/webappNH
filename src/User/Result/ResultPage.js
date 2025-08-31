import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #0e0e10;
  color: #fff;
`;

const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  background: #161618;
`;

const BackButton = styled.button`
  background: #0088fe;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #006fd6;
  }
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
`;

const LeftColumn = styled.div`
  flex: 1;
  border: 1px solid rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterColumn = styled.div`
  flex: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 280px;
  gap: 20px;
  padding: 20px;
`;

const ChartCard = styled.div`
  background: #161618;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightColumn = styled.div`
  flex: 0.7; /* prawa kolumna zmniejszona o ~30% */
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChartTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1rem;
`;

const colors = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#AA66CC"];

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { serverResponses, originalImageBase64 } = location.state || {
    serverResponses: {},
    originalImageBase64: "",
  };

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <h2>Wyniki klasyfikacji</h2>
        <BackButton onClick={() => navigate("/user")}>
          Powrót
        </BackButton>
      </Header>

      <Content>
        {/* Kolumna lewa — obraz */}
        <LeftColumn>
          {originalImageBase64 ? (
           <img 
            src={`data:image/jpeg;base64,${originalImageBase64}`} 
            alt="Original" 
            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
            />
          ) : (
            <p>Brak obrazu</p>
          )}
        </LeftColumn>

        {/* Kolumna środkowa — wykresy */}
        <CenterColumn>
        {Object.entries(serverResponses || {}).map(([modelName, modelData], idx) => {
            const top6 = Object.entries(modelData.proba || {})
                .sort(([, a], [, b]) => b - a)
                .slice(0, 6)
                .map(([name, value]) => ({ name, value }));

            return (
                <div key={idx} className="bg-[#161618] p-4 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">{modelName.toUpperCase()}</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                    <Pie
                        data={top6}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: ${(value * 100).toFixed(1)}%`}
                    >
                        {top6.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                        backgroundColor: "#161618",
                        border: "1px solid rgba(0,0,0,0.4)",
                        color: "#00ffcc", // kolor czcionki
                        }}
                        formatter={(val, name) => [
                        `${(val * 100).toFixed(1)}%`,
                        name,
                        ]}
                    />
                    </PieChart>
                </ResponsiveContainer>
                </div>
            );
        })}

        </CenterColumn>

        {/* Kolumna prawa — podsumowanie */}
        <RightColumn>
          <h2>Podsumowanie</h2>
          {Object.entries(serverResponses || {}).map(([modelName, modelData]) => (
            <p key={modelName}>
              {modelName.toUpperCase()}: {modelData.pred}
            </p>
          ))}
        </RightColumn>
      </Content>
    </PageContainer>
  );
}
