import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState } from "react";

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'BtXNJoiFoeQE4oiiOTK7wiYj';

    const [sessao, setSessao] = useState({});
    const [selecionados, setSelecionados] = useState([]);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [page, setPage] = useState("home");
    const navigate = useNavigate();

    return (
        <div>
           <NavContainer>
                {page === "home" ? "" : <img data-test="go-home-header-btn" src="https://cdn-icons-png.flaticon.com/512/93/93634.png" onClick={() => navigate(-1)}/>}
                <h1>CINEFLEX</h1>
            </NavContainer>
            <Routes>
                <Route path="/" element={<HomePage setPage={setPage}/>}/>
                <Route path="/sessoes/:idFilme" element={<SessionsPage setPage={setPage}/>}/>
                <Route path="/assentos/:idSessao" element={<SeatsPage setPage={setPage} sessao={sessao} setSessao={setSessao} selecionados={selecionados} setSelecionados={setSelecionados} nome={nome} setNome={setNome} cpf={cpf} setCpf={setCpf}/>}/>
                <Route path="/sucesso" element={<SuccessPage setPage={setPage} sessao={sessao} selecionados={selecionados} nome={nome} cpf={cpf}/>}/>
            </Routes>
        </div>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
    h1 {
        margin: auto 150px;
    }
    img {
        width: 25px;
    }
`