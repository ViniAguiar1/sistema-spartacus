import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import SensationDescription from "../components/SensationDescription";

const Product = () => {
  const { id } = useParams(); // Pega o codigoPRODUTO da URL
  const [product, setProduct] = useState({}); // Estado inicial de objeto vazio
  const [similarProducts, setSimilarProducts] = useState([]); // Inicializa com um array vazio
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
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

        // Verifica se os dados do produto foram recebidos corretamente
        if (data && Object.keys(data).length) {
          setProduct(data); // Define os dados do produto no estado

          // Busca todos os produtos e filtra por categoria do produto principal
          const responseAll = await fetch(
            `https://api.spartacusprimetobacco.com.br/api/produtos`
          );
          const allProducts = await responseAll.json();

          // Filtrar produtos da mesma categoria
          const similar = allProducts.filter(
            (item) =>
              item.categoriaPRODUTO === data.categoriaPRODUTO &&
              item.codigoPRODUTO !== data.codigoPRODUTO // Excluir o próprio produto atual
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
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product.imagemPRODUTO} // Verifica se a propriedade correta está sendo usada
              alt={product.nomePRODUTO}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-6 col-sm-12 py-5">
            <h4 className="text-uppercase text-muted">
              {product.categoriaPRODUTO}
            </h4>
            <h1 className="display-5">{product.nomePRODUTO}</h1>

            {/* Exibe as estrelas fixas e douradas */}
            <p className="lead">
              4.5 <i className="fa fa-star" style={{ color: "gold" }}></i>
              <i className="fa fa-star" style={{ color: "gold" }}></i>
              <i className="fa fa-star" style={{ color: "gold" }}></i>
              <i className="fa fa-star" style={{ color: "gold" }}></i>
              <i className="fa fa-star-half-alt" style={{ color: "gold" }}></i>
            </p>

            {/* Formata o preço para ter duas casas decimais */}
            <h3 className="display-6 my-4">
              R${parseFloat(product.precoPRODUTO).toFixed(2)}
            </h3>
            <p className="lead">{product.descricaoPRODUTO}</p>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Adicionar ao carrinho
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Ir para o carrinho
            </Link>
          </div>
        </div>
      </div>
      <SensationDescription />
    </>
  );

  const Loading2 = () => (
    <>
      <div className="my-4 py-4">
        <div className="d-flex">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const ShowSimilarProduct = () => (
    <>
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => (
              <div key={item.codigoPRODUTO} className="card mx-4 text-center">
                <img
                  className="card-img-top p-3"
                  src={item.imagemPRODUTO}
                  alt={item.nomePRODUTO}
                  height={300}
                  width={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {item.nomePRODUTO.substring(0, 15)}...
                  </h5>
                </div>
                <div className="card-body">
                  <Link
                    to={`/product/${item.codigoPRODUTO}`}
                    className="btn btn-dark m-1"
                  >
                    Comprar agora
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(item)}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum produto similar encontrado.</p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>Você também pode gostar</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
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
      </div>
      <Footer />
    </>
  );
};

export default Product;
