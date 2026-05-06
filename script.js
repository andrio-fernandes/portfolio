// Toggle mobile menu
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// Close menu when clicking links
document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("active");
  });
});

console.log("JS is running");

// Base API URL
const API = "https://portfolio-backend-qs1z.onrender.com";

// ==========================
// LOAD PROJECTS FROM BACKEND
// ==========================
fetch(`${API}/projects`)
  .then(res => res.json())
  .then(data => {
    console.log("DATA:", data);

    const container = document.querySelector(".projects-grid");

    if (!container) {
      console.error("Projects container not found");
      return;
    }

    // Empty state
    if (data.length === 0) {
      container.innerHTML = "<p>No projects yet</p>";
      return;
    }

    container.innerHTML = "";

    data.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("card", "glass");

      card.innerHTML = `
  <h3>${p.title}</h3>
  <p>${p.desc}</p>

  <div class="project-buttons">
    <a href="${p.live}" target="_blank" class="pro-btn">Live Demo</a>
<a href="${p.code}" target="_blank" class="pro-btn">View Code</a>
  </div>
`;
      container.appendChild(card);
    });
  })
  .catch(err => console.log("ERROR loading projects:", err));


// ==========================
// PROJECT FORM (ADD PROJECT)
// ==========================
const projectForm = document.getElementById("projectForm");

if (projectForm) {
  projectForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("desc").value.trim();
    const live = document.getElementById("live").value.trim();
    const code = document.getElementById("code").value.trim();

    // Validation
    if (title.length < 3 || desc.length < 5) {
      alert("Enter valid project details");
      return;
    }

    if (!live || !code) {
      alert("Add both Live Demo and Code links");
      return;
    }

    const data = { title, desc, live, code };

    fetch(`${API}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        alert("Project added!");
        projectForm.reset(); // better than reload
        location.reload();  // optional, you can remove later
      })
      .catch(err => console.log("ERROR adding project:", err));
  });
}
// ==========================
// CONTACT FORM SUBMISSION
// ==========================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2 || message.length < 5) {
      alert("Please enter valid details");
      return;
    }

    const data = { name, email, message };

    fetch(`${API}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        const msg = document.getElementById("formMsg");
        if (msg) msg.innerText = "Message sent successfully!";
        contactForm.reset();
      })
      .catch(err => {
        console.log("ERROR sending message:", err);
        const msg = document.getElementById("formMsg");
        if (msg) msg.innerText = "Something went wrong.";
      });

  });
}
