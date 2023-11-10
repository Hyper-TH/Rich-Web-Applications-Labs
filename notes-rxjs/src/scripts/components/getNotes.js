function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}