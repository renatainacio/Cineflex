import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from 'axios'
import { useState } from "react";


export default function SeatsPage(props) {
    
    const [filme, setFilme] = useState({});
    const [assentos, setAssentos] = useState([]);
    const [weekday, setWeekday] = useState("");
    const {idSessao} = useParams();
    const navigate = useNavigate();
    const {sessao, setSessao, selecionados, setSelecionados, nome, setNome, cpf, setCpf} = props;

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        setSelecionados([]);
        setNome("");
        setCpf("");
        setSessao({});
        promise.then(answer => {
            setAssentos(answer.data.seats);
            setFilme(answer.data.movie);
            setSessao(answer.data);
            setWeekday(answer.data.day.weekday);
        });
    }
    ,[]);
  
    function clicarAssento(assento) {
        if (!assento.isAvailable)
            alert("Esse assento não está disponível");
        else if(!selecionados.includes(assento.id)) {
            const aux = [...selecionados, assento.id];
            console.log(aux);
            setSelecionados(aux);
        }
        else {
            const aux = selecionados.filter(numero => numero != assento.id);
            setSelecionados(aux);
        }
    }

    function reservar(event) {
        event.preventDefault();
        const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: selecionados,
            name: nome,
            cpf: cpf
        })

        promise.then(() => {
            navigate("/sucesso");
        });
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {assentos.map(assento =>
                    <SeatItem data-test="seat" key={assento.id} isAvailable={assento.isAvailable} isSelected={selecionados.includes(assento.id)} onClick={() => clicarAssento(assento)}>{assento.name}</SeatItem>
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle isSelected={true}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={true}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={false}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={reservar}>
                Nome do Comprador:
                   <input data-test="client-name" placeholder="Digite seu nome..." required value={nome} onChange={e => setNome(e.target.value)}/>

                   CPF do Comprador:
                   <input data-test="client-cpf" placeholder="Digite seu CPF..." required value={cpf} onChange={e => setCpf(e.target.value)}/>

                   <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                    <p>{weekday} - {sessao.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    border-color: ${props => props.isSelected ? "#0E7D71" : props.isAvailable ? "#808F9D" : "#F7C52B"};
    background-color: ${props => props.isSelected ? "#1AAE9E" : props.isAvailable ? "#C3CFD9" : "#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue;    
    border-color: ${props => props.isSelected ? "#0E7D71" : props.isAvailable ? "#808F9D" : "#F7C52B"};
    background-color: ${props => props.isSelected ? "#1AAE9E" : props.isAvailable ? "#C3CFD9" : "#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`