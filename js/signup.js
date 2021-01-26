let newUser = {}
let endpoint = "http://127.0.0.1:8080/auth/signup"

//--------Funciones para agregar un nuevo Post------------
//Listener de Inputs del Formulario
$("input").change(event => {
  let property = event.target.name
  let value = event.target.value
  newUser[property] = value
  console.log(newUser)
})

//Listener de Boton Publicar
$(".btn-signup").click(() => {
  postAjax(newUser)
  newUser = {}
})


//Request de POST  
const postAjax = (theEntry) => {
  $.ajax({
    url: "http://127.0.0.1:8080",
    headers:  {'Access-Control-Allow-Origin': '*'},
    method: "GET",
    // data: JSON.stringify(theEntry),
    success: data => {
      console.log(data)
    },
    error: "",
  });
}