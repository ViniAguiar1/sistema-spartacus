import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styled from "styled-components";

const ProductsContinue = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    // Carrega o carrinho do localStorage ou inicia com um array vazio
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const dispatch = useDispatch();

  const addProduct = (product) => {
    // Atualiza o estado do carrinho
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    
    // Salva o carrinho no localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast.success("Added to cart");
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://api.spartacusprimetobacco.com.br/api/produtos");
      const products = await response.clone().json();
      setData(products);
      setFilter(products);
      setLoading(false);
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <Skeleton height={592} />
          </div>
        ))}
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <MainLayout>
          <ProductGrid>
            {filter.map((product) => {
              return (
                <div
                  id={product.codigoPRODUTO}
                  key={product.codigoPRODUTO}
                  className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
                >
                  <div className="card text-center h-100">
                    <img
                      className="card-img-top p-3"
                      src={product.imagemPRODUTO}
                      alt="Product"
                      height={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.nomePRODUTO.substring(0, 12)}...
                      </h5>
                      <p className="card-text">
                        {product.descricaoPRODUTO.substring(0, 90)}...
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item lead">R$ {parseFloat(product.precoPRODUTO).toFixed(2)}</li>
                    </ul>
                    <div className="card-body">
                      <Link
                        to={"/product/" + product.codigoPRODUTO}
                        className="btn btn-dark m-1"
                      >
                      Comprar agora
                      </Link>
                      <button
                        className="btn btn-dark m-1"
                        onClick={() => addProduct(product)}
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </ProductGrid>
        </MainLayout>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default ProductsContinue;

/* Styled Components */
const MainLayout = styled.div`
  display: flex;
`;

const CategoryFilter = styled.div`
  width: 250px;
  margin-right: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;
