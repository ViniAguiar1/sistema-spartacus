import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styled from "styled-components";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 400]); // Controle de preço
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

  // Função para carregar categorias dinamicamente
  const carregaCategorias = () => {
    fetch("https://api.spartacusprimetobacco.com.br/api/categorias")
      .then((response) => response.json())
      .then((result) => {
        const mappedCategorias = result.map((categoria) => ({
          id: categoria.codigoCATEGORIA,
          name: categoria.nomeCATEGORIA,
          image: categoria.imagemCATEGORIA,
        }));
        setCategorias(mappedCategorias);
      })
      .catch((error) => console.error(error));
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
    carregaCategorias();
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

  const filterProduct = (catId) => {
    const updatedList = data.filter((item) => item.categoriaPRODUTO === catId);
    setFilter(updatedList);
  };

  const handlePriceChange = (event) => {
    const newValue = [Number(event.target.value), priceRange[1]];
    setPriceRange(newValue);
    const updatedList = data.filter(
      (item) => parseFloat(item.precoPRODUTO) >= priceRange[0] && parseFloat(item.precoPRODUTO) <= priceRange[1]
    );
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <MainLayout>
          <CategoryFilter>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <h5>Categoria</h5>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {categorias.map((categoria) => (
                    <div
                      key={categoria.id}
                      style={{ textAlign: "center", cursor: "pointer" }}
                      onClick={() => filterProduct(categoria.id)}
                    >
                      <img
                        src={categoria.image}
                        alt={categoria.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <p>{categoria.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <h5>Filtro de preço</h5>
                <input
                  type="range"
                  min="50"
                  max="400"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  style={{ width: "100%", backgroundColor: "#D4AF37" }} 
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <span>R$ {priceRange[0]}</span> - <span>R$ {priceRange[1]}</span>
                </div>
              </div>
            </div>
          </CategoryFilter>

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
            <h2 className="display-5 text-center">Top Produtos</h2>
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

export default Products;

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
