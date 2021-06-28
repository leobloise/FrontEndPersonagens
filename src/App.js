import Formulario from "./components/Formulario.jsx";
import PersonagensLista from "./components/Personagem/PersonagensLista.jsx";
import Buscador from "./components/Buscador/Buscador.jsx";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  
  const [personagens, setPersonagens] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [genero, setGenero] = useState([]);
  const [status, setStatus] = useState([])
  const [populado, setPopulado] = useState(false);

  function attPersonagens() {
    const requestObject = new Request('http://localhost:5000/list', {
            method: "GET"
        });
    
        fetch(requestObject)
        .then(response => {
            response.json()
            .then(res => {
                setPersonagens(res.msg)
            })
        })
  }

  function getAllGenero() {
    const requestObject = new Request('http://localhost:5000/genero', {
      method: "GET"
    });

    fetch(requestObject)
        .then(response => {
            response.json()
            .then(res => {

              console.log(res)

               let generoarr = []

                for(let genero of res['msg']) {
                    const generoAtual = genero.genero;
                    generoarr.push(generoAtual)
                }

                generoarr = new Set(generoarr);

              setGenero(Array.from(generoarr));
            
            })
        })
  }

  function getAllStatus() {

    const requestObject = new Request('http://localhost:5000/status', {
      method: "GET"
    });

    fetch(requestObject)
        .then(response => {
            response.json()
            .then(res => {

              console.log(res)

               let statusarr = []

                for(let status of res['msg']) {
                    const statusAtual = status.status;
                    statusarr.push(statusAtual)
                }

                statusarr = new Set(statusarr);

              setStatus(Array.from(statusarr));
            
            })
        })
  }

  function populate() {
    const requestObject = new Request('http://localhost:5000/populate', {
      method: "GET"
    });

    fetch(requestObject)
    .then(res => {
      setPopulado(true);
      alert('Banco populado com sucesso')
    })
    .catch(err => {
      alert('Banco já populado')
      setPopulado(true)
    })
  }

  function getAllSpecies() {

    const requestObject = new Request('http://localhost:5000/especies', {
      method: "GET"
    });

    fetch(requestObject)
        .then(response => {
            response.json()
            .then(res => {

               let especies = []

                for(let especie of res['msg']) {
                    const especieActual = especie.especie;
                    especies.push(especieActual)
                }

              especies = new Set(especies);

              setEspecies(Array.from(especies));
            
            })
        })

  }

  return (
    <Router>
      <nav className="floatingmenu">
        <ul>
        <li><Link to="/"> Registrar </Link></li>
        <li><Link to="/buscar"> Buscar</Link></li>
        {
          populado?"":<li><span onClick={populate}>Popular</span></li>
        }
        </ul>
      </nav>
      <Switch>
        <>
         <PersonagensLista attPersonagens={attPersonagens} attEspecies={getAllSpecies} personagens={personagens}></PersonagensLista>
          <Route exact path="/">
            <Formulario attEspecies={getAllSpecies} att={attPersonagens}></Formulario> 
          </Route>
          <Route exact path="/buscar">
            <Buscador getAllGenero={getAllGenero} generos={genero} getAllStatus={getAllStatus} status={status} species={getAllSpecies}insertResultado={setPersonagens} especies={especies}></Buscador>
          </Route>  
        </>
      </Switch>
    </Router>
  );
 
}

export default App;
