import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  margin: 20px auto;
  max-width: 1200px;
  padding: 20px;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  text-align: left;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const MenuLateral = styled.div`
  width: 20%;
  background-color: white;
  padding: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;

const MenuItem = styled.div`
  margin: 20px 0;
  font-weight: bold;
  color: #555;
  cursor: pointer;
  &:hover {
    color: #000;
  }

  @media (max-width: 768px) {
    text-align: center;
    margin: 10px 0;
  }
`;

const OrdersContainer = styled.div`
  width: 80%;
  padding-left: 40px;

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    padding-top: 20px;
  }
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-right: 0;
  }
`;

const OrderDetails = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductTitle = styled.h5`
  margin: 0;
  color: #333;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductQuantity = styled.p`
  margin: 0;
  color: #777;
`;
const OrderActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const DetailsButton = styled.button`
  background-color: #f0ad4e;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ec971f;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
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

const UserContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Componente que exibe a seção "Minhas Informações"
const MyInformation = () => {
  return (
    <FormContainer>
      <h2>Minhas Informações</h2>
      <InputGroup>
        <Input type="text" placeholder="Primeiro nome" />
        <Input type="text" placeholder="Sobrenome" />
        <Input type="text" placeholder="Cidade / Região" />
        <Input type="text" placeholder="Celular" />
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

// Componente que exibe os pedidos
const Orders = ({ orders }) => {
  return (
    <>
      <Title>Meus pedidos</Title>

      {orders.length > 0 ? (
        <OrderList>
          {orders.map((order, index) => (
            <OrderCard key={index}>
              <OrderInfo>
                <h5>Ordem do pedido: #{Math.floor(Math.random() * 10000000)}</h5>
                <p>Data do pedido: {order.dataPedido}</p>
                <p>Método de pagamento: Cartão de crédito</p>
                <p>Status do pedido: Entregue</p>
              </OrderInfo>

              <OrderDetails>
                {order.produtos.map((produto, idx) => (
                  <div key={idx} style={{ display: 'flex' }}>
                    <ProductImage src={produto.imagemPRODUTO || "https://via.placeholder.com/100"} alt={produto.nomePRODUTO} />
                    <ProductDetails>
                      <ProductTitle>{produto.nomePRODUTO}</ProductTitle>
                      <ProductQuantity>Quantidade: {produto.qty || 1}</ProductQuantity>
                      <ProductQuantity>Total: R$ {produto.precoPRODUTO}</ProductQuantity>
                    </ProductDetails>
                  </div>
                ))}
              </OrderDetails>

              <OrderActions>
                <DetailsButton>Ver detalhes</DetailsButton>
              </OrderActions>
            </OrderCard>
          ))}
        </OrderList>
      ) : (
        <p className="text-center">Nenhum pedido encontrado.</p>
      )}
    </>
  );
};

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Recuperando o pedido do localStorage
    const storedOrder = localStorage.getItem("pedido");
    if (storedOrder) {
      setOrders([JSON.parse(storedOrder)]);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <UserContainer>
          <MenuLateral>
            <MenuItem onClick={() => setActiveSection('orders')}>Meus pedidos</MenuItem>
            <MenuItem onClick={() => setActiveSection('info')}>Minhas Informações</MenuItem>
          </MenuLateral>

          <OrdersContainer>
            {activeSection === 'orders' ? <Orders orders={orders} /> : <MyInformation />}
          </OrdersContainer>
        </UserContainer>
      </Container>
      <Footer />
    </>
  );
}

export default AboutPage;
