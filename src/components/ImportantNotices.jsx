import React from 'react';
import styled from 'styled-components';

const ImportantNotices = () => {
  return (
    <NoticesContainer>
      <Title>📢 Avisos importantes</Title>
      <CardsContainer>
        <Card>
          <CardTitle>Novos Endereços</CardTitle>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet minim mollit non deserunt ullamco est sit aliqua.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>Indicações</CardTitle>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet minim mollit non deserunt ullamco est sit aliqua.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>Pagamentos via cartão</CardTitle>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet minim mollit non deserunt ullamco est sit aliqua.
          </CardContent>
        </Card>
      </CardsContainer>
    </NoticesContainer>
  );
};

export default ImportantNotices;

/* Styled Components */

const NoticesContainer = styled.div`
  margin: 40px auto;
  max-width: 1200px;
  padding: 0 20px;
`;

const Title = styled.h2`
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;

  /* Ajuste o tamanho da fonte no mobile */
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;

  /* No mobile, os cards ficam empilhados */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  flex: 1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: #ff0000; /* Mudança da cor da borda ao passar o mouse */
  }

  /* No mobile, o padding e o tamanho ajustam */
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;

  /* Ajuste o tamanho da fonte no mobile */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardContent = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;

  /* Ajuste o tamanho da fonte no mobile */
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
