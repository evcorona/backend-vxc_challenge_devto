//------------------------------------------Codigo para Write-Post------------------------------------------------
let newPost = {}
let endpointPostData = "http://127.0.0.1:8080/posts"

//--------Funciones para agregar un nuevo Post------------
//Listener de Inputs del Formulario
$("input, select, textarea").keyup(event => {
    let property = event.target.name
    let value = event.target.value
    newPost[property] = value
    console.log(newPost)
})

//Listener de Boton Publicar
$(".btn-publish").click(() => {
    newPost = { 
        title: "CSS Tips and Tricks", 
        username: "verox", 
        date:  new Date(),
        tags: "watercooler,css,beginners,webdev", 
        content: "#001↵↵For the last couple of months, we at Skynox …ust one line in your CSS can help you achieve it.", 
        URL: "https://res.cloudinary.com/practicaldev/image/fetc…loads.s3.amazonaws.com/i/map4odd0j77wzg18vls9.png", 
    }
    console.log(newPost)
    postAjax(newPost)
})

//Request de POST  
const postAjax = (theEntry) => {
    $.ajax({
        url: endpointPostData,
        headers: {"Content-Type":"application/json"},
        method: "POST",
        data: JSON.stringify(theEntry),
        dataType: "json",
        success: data => {
            console.log(data)
        },
        error: error => {
            console.log(error)
        },
    });
}

//--------Funciones para mostrar el Preview------------
//Llenado de datos en el Preview
const fillPreviewData = () => {
    let { title, username, date, tags, content, URL } = newPost
    $(".preview h1").text(title)
    $(".preview .p-user").text(username)
    $(".preview .p-date").text(date)
    $(".preview .p-tags").text(tags)
    $(".preview .p-post").text(content)
    $(".preview img").attr("src", URL)
}

//Listener de Boton Preview
$(".btn-preview").click(() => {
    $(".form-view").hide()
    $(".preview").show()
    fillPreviewData()
})

//Listener de Boton Edit
$(".btn-edit").click(() => {
    $(".form-view").show()
    $(".preview").hide()
})
//------------------------------------------Fin del Codigo para Write-Post------------------------------------------------