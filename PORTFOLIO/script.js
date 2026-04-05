function toggleMenu() {
    document.getElementById("nav").classList.toggle("active");
}

// close menu when clicking links
document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("nav").classList.remove("active");
    });
});