import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa"; // Importa o ícone de lixeira

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white; /* Fundo branco */

  .table-responsive {
    overflow-x: auto; /* Adiciona rolagem horizontal */
  }

  .cart-table {
    width: 100%;
    margin-bottom: 30px;
    border-collapse: collapse;

    th, td {
      padding: 15px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #333;
      color: white;
    }

    img {
      width: 80px;
      height: auto;
      border-radius: 8px;
    }

    .qty-controls {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 4px;
      }

      p {
        margin: 0 10px;
        font-size: 16px;
      }
    }

    .remove-btn {
      color: red;
      cursor: pointer;
      border: none;
      background: none;
    }

    .remove-btn:hover {
      color: darkred;
    }
  }

  .bottom-section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .summary-section, .cupom-section {
      width: 48%;
      padding: 20px;
      background-color: white; /* Fundo branco */
    }

    .summary-section h5, .cupom-section h5 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 15px;
    }

    .btn-finalizar {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      width: 100%;
      text-align: center;
      font-size: 18px;
      border-radius: 4px;
      margin-top: 20px;
    }

    input {
      width: 70%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      background-color: #cda435;
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 4px;
    }

    .btn-continuar {
      margin-top: 15px;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 10px 20px;
      border-radius: 4px;
      display: inline-block;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      /* Para telas menores */
      flex-direction: column; /* Coloca um embaixo do outro */
      align-items: center;

      .summary-section, .cupom-section {
        width: 100%; /* Ocupar toda a largura */
        margin-bottom: 20px;
      }

      .cart-table th, .cart-table td {
        padding: 10px;
      }

      .qty-controls button {
        padding: 5px;
      }
    }

    @media (max-width: 480px) {
      /* Para telas ainda menores */
      img {
        width: 60px;
        height: auto;
      }

      input {
        width: 100%;
      }

      .btn-finalizar {
        font-size: 16px;
      }

      button {
        font-size: 14px;
        padding: 8px 12px;
      }

      .btn-continuar {
        font-size: 14px;
        padding: 8px 12px;
      }
    }
  }
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState(15.0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [coupon, setCoupon] = useState(""); // Estado do cupom
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

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
    localStorage.setItem("cart", JSON.stringify(cartItems));
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
    // Remove todos os itens da linha
    const updatedCart = cartItems.filter(
      (item) => item.codigoPRODUTO !== product.codigoPRODUTO
    );
    setCartItems(updatedCart);
    dispatch(delCart(product));
  };

  const decrementItem = (product) => {
    // Diminui a quantidade, ou remove se a quantidade for 1
    const updatedCart = cartItems
      .map((item) => {
        if (item.codigoPRODUTO === product.codigoPRODUTO) {
          if (item.qty > 1) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return null; // Remove se a quantidade for 1
          }
        }
        return item;
      })
      .filter(Boolean); // Remove os "nulls"
    setCartItems(updatedCart);
    dispatch(delCart(product));
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    if (coupon === "VL777") {
      setShipping(0);
      alert("Cupom aplicado: Frete grátis!");
    } else {
      alert("Cupom inválido!");
    }
  };

  const EmptyCart = () => (
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

  const ShowCart = () => (
    <CartContainer>
      <div className="table-responsive">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Detalhes do Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Frete</th>
              <th>Subtotal</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.codigoPRODUTO}>
                <td>
                  <img src={item.imagemPRODUTO} alt={item.nomePRODUTO} />
                  <p>{item.nomePRODUTO}</p>
                </td>
                <td>R$ {parseFloat(item.precoPRODUTO).toFixed(2)}</td>
                <td>
                  <div className="qty-controls">
                    <button onClick={() => decrementItem(item)}>-</button>
                    <p>{item.qty}</p>
                    <button onClick={() => addItem(item)}>+</button>
                  </div>
                </td>
                <td>FREE</td>
                <td>R$ {(item.qty * item.precoPRODUTO).toFixed(2)}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item)}
                    aria-label="Remover"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bottom-section">
        <div className="summary-section">
          <h5>Resumo</h5>
          <div className="total-row">
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Frete:</span>
            <span>R$ {shipping.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <strong>Total:</strong>
            <strong>R$ {(subtotal + shipping).toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn-finalizar">
            Finalizar compra
          </Link>
        </div>

        <div className="cupom-section">
          <h5>Cupom de Desconto</h5>
          <input
            type="text"
            placeholder="Digite seu código de cupom"
            value={coupon}
            onChange={handleCouponChange}
          />
          <button onClick={applyCoupon}>Aplicar Cupom</button>
          <Link to="/" className="btn-continuar" style={{ color: '#000' }}>Continuar Comprando</Link>
        </div>
      </div>
    </CartContainer>
  );

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
