
const links = document.querySelectorAll(".links .link a")


links.forEach((link) => {
    link.addEventListener("click", (ev) => {
        closeSheet(ev)
    })
})

function closeSheet() {
    sheetElement.classList.remove("sheet-active")
}