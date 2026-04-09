/*
  Carga de noticias externas desde un archivo JSON mediante fetch.
  Esto cubre el requisito de usar una fuente de datos externa.
*/

document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-container");

  if (!newsContainer) {
    return;
  }

  try {
    const response = await fetch("data/noticias.json");

    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo de noticias.");
    }

    const news = await response.json();

    newsContainer.innerHTML = "";

    news.forEach((item) => {
      const article = document.createElement("article");
      article.className = "news-item";
      article.innerHTML = `
        <time datetime="${item.fecha}">${item.fecha_visible}</time>
        <h3>${item.titulo}</h3>
        <p>${item.resumen}</p>
      `;
      newsContainer.appendChild(article);
    });
  } catch (error) {
    newsContainer.innerHTML = `<p class="status-message">${error.message}</p>`;
  }
});
