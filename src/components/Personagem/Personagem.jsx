import { useEffect } from "react";
import './estilo.css';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Personagem(props) {

    const {nome, especie, status, genero} = props.personagem;

    useEffect(() => {
        
        const formData = new FormData();

        formData.append("imagetosearch", nome)

        const request = {
            method:"POST",
            body: formData
          }
      
        const requestObject = new Request('http://localhost:5000/image', request);
      
        fetch(requestObject)
        .then(response => {
            response.blob()
            .then(blob => {
                let urlCreator = window.URL || window.webkitURL;
                let imageUrl = urlCreator.createObjectURL(blob);
                document.querySelector(`.imagem__${props.index}`).src = imageUrl;
            })
        })

    }, []);

    function deletar(event) {

        event.preventDefault();

        const formData = new FormData();

        formData.append("nome", nome)

        const request = {
            method:"POST",
            body: formData
          }
      
        const requestObject = new Request('http://localhost:5000/delete', request);
      
        fetch(requestObject)
        .then(res => {
            res.json()
            .then((response) => {
                alert(response.msg)
                props.attEspecies();
                props.attPersonagens();
            })
        })

        

    }

    return (
        <li>
            <img className={`imagem__${props.index}`}  alt={`Imagem do ${nome}`}/>
            <span><b>Nome:</b> {nome}</span>
            <span><b>Status:</b> {status}</span>
            <span><b>Espécie:</b> {especie}</span>
            <span><b>Gênero:</b> {genero}</span>
            <DeleteIcon className="deleteIcon" onClick={deletar}></DeleteIcon>
        </li>
    );


}