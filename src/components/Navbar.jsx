import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Navbar = ({ setFilteredProducts }) => {
    const state = useSelector(state => state.handleCart);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://api.spartacusprimetobacco.com.br/api/produtos');
                const products = await response.json();
                setAllProducts(products);
            } catch (error) {
                console.error('Erro ao buscar produtos', error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            const filteredSuggestions = allProducts
                .filter(product => product.nomePRODUTO.toLowerCase().includes(value.toLowerCase()))
                .map(product => product.nomePRODUTO);
            
            setSuggestions(filteredSuggestions);

            const filteredProducts = allProducts.filter(product => 
                product.nomePRODUTO.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filteredProducts);
        } else {
            setSuggestions([]);
            setFilteredProducts(allProducts);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Sistema Spartacus</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Produtos</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/offers">Ofertas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>  */}
                    </ul>
                    
                    <SearchContainer>
                        <SearchBarWrapper>
                            <SearchIcon className="fa fa-search" />
                            <SearchInput 
                                type="text" 
                                placeholder="Buscar" 
                                value={searchTerm} 
                                onChange={handleSearchChange}
                            />
                        </SearchBarWrapper>
                        {suggestions.length > 0 && (
                            <SuggestionsList>
                                {suggestions.map((suggestion, index) => (
                                    <SuggestionItem key={index}>{suggestion}</SuggestionItem>
                                ))}
                            </SuggestionsList>
                        )}
                    </SearchContainer>

                    <IconContainer>
                        <StyledIconWrapper>
                            <NavLink to="/profile">
                                <i className="fa fa-user" style={{ color: "#888" }}></i>
                            </NavLink>
                        </StyledIconWrapper>
                        <StyledIconWrapper>
                            <NavLink to="/cart">
                                <CartIconContainer>
                                    <i className="fa fa-cart-shopping" style={{ color: "#888" }}></i>
                                    <CartBadge>({state.length})</CartBadge>
                                </CartIconContainer>
                            </NavLink>
                        </StyledIconWrapper>
                    </IconContainer>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

/* Styled Components */
const SearchContainer = styled.div`
  position: relative;
  max-width: 300px;
  width: 100%;
  margin-right: 20px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 8px 15px;
  border-radius: 20px;
  width: 100%;
`;

const SearchIcon = styled.i`
  font-size: 18px;
  color: #888;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #555;
  width: 100%;
  ::placeholder {
    color: #888;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  color: #555;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIconWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  margin-left: 15px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  color: #888;

  &:hover {
    color: #333;
  }
`;

const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CartBadge = styled.span`
  font-size: 12px;
  margin-left: 5px;
  color: #555;
  vertical-align: middle;
`;
