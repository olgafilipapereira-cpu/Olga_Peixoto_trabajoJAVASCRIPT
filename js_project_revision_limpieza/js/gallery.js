/*
  Galería dinámica con renderizado de tarjetas, filtros por categoría
  y visor ampliado tipo lightbox.
*/

const galleryItems = [
  {
    id: 1,
    title: "Atelier Norte",
    category: "corporativa",
    description: "Sitio editorial para una firma de interiorismo con enfoque premium.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Boreal Shop",
    category: "ecommerce",
    description: "Concepto de tienda online para una marca de moda sostenible.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Nexa Brand",
    category: "branding",
    description: "Landing creativa para lanzamiento de identidad visual y campaña digital.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Clínica Menta",
    category: "corporativa",
    description: "Web clara y accesible para captar pacientes y reservas online.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Umami Market",
    category: "ecommerce",
    description: "Catálogo digital con experiencia móvil mejorada y fichas de producto.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "Pulse Studio",
    category: "branding",
    description: "Diseño promocional para estudio creativo orientado a música y eventos.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("gallery-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxText = document.getElementById("lightbox-text");
  const lightboxClose = document.getElementById("lightbox-close");

  if (!grid) {
    return;
  }

  const renderGallery = (filter = "all") => {
    const filteredItems =
      filter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter);

    grid.innerHTML = "";

    filteredItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "gallery-item";
      card.innerHTML = `
        <button type="button" data-id="${item.id}" aria-label="Abrir imagen de ${item.title}">
          <img src="${item.image}" alt="Proyecto ${item.title}" />
        </button>
        <div class="gallery-content">
          <p class="eyebrow">${item.category}</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `;
      grid.appendChild(card);
    });

    const cardButtons = grid.querySelectorAll("button[data-id]");
    cardButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.id);
        const selected = galleryItems.find((item) => item.id === id);

        if (selected) {
          lightboxImage.src = selected.image;
          lightboxImage.alt = `Vista ampliada de ${selected.title}`;
          lightboxTitle.textContent = selected.title;
          lightboxText.textContent = selected.description;
          lightbox.classList.add("is-open");
          lightbox.setAttribute("aria-hidden", "false");
        }
      });
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderGallery(button.dataset.filter);
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  renderGallery();
});
