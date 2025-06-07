import { auth } from "./authenticate.js"



async function renderComments(animeId) {
    const response = await fetch(`/comments/${animeId}`)
    const data = await response.json()

    const comments = data.comments


    let commentsContent = ''

    for (let position = 0; position < comments.length; position++) {
        let comment = comments[position]

        commentsContent += `
        <div class="comment">
            <img src="./assets/uploads/${comment.avatar_url}"
                alt="" class="profile-comment">
            <div class="details-comment">
                <div class="top">
                    <h3>
                    ${comment.username}
                    </h3>
                    <p>
                        ${comment.time_relative}
                    </p>
                </div>
                <p>
                    ${comment.description}
                </p>
            </div>
        </div>
    `
    }


    div_comments.innerHTML = commentsContent
}

function cleanComment() {
    document.getElementById("comment-content").value = ""
}

function registerComment() {
    const url = new URL(window.location.href)
    const animeId = url.searchParams.get("animeId")
    const comment = document.getElementById("comment-content").value
    const userId = sessionStorage.user_id


    if (comment == "") {
        alert("preencha o comentario!!")
        return
    }



    fetch("/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: comment,
            animeId,
            userId
        })
    }).then(() => {
        cleanComment()
        renderComments(animeId)

    })

    const { avatarUrl, username } = auth()

    const contents = String(div_comments.innerHTML)
    if (contents.includes('not-found')) {
        div_comments.innerHTML = `
         <div class="comment">
            <img src="./assets/uploads/${avatarUrl}" alt="" class="profile-comment">
            <div class="details-comment">
                <div class="top">
                    <h3>
                        ${username}
                    </h3>
                    <p>
                        0 segundo atrás
                    </p>
                </div>
                <p>
                ${comment}
                </p>
            </div>
        </div>
        `
        return
    }
    const newComment = `
        <div class="comment">
            <img src="./assets/uploads/${avatarUrl}" alt="" class="profile-comment">
            <div class="details-comment">
                <div class="top">
                    <h3>
                        ${username}
                    </h3>
                    <p>
                        0 segundo atrás
                    </p>
                </div>
                <p>
                ${comment}
                </p>
            </div>
        </div>
    `
    div_comments.innerHTML = newComment.concat(contents)

}

const buttonAddComment = document.getElementById("button_add_comment")
buttonAddComment.addEventListener("click", registerComment)

const buttonClearComment = document.getElementById("button_clear_comment")
buttonClearComment.addEventListener("click", cleanComment)
