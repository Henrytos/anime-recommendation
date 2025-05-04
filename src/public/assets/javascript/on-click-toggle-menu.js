const buttonOpenMenu = document.getElementById("button_open_menu")
const buttonCloseMenu = document.getElementById("button_close_menu")

const sheetElement = document.getElementById("sheet")

const linksInSheet = document.querySelectorAll(".links .link")

buttonOpenMenu.addEventListener("click", () => {
    sheetElement.classList.add("sheet-active")
    activeLink()
})

buttonCloseMenu.addEventListener("click", () => {
    sheetElement.classList.remove("sheet-active")
    inactiveLink()
})

async function activeLink() {
    console.log(linksInSheet.length)
    for (let index = 0; index < linksInSheet.length; index++) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        linksInSheet[index].classList.add("link-active")
    }
}

async function inactiveLink() {
    console.log(linksInSheet.length)
    for (let index = 0; index < linksInSheet.length; index++) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        linksInSheet[index].classList.remove("link-active")
    }
}