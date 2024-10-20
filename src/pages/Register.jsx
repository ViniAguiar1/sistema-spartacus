import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const dataToSend = {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            localizacao: "São Paulo", // Dados fictícios de exemplo
            documento: "12345678900",
            telefone: "(11) 98765-4321",
            telegram: "@usuario01",
            nascimento: "1995-01-01T00:00:00.000Z",
            status: 1,
            ativo: true,
            tipo: 1,
            nivel: 5,
            log: "2023-12-31T23:59:59.000Z",
            criado: "2024-01-01T00:00:00.000Z",
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
            console.log(response.data); // Pode fazer algo após o sucesso
            alert('Usuário criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar o usuário:', error);
            alert('Erro ao criar o usuário.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Cadastrar-se</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="nome">Nome Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    placeholder="Digite seu nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="email">Endereço de e-mail</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="senha">Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="senha"
                                    placeholder="Password"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <p>Já possui uma conta? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar-se'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
