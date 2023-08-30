function OnLoad() {

}

function Unload() {
    localStorage.setItem("visited", "true")
}

window.addEventListener("unload", Unload)