import { TextField, Input } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function Formulario(props) {

    function handleSubmit(event) {

        event.preventDefault();

        const formData = new FormData(document.querySelector('.formulario'));
    
        if(formData.get('especie') === "Humanoid" && !formData.get('status')) {
          alert("Você deve preencher o status");
          return;
        }

        const request = {
          method:"POST",
          body: formData
        }
    
        const requestObject = new Request('http://localhost:5000/', request);
    
        fetch(requestObject)
        .then(res => {
          res.json()
          .then(response => {
            console.log(response)
            props.attEspecies();
            alert(response.msg);
          })
          .catch(error => {
              console.error(error)
              alert("Não foi possível criar o personagem devido a um erro interno")
          })
        })
    
      }
    
      function handleBlur(event) {
        const textfieldspecies = document.getElementsByName('especie')[0];
        const textfieldstatus = document.getElementsByName('status')[0]

        if(textfieldspecies.value === "Humanoid" && !textfieldstatus.value) {
          alert("Você deve preencher o status obrigatoriamente")
        } 
      }

      return (
        <div className="App">
          <label htmlFor="arrow"> Buscar todos os existentes </label>
          <ArrowUpwardIcon  id="arrow" onClick={props.att}></ArrowUpwardIcon>
          <form className="formulario" onSubmit={handleSubmit}>
          <TextField name="nome" required label="Nome" variant="filled" />
          <TextField name="especie" onBlur={handleBlur} required label="Espécie" variant="filled" />
          <TextField name="status" label="Status" variant="filled" />
          <TextField name="genero" label="Genero" variant="filled" />
          <Input required name="imagem" type="file" color="primary" disableUnderline={true}></Input>
          <Input type="submit" value="Enviar" />
        </form>
        </div>
      );

}