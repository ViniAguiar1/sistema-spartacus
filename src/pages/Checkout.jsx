import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CheckoutForm = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const OrderSummary = styled.div`
  width: 35%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 20px;
  }
`;

const CardHeader = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SummaryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SummaryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
  font-size: 1.1rem;
`;

const TotalItem = styled(SummaryItem)`
  font-weight: bold;
  font-size: 1.2rem;
`;

const FormLabel = styled.label`
  font-weight: 600;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  }
`;

const ContinueButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

// Adicionando novas seções para Endereço de Envio, Método de Envio e Forma de Pagamento
const ShippingSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const PaymentSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const PaymentButton = styled.button`
  width: 100%;
  background-color: #28a745;
  color: white;
  padding: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px;
  }
`;

const RadioGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioButton = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
`;

const RadioLabel = styled.label`
  margin-left: 10px;
  font-size: 1rem;
`;

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState(0); // Estado para o shipping

  useEffect(() => {
    // Carregar o carrinho do localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Carregar o shipping salvo no localStorage
    const savedShipping = localStorage.getItem("shipping");
    if (savedShipping) {
      setShipping(JSON.parse(savedShipping));
    }
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const handleSaveOrder = () => {
    const orderData = {
      produtos: cartItems,
      subtotal: cartItems
        .reduce(
          (total, item) => total + item.qty * parseFloat(item.precoPRODUTO),
          0
        )
        .toFixed(2),
      shipping: shipping.toFixed(2),
      total: (
        cartItems.reduce(
          (total, item) => total + item.qty * parseFloat(item.precoPRODUTO),
          0
        ) + shipping
      ).toFixed(2),
      dataPedido: new Date().toLocaleString(),
    };

    // Salvando no localStorage como 'pedido'
    localStorage.setItem("pedido", JSON.stringify(orderData));

    alert("Dados do pedido salvos com sucesso!");
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let totalItems = 0;

    // Calcular o subtotal e o total de itens
    cartItems.forEach((item) => {
      const preco = parseFloat(item.precoPRODUTO) || 0;
      const quantidade = item.qty || 0;
      subtotal += preco * quantidade;
      totalItems += quantidade;
    });

    return (
      <>
        <CheckoutContainer>
          <OrderSummary>
            <CardHeader>
              <h5>Resumo do Pedido</h5>
            </CardHeader>
            <SummaryList>
              <SummaryItem>
                Produtos ({totalItems}) <span>R${subtotal.toFixed(2)}</span>
              </SummaryItem>
              <SummaryItem>
                Taxa de Entrega <span>R${shipping.toFixed(2)}</span>
              </SummaryItem>
              <TotalItem>
                Total <span>R${(subtotal + shipping).toFixed(2)}</span>
              </TotalItem>
            </SummaryList>
          </OrderSummary>

          {/* Formulário de informações do cliente */}
          <CheckoutForm>
            <CardHeader>
              <h4>Dados de Cobrança</h4>
            </CardHeader>
            <div className="card-body">
              <form className="needs-validation" noValidate>
                <div className="row g-3">
                  <div className="col-sm-6 my-1">
                    <FormLabel htmlFor="firstName">Primeiro Nome</FormLabel>
                    <FormInput
                      type="text"
                      id="firstName"
                      placeholder="Digite o nome"
                      required
                    />
                  </div>

                  <div className="col-sm-6 my-1">
                    <FormLabel htmlFor="lastName">Sobrenome</FormLabel>
                    <FormInput
                      type="text"
                      id="lastName"
                      placeholder="Digite o sobrenome"
                      required
                    />
                  </div>

                  <div className="col-12 my-1">
                    <FormLabel htmlFor="email">E-mail</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      placeholder="voce@exemplo.com"
                      required
                    />
                  </div>

                  <div className="col-12 my-1">
                    <FormLabel htmlFor="address">Endereço</FormLabel>
                    <FormInput
                      type="text"
                      id="address"
                      placeholder="Rua Principal, 123"
                      required
                    />
                  </div>

                  <div className="col-12 my-1">
                    <FormLabel htmlFor="address2">
                      Complemento <span className="text-muted">(Opcional)</span>
                    </FormLabel>
                    <FormInput
                      type="text"
                      id="address2"
                      placeholder="Apartamento ou suíte"
                    />
                  </div>

                  <div className="col-md-5 my-1">
                    <FormLabel htmlFor="country">País</FormLabel>
                    <FormInput as="select" id="country" required>
                      <option value="">Escolher...</option>
                      <option>Brasil</option>
                    </FormInput>
                  </div>

                  <div className="col-md-4 my-1">
                    <FormLabel htmlFor="state">Estado</FormLabel>
                    <FormInput as="select" id="state" required>
                      <option value="">Escolher...</option>
                      <option>São Paulo</option>
                    </FormInput>
                  </div>

                  <div className="col-md-3 my-1">
                    <FormLabel htmlFor="zip">CEP</FormLabel>
                    <FormInput type="text" id="zip" placeholder="" required />
                  </div>
                </div>

                <hr className="my-4" />

                {/* Adicionando nova seção de endereço de envio */}
                <CardHeader>
                  <h4>Endereço para envio</h4>
                </CardHeader>
                <ShippingSection>
                  <RadioGroup>
                    <RadioButton>
                      <input
                        type="radio"
                        id="sameAddress"
                        name="addressOption"
                        checked
                      />
                      <RadioLabel htmlFor="sameAddress">
                        O mesmo endereço de cobrança
                      </RadioLabel>
                    </RadioButton>
                    <RadioButton>
                      <input
                        type="radio"
                        id="differentAddress"
                        name="addressOption"
                      />
                      <RadioLabel htmlFor="differentAddress">
                        Use um endereço de entrega diferente
                      </RadioLabel>
                    </RadioButton>
                  </RadioGroup>
                </ShippingSection>

                {/* Adicionando método de envio */}
                <CardHeader>
                  <h4>Método de envio</h4>
                </CardHeader>
                <ShippingSection>
                  <div className="d-flex justify-content-between">
                    <span>Chega em até 24 horas</span>
                    <span>R$ 55,00</span>
                  </div>
                  <small className="text-muted">
                    Em caso de não recebimento da entrega, o valor do frete
                    poderá ser cobrado novamente
                  </small>
                </ShippingSection>

                {/* Adicionando forma de pagamento */}
                <CardHeader>
                  <h4>Forma de pagamento</h4>
                </CardHeader>
                <PaymentSection>
                  <p>Todas as transações são seguras e criptografadas.</p>
                  <p>Sua compra será finalizada no Mercado Pago</p>
                  <PaymentButton onClick={handleSaveOrder}>
                    Finalizar compra no Mercado Pago
                  </PaymentButton>
                </PaymentSection>

                <hr className="my-4" />
                {/* 
                <ContinueButton type="submit">
                  Continuar para o checkout
                </ContinueButton> */}
              </form>
            </div>
          </CheckoutForm>
        </CheckoutContainer>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {cartItems.length > 0 ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
