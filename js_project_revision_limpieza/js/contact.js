/*
  Integración con Leaflet y Leaflet Routing Machine sobre OpenStreetMap.
  Se marca la ubicación del negocio y, si el usuario lo permite,
  se genera una ruta desde su posición actual.
*/

document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("map");

  if (!mapElement || typeof L === "undefined") {
    return;
  }

  const officeCoordinates = [40.4217, -3.6878];
  const routeButton = document.getElementById("route-button");
  const mapStatus = document.getElementById("map-status");

  const map = L.map("map").setView(officeCoordinates, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const officeMarker = L.marker(officeCoordinates).addTo(map);
  officeMarker.bindPopup("NovaStudio Web · Avenida del Diseño 24, Madrid").openPopup();

  let routingControl = null;

  const createRoute = (userCoordinates) => {
    if (routingControl) {
      map.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
      waypoints: [L.latLng(userCoordinates[0], userCoordinates[1]), L.latLng(officeCoordinates[0], officeCoordinates[1])],
      routeWhileDragging: false,
      addWaypoints: false,
      show: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker(index, waypoint) {
        if (index === 0) {
          return L.marker(waypoint.latLng).bindPopup("Tu ubicación aproximada");
        }
        return L.marker(waypoint.latLng).bindPopup("NovaStudio Web");
      }
    }).addTo(map);
  };

  routeButton.addEventListener("click", () => {
    if (!("geolocation" in navigator)) {
      mapStatus.textContent = "Tu navegador no permite usar geolocalización.";
      return;
    }

    mapStatus.textContent = "Solicitando tu ubicación...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoordinates = [position.coords.latitude, position.coords.longitude];
        createRoute(userCoordinates);
        mapStatus.textContent = "Ruta calculada correctamente desde tu ubicación aproximada.";
      },
      () => {
        mapStatus.textContent =
          "No ha sido posible obtener tu ubicación. Revisa permisos o inténtalo de nuevo.";
      }
    );
  });
});
