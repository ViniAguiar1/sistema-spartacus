import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  .form-cupom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input {
    width: 70%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .btn-cupom {
    background-color: #cda435;
    color: #fff;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
  }

  .btn-continuar {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 15px;
    border-radius: 4px;
    display: block;
    text-align: center;
  }

  h5 {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState(15.0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [coupon, setCoupon] = useState(""); // Estado do cupom
  const [isCouponValid, setIsCouponValid] = useState(true); // Controle do botão de cupom
  const dispatch = useDispatch();

  // Carrega o carrinho uma única vez ao montar o componente
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    const savedShipping = localStorage.getItem("shipping");
    if (savedShipping) {
      setShipping(JSON.parse(savedShipping));
    }
  }, []); // Dependências vazias para rodar só uma vez

  // Atualiza o subtotal e o total de itens sempre que o carrinho é alterado
  useEffect(() => {
    let sub = 0;
    let items = 0;

    cartItems.forEach((item) => {
      const preco = parseFloat(item.precoPRODUTO) || 0;
      const quantidade = item.qty || 0;
      sub += preco * quantidade;
      items += quantidade;
    });

    setSubtotal(sub);
    setTotalItems(items);
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Salva as alterações no localStorage
  }, [cartItems]);

  const addItem = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.codigoPRODUTO === product.codigoPRODUTO
        ? { ...item, qty: item.qty + 1 }
        : item
    );
    setCartItems(updatedCart);
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.codigoPRODUTO === product.codigoPRODUTO && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        } else if (item.codigoPRODUTO === product.codigoPRODUTO && item.qty === 1) {
          return null;
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updatedCart);
    dispatch(delCart(product));
  };

  const applyCoupon = () => {
    if (coupon === "VL777") {
      setShipping(0);
      setIsCouponValid(true);
      alert("Cupom aplicado: Frete grátis!");
    } else {
      alert("Cupom inválido!");
      setIsCouponValid(false);
    }
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Seu Carrinho está vazio</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = () => {
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Lista de Produtos</h5>
                  </div>
                  <div className="card-body">
                    {cartItems.map((item) => (
                      <div key={item.codigoPRODUTO}>
                        <div className="row d-flex align-items-center">
                          <div className="col-lg-3 col-md-12">
                            <div className="bg-image rounded">
                              <img
                                src={item.imagemPRODUTO}
                                alt={item.nomePRODUTO}
                                width={100}
                                height={75}
                              />
                            </div>
                          </div>

                          <div className="col-lg-5 col-md-6">
                            <p>
                              <strong>{item.nomePRODUTO}</strong>
                            </p>
                          </div>

                          <div className="col-lg-4 col-md-6">
                            <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                              <button className="btn px-3" onClick={() => removeItem(item)}>
                                <i className="fas fa-minus"></i>
                              </button>

                              <p className="mx-5">{item.qty || 0}</p>

                              <button className="btn px-3" onClick={() => addItem(item)}>
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>

                            <p className="text-start text-md-center">
                              <strong>
                                {item.qty || 0} x R${parseFloat(item.precoPRODUTO).toFixed(2)}
                              </strong>
                            </p>
                          </div>
                        </div>

                        <hr className="my-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Dados do Pedido</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Produtos ({totalItems})<span>R${subtotal.toFixed(2)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Taxa de Entrega
                        <span>R${shipping.toFixed(2)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total</strong>
                        </div>
                        <span>
                          <strong>R${(subtotal + shipping).toFixed(2)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link to="/checkout" className="btn btn-dark btn-lg btn-block">
                      Finalizar
                    </Link>
                  </div>
                </div>

                {/* Seção de Cupom */}
                <Section>
                  <h5 className="mb-3">Cupom de Desconto</h5>
                  <div className="form-cupom">
                    <input
                      type="text"
                      placeholder="Digite seu código de cupom"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button className="btn-cupom" onClick={applyCoupon}>
                      Aplicar Cupom
                    </button>
                  </div>
                </Section>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Carrinho</h1>
        <hr />
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
