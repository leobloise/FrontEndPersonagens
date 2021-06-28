import { Input, MenuItem, Button } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";
import { useEffect } from "react";
import './estilo.css';

export default function Buscador({insertResultado,especies, species, getAllStatus, status, getAllGenero, generos}) {

    const [filtros, setFiltros] = useState({especie: {
        valido: false},
        status: {
            valido: false
        },
        genero: {
            valido: false
        }
    });

    useEffect(() => {
        species();
        getAllStatus()
        getAllGenero();

        insertResultado([]) 
        
    }, []);

    function handleChangeSelect(event) {

        let {value} = event.target
        
        let exploded = value.split("_");
        
        const id = "selecionar_" + exploded[0];

        const sellects = [
            "selecionar_status",
            "selecionar_genero",
            "selecionar_especie"
        ]

        const formData = new FormData();

        formData.append(exploded[0], exploded[1]);

        const request = new Request('http://localhost:5000/filtrar', {
            method:"POST",
            body: formData
        })

        fetch(request)
        .then(res => {
            res.json()
            .then(response => {
                console.log(response)
                insertResultado(response)})
        })

        let newFiltro = filtros

        newFiltro[exploded[0]]['valido'] = true; 
        newFiltro[exploded[0]]['content'] = exploded[1];

        setFiltros(newFiltro);

    }

    function handleSearchName(event) {
 
        event.preventDefault();

        let valor = document.querySelector("#buscador_input").value;

        if(valor.length < 3)
            return;
        
        const formData = new FormData();

        formData.append('nome', valor);

        const request = new Request('http://localhost:5000/buscar', {
            method:"POST",
            body: formData
        })

        fetch(request)
        .then(res => {
            res.json()
            .then(response => {
                console.log(response)
                if(response) {
                    insertResultado([response]);
                    return;
                }

                alert('Não há ninguém com esse nome')
            })
        })

    }

    return(
        <form className="buscador_form">
            <div>
                <label htmlFor="buscador_input"> Buscar nome: </label>
                <Input id='buscador_input' placeholder="Nome da pessoa..." type="text"></Input>
                <SearchIcon onClick={handleSearchName}  className="buscar"></SearchIcon>
            </div>
            <div>
            <label htmlFor="selecionar_especie"> Selecionar Especie: </label>
                <Select id="selecionar_especie" onChange={handleChangeSelect}>
                    {
                        especies.map((especie, index) => <MenuItem key={index} value={`especie_${especie}`}>{especie}</MenuItem>)
                    }
                </Select>
            </div>
            <div>
                <label htmlFor="selecionar_status"> Selecionar Status: </label>
                    <Select id="selecionar_status" onChange={handleChangeSelect}>
                        {
                            status.map((status, index) => {
                                return <MenuItem key={index} value={`status_${status}`}>{status}</MenuItem>})
                        }
                    </Select>
            </div>
            <div>
                <label htmlFor="selecionar_genero"> Selecionar Genero: </label>
                    <Select id="selecionar_genero" onChange={handleChangeSelect}>
                        {
                            generos.map((genero, index) => {
                                return <MenuItem key={index} value={`genero_${genero}`}>{genero}</MenuItem>})
                        }
                    </Select>
            </div>
        </form>
    );

}