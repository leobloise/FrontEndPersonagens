import Personagem from "./Personagem.jsx";
import './estilo.css';

export default function PersonagensLista(prop) {

    const {personagens, attEspecies, attPersonagens} = prop;

    return(
        <ul>
            {personagens.map((personagem, index) => {
            return <Personagem attPersonagens={attPersonagens} attEspecies={attEspecies} key={index} index={index+1}personagem={personagem}></Personagem>})}
        </ul>
    );


}