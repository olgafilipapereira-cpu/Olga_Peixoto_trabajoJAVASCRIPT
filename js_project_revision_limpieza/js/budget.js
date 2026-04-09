/*
  Validación del formulario y cálculo automático del presupuesto.
  Todas las actualizaciones se realizan sin recargar la página.
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("budget-form");

  if (!form) {
    return;
  }

  const fields = {
    nombre: document.getElementById("nombre"),
    apellidos: document.getElementById("apellidos"),
    telefono: document.getElementById("telefono"),
    email: document.getElementById("email"),
    producto: document.getElementById("producto"),
    plazo: document.getElementById("plazo"),
    condiciones: document.getElementById("condiciones")
  };

  const extras = Array.from(document.querySelectorAll('input[name="extra"]'));
  const totalOutput = document.getElementById("presupuesto-final");
  const discountInfo = document.getElementById("discount-info");
  const successMessage = document.getElementById("form-success");

  const setError = (fieldName, message) => {
    const errorBox = document.getElementById(`error-${fieldName}`);
    if (errorBox) {
      errorBox.textContent = message;
    }
  };

  const validators = {
    nombre: () => {
      const value = fields.nombre.value.trim();
      const valid = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,15}$/.test(value);
      setError("nombre", valid ? "" : "Introduce solo letras y máximo 15 caracteres.");
      return valid;
    },
    apellidos: () => {
      const value = fields.apellidos.value.trim();
      const valid = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,40}$/.test(value);
      setError("apellidos", valid ? "" : "Introduce solo letras y máximo 40 caracteres.");
      return valid;
    },
    telefono: () => {
      const value = fields.telefono.value.trim();
      const valid = /^\d{9}$/.test(value);
      setError("telefono", valid ? "" : "El teléfono debe contener exactamente 9 dígitos.");
      return valid;
    },
    email: () => {
      const value = fields.email.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setError("email", valid ? "" : "Introduce un correo electrónico válido.");
      return valid;
    },
    condiciones: () => {
      const valid = fields.condiciones.checked;
      setError("condiciones", valid ? "" : "Debes aceptar las condiciones para enviar.");
      return valid;
    }
  };

  const calculateDiscount = (days) => {
    if (days >= 60) return 0.15;
    if (days >= 45) return 0.1;
    if (days >= 30) return 0.05;
    return 0;
  };

  const updateBudget = () => {
    const productPrice = Number(fields.producto.value);
    const extrasPrice = extras.reduce((total, extra) => total + (extra.checked ? Number(extra.value) : 0), 0);
    const days = Number(fields.plazo.value) || 0;
    const subtotal = productPrice + extrasPrice;
    const discountRate = calculateDiscount(days);
    const total = subtotal - subtotal * discountRate;

    totalOutput.value = `${total.toFixed(2)} €`;
    totalOutput.textContent = `${total.toFixed(2)} €`;

    if (discountRate > 0) {
      discountInfo.textContent = `Descuento aplicado: ${(discountRate * 100).toFixed(0)}% por plazo de ${days} días.`;
    } else {
      discountInfo.textContent = "Sin descuento aplicado.";
    }
  };

  fields.nombre.addEventListener("input", validators.nombre);
  fields.apellidos.addEventListener("input", validators.apellidos);
  fields.telefono.addEventListener("input", () => {
    fields.telefono.value = fields.telefono.value.replace(/\D/g, "").slice(0, 9);
    validators.telefono();
  });
  fields.email.addEventListener("input", validators.email);
  fields.condiciones.addEventListener("change", validators.condiciones);

  [fields.producto, fields.plazo].forEach((element) => {
    element.addEventListener("input", updateBudget);
    element.addEventListener("change", updateBudget);
  });

  extras.forEach((extra) => {
    extra.addEventListener("change", updateBudget);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid =
      validators.nombre() &&
      validators.apellidos() &&
      validators.telefono() &&
      validators.email() &&
      validators.condiciones();

    if (!isValid) {
      successMessage.textContent = "Revisa los campos marcados antes de enviar el formulario.";
      successMessage.style.color = "#d63031";
      return;
    }

    successMessage.textContent = "Formulario enviado correctamente. En breve recibirás tu propuesta.";
    successMessage.style.color = "#0a8d6c";
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      Object.keys(validators).forEach((fieldName) => setError(fieldName, ""));
      successMessage.textContent = "";
      updateBudget();
    }, 0);
  });

  updateBudget();
});
