import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import SensationDescription from "../components/SensationDescription";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify"; // Importa o Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS

const Product = () => {
  const { id } = useParams(); // Pega o codigoPRODUTO da URL
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // Para controlar a imagem principal exibida

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Produto adicionado ao carrinho!", {
      position: "top-right",
      autoClose: 3000, // Fecha automaticamente após 3 segundos
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setLoading2(true);

        // Busca o produto com base no codigoPRODUTO
        const response = await fetch(
          `https://api.spartacusprimetobacco.com.br/api/produtos/${id}`
        );
        const data = await response.json();

        if (data && Object.keys(data).length) {
          setProduct(data);

          // Simulando várias imagens para o produto
          const images = [data.imagemPRODUTO, data.imagemPRODUTO, data.imagemPRODUTO];
          data.imagensPRODUTO = images;

          setSelectedImage(images[0]); // Define a primeira imagem como padrão

          // Busca todos os produtos e filtra por categoria do produto principal
          const responseAll = await fetch(
            `https://api.spartacusprimetobacco.com.br/api/produtos`
          );
          const allProducts = await responseAll.json();

          const similar = allProducts.filter(
            (item) =>
              item.categoriaPRODUTO === data.categoriaPRODUTO &&
              item.codigoPRODUTO !== data.codigoPRODUTO
          );
          setSimilarProducts(similar);
        } else {
          console.error("Erro ao carregar o produto");
        }

        setLoading(false);
        setLoading2(false);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        setLoading(false);
        setLoading2(false);
      }
    };

    getProduct();
  }, [id]);

  const Loading = () => (
    <>
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    </>
  );

  const ShowProduct = () => (
    <>
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-1 col-sm-12 py-3">
            {/* Mostra as miniaturas das imagens */}
            <ThumbnailContainer>
              {product.imagensPRODUTO?.map((img, index) => (
                <img
                  key={index}
                  className={`img-fluid p-2 ${selectedImage === img ? "selected" : ""}`}
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  width="80px"
                  height="80px"
                  onClick={() => setSelectedImage(img)} // Altera a imagem principal ao clicar
                  style={{ cursor: "pointer", border: selectedImage === img ? "2px solid #000" : "none" }}
                />
              ))}
            </ThumbnailContainer>
          </div>
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={selectedImage}
              alt={product.nomePRODUTO}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-5 4col-sm-12 py-5">
            <h1 className="display-7">{product.nomePRODUTO}</h1>

            {/* Exibe as estrelas fixas e douradas */}
            <p className="lead" style={{ fontFamily: "Inter", color: "#807D7E"}}>
              <i className="fa fa-star" style={{ color: "#BF9000" }}></i>
              <i className="fa fa-star" style={{ color: "#BF9000" }}></i>
              <i className="fa fa-star" style={{ color: "#BF9000" }}></i>
              <i className="fa fa-star" style={{ color: "#BF9000" }}></i>
              <i className="fa fa-star-half-alt" style={{ color: "#BF9000" }}></i> 4.5 Avaliação do Produto
            </p>

            {/* <p className="lead">{product.descricaoPRODUTO}</p> */}

            {/* Seção sobre o produto */}
            <ProductDetails>
              <h3>Sobre este produto</h3>
              <p>{product.descricaoPRODUTO}</p>
              <div className="buttons">
                <button onClick={() => addProduct(product)} className="btn btn-success">Comprar</button>
                <span className="price">
                  R${parseFloat(product.precoPRODUTO).toFixed(2)}
                </span>
              </div>
            </ProductDetails>
          </div>
        </div>
      </div>
      <SensationDescription />
    </>
  );

  const ShowSimilarProduct = () => (
    <>
      <div className="py-4 my-4">
        <SimilarHeader>
          <span className="highlight"></span>
          <h2>Produtos Similares</h2>
        </SimilarHeader>
        <ProductGrid>
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => (
              <ProductCard key={item.codigoPRODUTO}>
                <img
                  src={item.imagemPRODUTO}
                  alt={item.nomePRODUTO}
                  height={250}
                />
                <ProductInfo>
                  <h3>{item.nomePRODUTO}</h3>
                  <p>R$ {parseFloat(item.precoPRODUTO).toFixed(2)}</p>
                </ProductInfo>
              </ProductCard>
            ))
          ) : (
            <p>Nenhum produto similar encontrado.</p>
          )}
        </ProductGrid>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <StyledContainer className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            {loading2 ? <Loading /> : <ShowSimilarProduct />}
          </div>
        </div>

        {/* Adicionando a imagem promocional */}
        <div className="row my-5">
          <img
            className="img-fluid w-100"
            src="/assets/banner-madrid.webp"  // Insira o caminho correto da imagem
            alt="Produtos Apple com frete grátis"
          />
        </div>
      </StyledContainer>
      <Footer />
      <ToastContainer /> {/* Adiciona o container do Toastify */}
    </>
  );
};

export default Product;

// Styled Components

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column; // Mantém o layout original (coluna) em telas maiores
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  img.selected {
    border: 2px solid black;
  }

  // No mobile, mudar para linha e mover para baixo da imagem principal
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    margin-top: 10px; // Espaçamento entre a imagem principal e as miniaturas
  }
`;


const StyledContainer = styled.div`
  font-family: 'Inter', sans-serif; // Define a fonte Inter para todo o container
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
  
  img {
    width: 100%;
    height: auto;
    max-height: 250px;
    object-fit: cover;
    margin-bottom: 20px;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const ProductDetails = styled.div`
  margin-top: 20px;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 25px;
      background-color: #28a745;
      margin-right: 10px;
    }
  }

  p {
    margin-bottom: 20px;
    color: #555;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price {
      background-color: #f0f0f0;
      padding: 8px 15px;
      border-radius: 5px;
      font-weight: bold;
    }
  }

  .btn-success {
    background-color: #28a745;
    padding: 10px 20px;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;

const SimilarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .highlight {
    width: 5px;
    height: 30px;
    background-color: #BF9000;
    margin-right: 10px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
`;
