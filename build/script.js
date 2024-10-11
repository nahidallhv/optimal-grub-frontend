document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.querySelector(".nav-button");
  const courseDetailsButton = document.querySelector(".details-btn");

  registerButton.addEventListener("click", function () {
    document
      .querySelector(".registration")
      .scrollIntoView({ behavior: "smooth" });
  });

  courseDetailsButton.addEventListener("click", function () {
    document
      .querySelector(".course-about")
      .scrollIntoView({ behavior: "smooth" });
  });
});

const hiddenElements = document.querySelectorAll(".hidden");

const observerOptions = {
  threshold: 0.5,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

hiddenElements.forEach((element) => {
  observer.observe(element);
});

const form = document.querySelector(".registration-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp"),
  };

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    alert("Xəta baş verdi. Yenidən cəhd edin.");
  }
  form.reset();
});
