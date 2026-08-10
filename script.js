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

// PROJECTS DATA

const projects = [
  {
    title: "Quiz App",
    desc: "Responsive quiz application with timer, score tracking, and dynamic question handling.",
    live: "https://andrio-fernandes.github.io/quiz-app/",
    code: "https://github.com/andrio-fernandes/quiz-app"
  },

  {
    title: "Full Stack Portfolio",
    desc: "Full-stack portfolio website with responsive UI, MongoDB integration, REST APIs, and deployed backend services.",
    live: "https://andrio-fernandes.github.io/portfolio/",
    code: "https://github.com/andrio-fernandes/portfolio"
  },
  {
    title: "Wellness Reminder App",
    desc: "Medication reminder app with notifications, email alerts, and adherence tracking.",
    live: "https://wellness-reminder-andrio.lovable.app/",
    code: "https://github.com/andrio-fernandes/Wellness-Reminder"
  },
  {
  title: "Task Management Application",
  desc: "Full-stack task management app with JWT authentication, task CRUD operations, completion tracking, and dashboard statistics.",
  live: "https://andrio-fernandes.github.io/Task-Management-Application/",
  code: "https://github.com/andrio-fernandes/Task-Management-Application"
},
{
  title: "Shoplex",
  desc: "Full-stack e-commerce platform with user authentication, product browsing, search, shopping cart, and protected admin product management.",
  live: "https://shoplex-plum.vercel.app/",
  code: "https://github.com/andrio-fernandes/Shoplex"
},
];

// DISPLAYS PROJECTS
const container = document.querySelector(".projects-grid");

projects.forEach(p => {
  const card = document.createElement("div");

  card.classList.add("card", "glass");

  card.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.desc}</p>

    <div class="project-buttons">
      <a href="${p.live}" target="_blank" class="pro-btn">Live Demo</a>

      <a href="${p.code}" target="_blank" class="pro-btn">
        View Code
      </a>
    </div>
  `;

  container.appendChild(card);
});

// CONTACT FORM SUBMISSION
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
