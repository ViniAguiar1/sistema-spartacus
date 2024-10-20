import React from 'react';
import styled from 'styled-components';

const Banner = () => {
  return (
    <BannerContainer style={{ borderRadius: 12}}>
      <BannerContent>
        <BannerTitle>Promoção Especial!</BannerTitle>
        <BannerSubtitle>Compre agora e receba 20% de desconto em todos os produtos!</BannerSubtitle>
        <BannerButton href="#shop-now">Compre Agora</BannerButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;

/* Styled Components */

const BannerContainer = styled.div`
  background: url('https://via.placeholder.com/1500x500') no-repeat center center/cover; /* Imagem de fundo */
  height: 400px; /* Altura do banner */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  color: #fff;
  border-radius: 12;

  /* Ajuste a altura para telas menores */
  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const BannerContent = styled.div`
  background: rgba(0, 0, 0, 0.5); /* Fundo preto transparente */
  padding: 20px 40px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;

  /* Ajuste o padding e o tamanho máximo do conteúdo em telas menores */
  @media (max-width: 768px) {
    padding: 15px 30px;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    max-width: 400px;
  }
`;

const BannerTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #FFD700; /* Cor dourada */

  /* Ajuste o tamanho da fonte para telas menores */
  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
  color: #f1f1f1;

  /* Ajuste o tamanho da fonte para telas menores */
  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const BannerButton = styled.a`
  padding: 10px 25px;
  background-color: #FFD700; /* Cor dourada */
  color: #333;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background-color: #FFA500; /* Tom laranja ao passar o mouse */
    color: #fff;
  }

  /* Ajuste o tamanho do botão para telas menores */
  @media (max-width: 768px) {
    padding: 8px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 18px;
    font-size: 12px;
  }
`;
