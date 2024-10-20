import React from "react";
import styled from "styled-components";

const SensationDescription = () => {
  return (
    <SensationContainer>
      <LeftSection>
        <SensationButton>Loren Ipsum</SensationButton>
        <SensationText>Loren - Loren - Loren</SensationText>

        <SensationButton>Loren Ipsum</SensationButton>
        <SensationText>Loren - Loren - Loren</SensationText>

        <SensationButton>Loren Ipsum</SensationButton>
        <SensationText>Loren - Loren - Loren</SensationText>
      </LeftSection>

      <RightSection>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Description>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </Description>

        <SliderContainer>
          <SliderLabel>
            <span>Calmante</span>
            <span>Energizante</span>
          </SliderLabel>
          <Slider>
            <SliderBar value={60} />
          </Slider>
        </SliderContainer>

        <SliderContainer>
          <SliderLabel>
            <span>Baixo THC</span>
            <span>Alto THC</span>
          </SliderLabel>
          <Slider>
            <SliderBar value={40} />
          </Slider>
        </SliderContainer>
      </RightSection>
    </SensationContainer>
  );
};

export default SensationDescription;

/* Styled Components */

const SensationContainer = styled.div`
  display: flex;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 0 auto;

  /* Responsividade */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin-right: 40px;

  /* Responsividade */
  @media (max-width: 768px) {
    align-items: center;
    margin-right: 0;
  }
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Responsividade */
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const SensationButton = styled.button`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  width: 200px;
  text-align: center;

  /* Responsividade */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SensationText = styled.p`
  font-size: 14px;
  color: #666;

  /* Responsividade */
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
`;

const Slider = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  height: 8px;
  border-radius: 4px;
  position: relative;
`;

const SliderBar = styled.div`
  background-color: #bf9000;
  width: ${({ value }) => value}%;
  height: 100%;
  border-radius: 4px;
`;
