import React from 'react';
import styled from 'styled-components';

// Styled Components para o formulário
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const FormSubtitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  resize: none;
  height: 100px;
  grid-column: span 2; // Ocupa duas colunas
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

// Componente que exibe a seção "Minhas Informações"
const MyInformation = () => {
  return (
    <FormContainer>
      <FormTitle>Minhas Informações</FormTitle>
      <FormSubtitle>Adicionar endereço</FormSubtitle>
      <InputGroup>
        <Input type="text" placeholder="Primeiro nome" />
        <Input type="text" placeholder="Sobrenome" />
        <Input type="text" placeholder="Cidade / Região" />
        <Input type="text" placeholder="Celular*" />
        <Input type="text" placeholder="Endereço" />
        <Input type="text" placeholder="Apt, Bloco, Unidade" />
        <TextArea placeholder="Instrução de entrega" />
      </InputGroup>
      <CheckboxGroup>
        <div>
          <input type="checkbox" id="enderecoEntrega" />
          <label htmlFor="enderecoEntrega">Defina como endereço de entrega padrão</label>
        </div>
        <div>
          <input type="checkbox" id="enderecoCobranca" />
          <label htmlFor="enderecoCobranca">Definir como endereço de cobrança padrão</label>
        </div>
      </CheckboxGroup>
      <ButtonGroup>
        <SaveButton>Salvar</SaveButton>
        <CancelButton>Cancelar</CancelButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default MyInformation;
