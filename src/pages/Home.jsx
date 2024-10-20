import React, { useState } from 'react';
import { Navbar, Main, Product, Footer } from '../components';
import Banner from '../components/Banner';
import Slider from 'react-slick';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap'; // Se estiver usando Bootstrap
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImportantNotices from '../components/ImportantNotices';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authToken') !== null
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Controle do modal de registro
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Configurações para o carrossel do react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Função de login
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, preencha todos os campos!',
      });
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: email,
      senha: password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.spartacusprimetobacco.com.br/api/usuarios/login', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          Swal.fire({
            icon: 'success',
            title: 'Login bem-sucedido',
            text: 'Redirecionando para a página inicial...',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            localStorage.setItem('authToken', result.token);
            setIsAuthenticated(true); // Marca o usuário como autenticado
            navigate('/'); // Redireciona para a página inicial
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro no login',
            text: 'Credenciais incorretas. Tente novamente!',
          });
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro no servidor',
          text: 'Houve um erro ao se conectar ao servidor. Tente novamente mais tarde.',
        });
      });
  };

  // Função de registro
  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      localizacao: 'São Paulo', // Dados fictícios
      documento: '12345678900',
      telefone: '(11) 98765-4321',
      telegram: '@usuario01',
      nascimento: '1995-01-01T00:00:00.000Z',
      status: 1,
      ativo: true,
      tipo: 1,
      nivel: 5,
      log: '2023-12-31T23:59:59.000Z',
      criado: '2024-01-01T00:00:00.000Z',
    };

    try {
      const response = await axios.post(
        'https://api.spartacusprimetobacco.com.br/api/usuarios/criar',
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      alert('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o usuário:', error);
      alert('Erro ao criar o usuário.');
    } finally {
      setIsSubmitting(false);
      setShowRegisterModal(false); // Fechar modal após o envio
    }
  };

  // Renderiza a tela de login se o usuário não estiver autenticado
  if (!isAuthenticated) {
    return (
      <LoginContainer>
        {/* Logo */}
        <Logo src="/assets/logo.png" alt="Logo" />

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>

        {/* Link de registro */}
        <RegisterLink>
          Novo aqui?{' '}
          <button onClick={() => setShowRegisterModal(true)}>Registrar</button>
        </RegisterLink>

        {/* Modal de registro */}
        <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalBody>
              <InputWrapper>
                <input
                  type="text"
                  id="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleRegisterChange}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleRegisterChange}
                />
              </InputWrapper>
              <FullWidthInput
                type="password"
                id="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleRegisterChange}
              />
              <RegisterButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Registrar'}
              </RegisterButton>
            </ModalBody>
          </Modal.Body>
        </Modal>
      </LoginContainer>
    );
  }

  // Renderiza a página principal após o login
  return (
    <>
      <Navbar />
      <Main />
      <Product />

      {/* Exibe os banners lado a lado no desktop */}
      <BannerContainer>
        <DesktopBanners>
          <Banner />
          <Banner />
        </DesktopBanners>

        {/* No mobile, exibe os banners em um carrossel */}
        <MobileBanners>
          <Slider {...settings}>
            <Banner />
            <Banner />
          </Slider>
        </MobileBanners>
      </BannerContainer>

      <ImportantNotices />
      <Footer />
    </>
  );
}

export default Home;

/* Styled Components */
const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

const DesktopBanners = styled.div`
  display: flex;
  gap: 35px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileBanners = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 90%;
    margin-right: 25px;
    margin-left: 25px;
    gap: 10px;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;

    input {
      margin-bottom: 10px;
      padding: 12px;
      font-size: 1rem;
      border-radius: 5px;
      border: 1px solid #ddd;
      width: 100%;
    }

    button {
      padding: 12px;
      font-size: 1rem;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }

    form {
      width: 100%;

      input {
        font-size: 0.9rem;
      }

      button {
        font-size: 0.9rem;
      }
    }
  }
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const RegisterLink = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;

  button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  input {
    flex: 1;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1rem;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const FullWidthInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 1.1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 15px;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;
