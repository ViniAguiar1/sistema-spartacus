import React from "react";
import { Footer, Main, Navbar, Product } from "../components";
import styled from "styled-components";
import Banner from "../components/Banner";
import ImportantNotices from "../components/ImportantNotices";
import Slider from "react-slick";
import ProductsContinue from "../components/ProductsContinue";

const Offers = () => {
  const settings = {
    dots: true, // Mostrar os pontinhos de navegação
    infinite: true, // Carrossel infinito
    speed: 500, // Velocidade da transição
    slidesToShow: 1, // Mostra apenas um banner por vez no mobile
    slidesToScroll: 1, // Avança um slide por vez no mobile
    autoplay: true, // Ativar autoplay
    autoplaySpeed: 3000, // 3 segundos para trocar automaticamente
  };

  // Definir os blocos com pessoas da web e descontos
  const blocks = [
    { id: 1, label: "Masculino 70%", image: "assets/bebe.webp" },
    { id: 2, label: "Feminino 50%", image: "assets/feminino.webp" },
    { id: 3, label: "Kids 30%", image: "assets/infantil.webp" },
    { id: 4, label: "Bebês 40%", image: "assets/masculino.webp" },
  ];

  return (
    <>
      <Navbar />
      <Main />
      <Product />

      {/* Banner container */}
      <BannerContainer>
        <DesktopBanners>
          <Banner />
          <Banner />
        </DesktopBanners>

        {/* No mobile, exibe os banners em um carrossel */}
        <MobileBanners>
          <Slider {...settings}>
            <Banner />
            <Banner />
          </Slider>
        </MobileBanners>
      </BannerContainer>

      {/* Exibição dos blocos promocionais */}
      <PromoBlockContainer>
        {blocks.map((block) => (
          <PromoBlock key={block.id}>
            <PromoImage src={block.image} alt={block.label} />
            <PromoLabel>{block.label}</PromoLabel>
          </PromoBlock>
        ))}
      </PromoBlockContainer>
      <ProductsContinue />

      <ImportantNotices />
      <Footer />
    </>
  );
};

export default Offers;

/* Styled Components */

// Contêiner dos blocos promocionais
// Contêiner dos blocos promocionais
const PromoBlockContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));  /* Largura mínima ajustada para permitir mais blocos na mesma linha */
  gap: 20px;
  justify-items: center;  /* Certifica que os itens estão centralizados */
  padding: 40px 20px;
  max-width: 1200px;  /* Limitar a largura máxima do container */
  margin: 0 auto;  /* Centraliza o container na página */

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Ajustar para telas menores */
  }
`;


// Cada bloco promocional (contém a imagem, legenda)
const PromoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Imagem de cada bloco
const PromoImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

// Legenda de cada bloco
const PromoLabel = styled.p`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Container dos banners
const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

// Banners para desktop
const DesktopBanners = styled.div`
  display: flex;
  gap: 35px;

  @media (max-width: 768px) {
    display: none; // Esconder no mobile
  }
`;

// Carrossel de banners para mobile
const MobileBanners = styled.div`
  display: none; // Esconder no desktop

  @media (max-width: 768px) {
    display: block;
    width: 90%;
    margin-right: 25px;
    margin-left: 25px;
    gap: 10px;
  }
`;
