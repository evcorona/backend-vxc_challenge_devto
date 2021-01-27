let endpointPostData = "http://127.0.0.1:8080/posts"
let containerPost = ".container-cards"
let allPost = {}
let filterActivated = false

//LocalStorage
let jwt = localStorage.getItem("jwt") 

const btns = 
        ` <!-- Botones cuando user esta loggeado -->
        <div class="d-flex flex-row navbtns-logged">
            <a href="/pages/write-post.html">
                <button type="button"
                    class="btn btn-primary shadow-none font-weight-bold mx-2 text-nowrap d-none d-md-block ml-lg-5">Write
                    a
                    post</button>
            </a>
            <a class="navbar-brand rounded-circle top-icons p-1 d-flex align-items-center" href="#">
                <img src="/images/nav/post-icon.png" class="rounded-circle" alt="Connect" loading="lazy">
            </a>
            <a class="navbar-brand rounded-circle top-icons p-1 d-flex align-items-center" href="#">
                <img src="/images/nav/notification-icon.png" class="rounded-circle" alt="Notifications"
                    loading="lazy">
            </a>
            <div class="navbar-brand rounded-circle top-icons p-1 d-flex align-items-center dropdown">
                <img src="/images/nav/perfil-icon.png" class="rounded-circle" alt="Perfil" loading="lazy">
                <div class="dropdown-content rounded position-absolute">
                    <a class="dropdown-item username" href="#">username</a>
                    <a href="dropdown-item"><small class="usernameA text-muted ml-4">@username</small></a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Dashboard</a>
                    <a class="dropdown-item" href="#">Write a Post</a>
                    <a class="dropdown-item" href="#">Reading list</a>
                    <a class="dropdown-item" href="#">Settings</a>
                    <a class="dropdown-item" href="#">Key Links</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item signout" href="#">Sign Out</a>
                </div>
            </div>
        </div>
        <!-- FIN Botones cuando user esta loggeado -->'
        `
if(jwt){
    localStorage.setItem("usr",JSON.parse(atob(jwt.split(".")[1])).username)
    $(".btns-user").html(btns)
    $(".username").text(localStorage.getItem("usr"))
    $(".usernameA").text("@"+localStorage.getItem("usr"))
    $(".signout").click( event => {
        localStorage.clear()
        location.reload()
    })
}


//--------------------------------------------INICIO DE FUNCIONALIDAD DE FILTROS SEARCH Y DATE--------------------------------------------
//Listener filtros de Barra Fechas
$(".filters li").click(event => {
    filterActivated = true
    let filter = $(event.target).text()
    let today = new Date()
    let minDate = 0
    switch (filter) {
        case "Week":
            minDate = today - 518400000
            break
        case "Month":
            minDate = today - 2592000000
            break
        case "Year":
            minDate = today - 31622400000
            break
        case "Infinity":
            filterActivated = false
            break
        case "Feed":
            filterActivated = false
            break
    }
    getTheJson(filter, minDate)
})

//Listener filtros de Barra Fechas en desplegable
$(".filters select").change(event => {
    filterActivated = true
    let filter = event.target.value
    let today = new Date()
    let minDate = 0
    switch (filter) {
        case "Week":
            minDate = today - 518400000
            break
        case "Month":
            minDate = today - 2592000000
            break
        case "Year":
            minDate = today - 31622400000
            break
        case "Infinity":
            filterActivated = false
            break
        case "Feed":
            filterActivated = false
            break
    }
    getTheJson(filter, minDate)
})

//Listener Search
$(".input-search").change(event => {
    let stringToFilter = event.target.value
    stringToFilter === "" ? filterActivated = false : filterActivated = true
    getTheJson("search", stringToFilter)
})

//Request de GET a AJAX
const getTheJson = (origin, criteria) => {
    $.ajax({
        url: endpointPostData,
        method: "GET",
        headers: {"Authorization": jwt},
        dataType: "json",
        success: data => {
            allPost = data.data.reverse()
            gettingToCriteria(allPost, origin, criteria)
        },
        error: error => {
            console.log(error)
        },
    });
}

//Manejo del Json obtenido dependiendo del criterio por filtro
const gettingToCriteria = (theJson, filter, criteria) => {
    let i = 0
    filter === "scroll" ? i = 1 : $(containerPost).empty()
    let flag = true
    for (key in theJson) {
        let object = theJson[key]
        let { title, datetime } = object
        let dateToCheck = new Date(datetime)
        console.log("datetime",datetime,"datetoCheck",dateToCheck,"criteria",criteria)
        if (filter === "search" || filter === "main" || filter === "scroll") {
            if (title.includes(criteria)) {
                fillDataToCards(object, i, filter)
                i++
            }
        }
        else {
            if (dateToCheck >= criteria && flag === true) {
                fillDataToCards(object, i)
                i++
                filter === "Latest" && i === 10 ? flag = false : flag = true
            }
        }
    }
    $(containerPost).html() === "" ? $(containerPost).html(`<p class="p-3 font-weight-bold w-100">No results match that query.</p>`) : addBtnListener()
}

//Llenado de Cards
const fillDataToCards = (object, i, filter) => {
    let { title, username, datetime, tags, URL } = object
    tags = tags.split(",")
    let firstPost = `
            <div class="class">
                <img class="img-fluid img-post" data-entry-key=${key} data-toggle="modal" data-target="#thePost" src="${URL}" alt=""/>
            </div>`
    i === 0 && filter != "scroll" ? firstPost : firstPost = ""
    let newCard = `
            <section class="card rounded main-noticia mt-2">
                ${firstPost}
                <!-- aqui termina la imagen principal -->
                <!-- aqui empieza el usuario e imagen de usuario, nombre y fecha -->
                <div class="container bg-white">
                    <div class="row">
                        <div class="col mt-3 mb-1">
                            <a class="htext hover d-flex">
                                <img class="imag-user3 img-fluid rounded-circle ml-2" src="https://picsum.photos/id/${i}/200/" alt="" />
                                <div class="etimain mb-1 ml-2">
                                    <h6 class="eti4 mb-0">${username}</h6>
                                    <span class="eti3">${datetime}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- aqui termina el usuario e imagen de usuario, nombre y fecha -->
                    <!-- aqui empieza la parte media card principal -->
                    <div class="row">
                        <div class="container">
                            <div class="row">
                                <div class="col mb-3">
                                    <a class="etimain hover d-flex">
                                        <div class=" mb-1">
                                            <h2 class="eti44 margn1 title-post" data-entry-key=${key} data-toggle="modal" data-target="#thePost">${title}</h2>
                                        </div>
                                    </a>
                                    <div class="etimain margn1">
                                        <a class="eti1 pr-2 rounded mr-1" href="#">${tags[0]}</a>
                                        <a class="eti2 pr-2 rounded mr-1" href="#">${tags[1]}</a>
                                        <a class="eti3 pr-2 rounded" href="#">${tags[2]}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- aqui termina la parte media card principal -->
                    <!-- aqui empieza el footer card principal -->
                    <div class="container">
                        <div class="row">
                            <div class="container botonesm1 d-flex mr-4 mb-3">
                                <div class="col-6 p-0">
                                    <button type="button" class="boton1 btn btn-light m-0" onclick="addLike(${i})"> <span data-index="${i}">0</span>
                                    <i class="far fa-heart"></i> </button>
                                    <button type="button" class="boton2 btn btn-light m-0" onclick="addLike2(${i})"> <span data-index="${i}">0</span>
                                    <i class="far fa-comment"></i> </button>
                                </div>
                                <div class="col-6 d-flex justify-content-end ml-5 ">
                                    <div>
                                        <span class="h6i mr-2" id="minutes" >15 min read</span>
                                    </div>
                                    <button type="button"
                                        class="botonsave btn btn-outline-secondary" data-entry-key=${key}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `
    $(containerPost).append(newCard)
}
//--------------------------------------------FIN DE FUNCIONALIDAD DE FILTROS SEARCH Y DATE--------------------------------------------

const addBtnListener = () => {
    addBtnListenerCards()
    $(".botonsave").click(event => {
        let entryKey = $(event.target).data("entry-key")
        $.ajax({
            url: "https://desafio-esp-js-default-rtdb.firebaseio.com/readinglist/.json",
            method: "POST",
            data: JSON.stringify(entryKey),
            success: data => {
                console.log(data)
            },
            error: "",
        });
    })
}

//--------------------------------------------INICIO FUNCIONALIDAD DE HTML POR POST--------------------------------------------
//Listener del card seleccionado
//Listener para las cards
const addBtnListenerCards = () => {
    $(".img-post, .title-post").click(event => {
        let entryKey = $(event.target).data("entry-key")
        let theObject = allPost[entryKey]
        let { title, username, datetime, tags, URL, content } = theObject
        tags = tags.split(",")
        $("#thePost .h1-post").text(title)
        $("#thePost .modal-body .img-post").attr({ src: URL })
        $("#thePost .modal-body .author").text(username)
        $("#thePost .modal-body .date").text(datetime)
        $("#thePost .modal-body .text-post").text(content)
        $("#thePost .modal-body .tag1").text(tags[0])
        $("#thePost .modal-body .tag2").text(tags[1])
        $("#thePost .modal-body .tag3").text(tags[2])
        $("#thePost").modal("show")
    })
}
//--------------------------------------------FIN FUNCIONALIDAD DE HTML POR POST--------------------------------------------

//--------------------------------------------INICIO FUNCIONALIDAD SCROLL INFINITO--------------------------------------------
//Listener del scroll
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height() && filterActivated === false) {
        getTheJson("scroll", "")
    }
})
//--------------------------------------------FIN FUNCIONALIDAD SCROLL INFINITO--------------------------------------------


////--------------------------------------------INSTRUCCIONES INICIALES--------------------------------------------
getTheJson("main", "")

const addLike = (index) => {

    let spans = $(".boton1 > span")

    for (span of spans) {
        spanIndex = $(span).data("index")

        if (spanIndex === index) {
            let valorActual = parseInt($(span).html())
            let nuevoValor = valorActual + 1
            $(span).html(nuevoValor)
        }
    }
}

const addLike2 = (index) => {

    let spans = $(".boton2 > span")

    for (span of spans) {
        spanIndex = $(span).data("index")

        if (spanIndex === index) {
            let valorActual = parseInt($(span).html())
            let nuevoValor = valorActual + 1
            $(span).html(nuevoValor)
        }
    }

}