
const links = document.querySelectorAll(".links .link a")


links.forEach((link) => {
    link.addEventListener("click", (ev) => {
        closeSheet(ev)
    })
})

function closeSheet(ev) {
    ev.target.preventDefault()
    sheetElement.classList.remove("sheet-active")
}