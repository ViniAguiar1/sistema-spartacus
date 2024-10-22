import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import { Footer, Navbar } from "../components";
import styled from 'styled-components';
import { FaClipboardList, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Ícones da lateral
import MyInformation from '../components/MyInformations';

// Fonte Inter importada globalmente via link ou configuração no projeto

// Styled Components
const Container = styled.div`
  margin: 20px auto;
  max-width: 1200px;
  padding: 20px;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`;

const UserContainer = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  text-align: left;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  font-size: 1.8rem;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Tab = styled.div`
  font-size: 1rem;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  color: ${props => (props.active ? "#333" : "#777")}; /* Cor da aba ativa */
  border-bottom: ${props => (props.active ? "3px solid #f00" : "none")}; /* Linha inferior na aba ativa */
  transition: all 0.3s ease;

  &:hover {
    color: #333;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinhamento das abas */
//   border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;


const MenuLateral = styled.div`
  width: 20%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .menu-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 40px;
    // border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    position: relative;

    // Detalhe vermelho antes do nome
    &::before {
      content: "";
      width: 5px;
      height: 50%; /* Altura ajustada para cobrir apenas parte do conteúdo */
      background-color: #D02626; /* Detalhe vermelho */
      position: absolute;
      left: -10px; /* Alinha corretamente antes do nome */
      top: 50%; /* Centralizado verticalmente */
      transform: translateY(-50%);
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-left: 15px; /* Para afastar do detalhe vermelho */
  }

  p {
    color: #777;
    margin-top: 5px;
    font-size: 1rem;
    margin-left: 15px; /* Para alinhar com o nome */
  }

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  font-weight: bold;
  color: ${props => (props.active ? "#333" : "#777")};
  cursor: pointer;
  font-size: 1rem;
  box-shadow: ${props => (props.active ? "0 4px 8px rgba(0, 0, 0, 0.025)" : "none")}; /* Sombra na aba ativa */
  padding: 10px 0;
  transition: box-shadow 0.3s ease, color 0.3s ease;

  &:hover {
    color: #000;
  }

  @media (max-width: 768px) {
    text-align: center;
    margin: 10px 0;
  }

//   svg {
//     color: ${props => (props.active ? "#f00" : "#777")};
//     font-size: 1.2rem;
//   }
`;

const LogoutButton = styled(MenuItem)`
  color: #f00;

  &:hover {
    color: #c00;
  }

  svg {
    color: #f00;
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
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* Adicionando sombra suave */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #444;
  margin-bottom: 20px;
`;

const OrderDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
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
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductQuantity = styled.p`
  margin: 0;
  color: #777;
`;

const DetailsButton = styled.button`
  background-color: #BF9000;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  font-family: 'Inter', sans-serif;
  width: 9rem;
  height: 2.5rem;
  

  &:hover {
    background-color: #ec971f;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  background-color: ${props => (props.active ? "#f0ad4e" : "#ddd")};
  color: ${props => (props.active ? "#fff" : "#000")};
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.active ? "#ec971f" : "#bbb")};
  }
`;

// Componente que exibe os pedidos
const Orders = ({ orders }) => {
    const [activeTab, setActiveTab] = useState('todos'); // Estado para a aba ativa
  
    return (
      <>
        <Title>Meus pedidos</Title>
        <TabsContainer>
          <Tab active={activeTab === 'todos'} onClick={() => setActiveTab('todos')}>Todos</Tab>
          <Tab active={activeTab === 'cancelados'} onClick={() => setActiveTab('cancelados')}>Cancelados</Tab>
          <Tab active={activeTab === 'completos'} onClick={() => setActiveTab('completos')}>Completos</Tab>
        </TabsContainer>
  
        {orders.length > 0 ? (
          <OrderList>
            {orders.map((order, index) => (
                <div>
              <OrderCard key={index}>
                <OrderInfo>
                  <div>
                    <p><span style={{ fontWeight: 'bold'}}>Ordem do pedido: </span> #{Math.floor(Math.random() * 10000000)}</p>
                    <p>Data do pedido: {order.dataPedido}</p>
                    <p>Método de pagamento: Cartão de crédito</p>
                  </div>
                  <div>
                    <p>Status do pedido: Entregue</p>
                  </div>
                </OrderInfo>
              </OrderCard>
                <OrderDetailsContainer>
                  <OrderDetails>
                    <img src={order.produtos[0].imagemPRODUTO || "https://via.placeholder.com/80"} alt={order.produtos[0].nomePRODUTO} style={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '20px' }} />
                    <ProductDetails>
                      <ProductTitle>{order.produtos[0].nomePRODUTO}</ProductTitle>
                      <ProductQuantity>Quantidade: {order.produtos[0].qty || 1}</ProductQuantity>
                      <ProductQuantity>Total: R$ {order.produtos[0].precoPRODUTO}</ProductQuantity>
                    </ProductDetails>
                  </OrderDetails>
                  <DetailsButton>Ver detalhes</DetailsButton>
                </OrderDetailsContainer>
                </div>
            ))}
          </OrderList>
        ) : (
          <p className="text-center">Nenhum pedido encontrado.</p>
        )}
      </>
    );
  };
  

const Profile = () => {
  const navigate = useNavigate(); // Hook para redirecionamento
  const [activeSection, setActiveSection] = useState('orders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Recuperando o pedido do localStorage
    const storedOrder = localStorage.getItem("pedido");
    if (storedOrder) {
      setOrders([JSON.parse(storedOrder)]);
    }
  }, []);

  const handleLogout = () => {
    // Limpa a sessão e redireciona para a página de login
    localStorage.clear();
    navigate('/'); // Use navigate para redirecionar
  }

  return (
    <>
      <Navbar />
      <Container>
        <UserContainer>
          <MenuLateral>
            <div className="menu-header">
              <h2>Olá, Rennan</h2>
            </div>
            <div>
              <p style={{ fontSize: 14 }}>Bem-vindo à sua conta</p>
            </div>
            <MenuItem onClick={() => setActiveSection('orders')} active={activeSection === 'orders'}>
              <FaClipboardList />
              Meus pedidos
            </MenuItem>
            <MenuItem onClick={() => setActiveSection('info')} active={activeSection === 'info'}>
              <FaUser />
              Minhas Informações
            </MenuItem>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              Sair
            </LogoutButton>
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

export default Profile;
