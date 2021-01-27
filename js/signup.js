let theUser = {}
let endpoint = "http://127.0.0.1:8080/auth/signup"

//--------Funciones para agregar un nuevo Post------------
//Listener de Inputs del Formulario
$("input").keyup(event => {
  let property = event.target.name
  let value = event.target.value
  theUser[property] = value
  console.log(theUser)
})

//Listener de Boton Publicar
$(".btn-signup").click(() => {
  postAjax(theUser)
})


//Request de POST  
const postAjax = (theEntry) => {
  $.ajax({
    url: endpoint,
    headers: { "Content-Type": "application/json" },
    method: "POST",
    data: JSON.stringify(theEntry),
    dataType: "json",
    success: data => {
      console.log(data)
      $(location).attr('href',"login.html");
    },
    error: error => {
      console.log(error)
    }
  });
}