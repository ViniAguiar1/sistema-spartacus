/* eslint-disable */
import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const FooterFAQ = () => {
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
  const [showAnswer4, setShowAnswer4] = useState(false);

  return (
    <FooterContainer>
      <FooterTitle>Dúvidas Frequentes</FooterTitle>
      <FooterSubtitle>Informações para usuários</FooterSubtitle>
      <FAQContainer>
        <FAQSection>
          <Question>
            <span>Como funciona o pagamento?</span>
            <ShowButton onClick={() => setShowAnswer1(!showAnswer1)}>
              <FontAwesomeIcon icon={showAnswer1 ? faMinus : faPlus} />
            </ShowButton>
          </Question>
          <Answer show={showAnswer1}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Answer>
        </FAQSection>
        <FAQSection>
          <Question>
            <span>Quem vai entregar o meu produto?</span>
            <ShowButton onClick={() => setShowAnswer2(!showAnswer2)}>
              <FontAwesomeIcon icon={showAnswer2 ? faMinus : faPlus} />
            </ShowButton>
          </Question>
          <Answer show={showAnswer2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Answer>
        </FAQSection>
        {/* Nova FAQ */}
        <FAQSection>
          <Question>
            <span>Como posso acompanhar meu pedido?</span>
            <ShowButton onClick={() => setShowAnswer3(!showAnswer3)}>
              <FontAwesomeIcon icon={showAnswer3 ? faMinus : faPlus} />
            </ShowButton>
          </Question>
          <Answer show={showAnswer3}>
            Você pode acompanhar seu pedido através do nosso portal de clientes, acessando a aba de "Meus Pedidos".
          </Answer>
        </FAQSection>
        <FAQSection>
          <Question>
            <span>Há garantia para os produtos?</span>
            <ShowButton onClick={() => setShowAnswer4(!showAnswer4)}>
              <FontAwesomeIcon icon={showAnswer4 ? faMinus : faPlus} />
            </ShowButton>
          </Question>
          <Answer show={showAnswer4}>
            Sim, todos os produtos possuem garantia de 1 ano. Para mais detalhes, consulte nossa política de garantia.
          </Answer>
        </FAQSection>
      </FAQContainer>
    </FooterContainer>
  );
};

export default FooterFAQ;

/* Estilos com Styled Components */

const FooterContainer = styled.div`
  background-color: #2c2c2c;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
  max-width: 100%;
  margin: 0 8rem 2rem;
  border-radius: 8px;
  position: relative;
  bottom: 0;
`;

const FooterTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const FooterSubtitle = styled.p`
  font-size: 16px;
  color: #bbb;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const FAQContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FAQSection = styled.div`
  flex: 1 1 calc(50% - 20px);
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%; /* Ocupa 100% da largura no tablet e celular */
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Answer = styled.p`
  font-size: 16px;
  color: #ccc;
  margin-bottom: 10px;
  max-height: ${(props) => (props.show ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ShowButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
