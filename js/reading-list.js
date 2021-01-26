//Request de GET a AJAX
const getTheJson = () => {
    $.ajax({
        url: "https://desafio-esp-js-default-rtdb.firebaseio.com/post/.json",
        method: "GET",
        success: data => {
            getReadingPost(data)
        },
        error: error => {
            console.log(error)
        },
    });
}


//Getting ReadingSave
const getReadingPost = (theJson) => {
    $.ajax({
        url: "https://desafio-esp-js-default-rtdb.firebaseio.com/readinglist/.json",
        method: "GET",
        success: data => {
            fillReadingTable(data,theJson)
            console.log(data)
        },
        error: "",
    });
}

const fillReadingTable = (savedPost,allPost) => {
    $(".container-reading").empty()
    let i = 10
    for(key2 in savedPost) {
        let thePost = savedPost[key2]
        let theObject = allPost[thePost]
        let { title, username, datetime, tags } = theObject
        tags = tags.split(",")
        let post = `
            <div class="imgh mb-4">
                <a href="/simonholdorf" datatestid="item-user" class="crayons-avatar crayons-avatar--l shrink-0"><img src="https://picsum.photos/id/${i}/200" alt="Simon Holdorf" class="crayons-avatar__image">
            </a>  
                <div class="postread  pl-4">
                    <div class="post1i mb-1 fs-l fw-bold break-word">${title}</div>
                    <p class="post2i">${username} - ${datetime} ${tags[0]} ${tags[1]} ${tags[2]}</p>
                </div>

                <div class="self.center">
                    <button id="archive-button" class="btn-archive crayons-btn crayons-btn--ghost crayons-btn--s" data-entry-key=${key2} >Archive</button>
                </div>

            </div>
                    `
        $(".container-reading").append(post)
        i++
    }
    addBtnListenerArchive()
}


//Listener para botones Archive
const addBtnListenerArchive = () => {
    let buttons = document.querySelectorAll(".btn-archive")
    console.log(buttons)
    buttons.forEach( button => {
        button.addEventListener("click", event => {
            console.log(event)
            console.log(event.target)
            console.log(event.target.dataset)
            console.log(event.target.dataset.entryKey)
        
            let entryKey = event.target.dataset.entryKey
            archivePost(entryKey)
        })
    })
}

/* DELETE */
const archivePost = entryKey => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //xhttp.responseText;
           let response = JSON.parse(xhttp.response);
           console.log(response)
           getReadingPost(theJson)
        }
    };
    xhttp.open("DELETE", `https://desafio-esp-js-default-rtdb.firebaseio.com/readinglist/${entryKey}/.json `,true);
    xhttp.send();
}
// document.getElementById("archive-button").addEventListener("click", archivePost )

getTheJson()