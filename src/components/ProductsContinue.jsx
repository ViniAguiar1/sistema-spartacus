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
          <ProductGrid>
            {filter.map((product) => {
              return (
                <ProductCard key={product.codigoPRODUTO}>
                  <Link to={`/product/${product.codigoPRODUTO}`}>
                    <ProductImage src={product.imagemPRODUTO} alt="Product" />
                  </Link>
                  <ProductInfo>
                    <ProductName>{product.nomePRODUTO}</ProductName>
                    <ProductPrice>R$ {parseFloat(product.precoPRODUTO).toFixed(2)}/unidade</ProductPrice>
                  </ProductInfo>
                </ProductCard>
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
            <HighlightTitle>
              Destaques da Semana
            </HighlightTitle>
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
  font-family: 'Inter', sans-serif;
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
  gap: 20px;
  justify-content: center;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  text-align: center;
  max-width: 240px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #F5F5FA;
  padding: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductName = styled.h5`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const ProductPrice = styled.span`
  font-size: 16px;
  color: #28a745;
`;

const HighlightTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  position: relative;
  display: inline-block;
  padding-left: 20px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 100%;
    background-color: #D4AF37; /* Cor dourada */
  }
`;
