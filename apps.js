// ======================= apps.js =======================
// Lógica combinada: Carrito + WhatsApp + Formulario de pedido
// ========================================================

// ======= UTILIDADES =======

/** Formatea un número a moneda MXN */
function toMXN(num) {
    return Number(num || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

/** Obtiene el precio desde un data-precio en elementos del formulario */
function getPrecioFromDataset(el) {
    const raw = el?.dataset?.precio;
    return raw ? Number(raw) : 0;
}

// ========================================================
// 1️⃣ CARRITO DE COMPRAS INTERACTIVO
// ========================================================

const btnAgregar = document.getElementById('btnAgregar');
const btnEliminar = document.getElementById('btnEliminar');
const listaCarrito = document.getElementById('listaCarrito');
const mensajeCarrito = document.getElementById('mensajeCarrito');

let carrito = [];

/** Actualiza la interfaz del carrito */
function actualizarCarrito() {
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        mensajeCarrito.textContent = 'Carrito vacío';
        return;
    }

    mensajeCarrito.textContent = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item}`;
        listaCarrito.appendChild(li);
    });
}

// Eventos del carrito
btnAgregar?.addEventListener('click', () => {
    const producto = 'Valentino One Stud';
    carrito.push(producto);
    actualizarCarrito();
});

btnEliminar?.addEventListener('click', () => {
    if (carrito.length > 0) {
        carrito.pop();
        actualizarCarrito();
    }
});

// ========================================================
// 2️⃣ WHATSAPP FLOTANTE
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const waBtn = document.querySelector('.whatsapp-float');
    if (waBtn) {
        const h = new Date().getHours();
        const enHorario = h >= 9 && h < 18;
        const msg = enHorario
            ? '¡En línea! Respondo ahora.'
            : 'Fuera de horario, te contestamos en la mañana.';

        waBtn.title = `WhatsApp — ${msg}`;
        waBtn.setAttribute('aria-label', `Chatea por WhatsApp — ${msg}`);

        const telefono = '527221234567';
        const texto = encodeURIComponent('Hola Romel, vengo del sitio web de Valentino Garavani. Me interesa la colección.');
        waBtn.href = `https://wa.me/${telefono}?text=${texto}`;
    }

    // ========================================================
    // 3️⃣ FORMULARIO DE PEDIDO (RESET Y CÁLCULOS OPCIONALES)
    // ========================================================
    const form = document.getElementById('formPedido');

    // Reset del formulario
    form?.addEventListener('reset', () => {
        console.log("Formulario de pedido limpiado.");
    });

    // Ejemplo opcional: Cálculo de total con precios
    // (solo si decides agregar data-precio en tus selects/inputs)
    form?.addEventListener('change', () => {
        const selects = form.querySelectorAll('[data-precio]');
        let total = 0;
        selects.forEach(el => total += getPrecioFromDataset(el));
        console.log(`Total estimado: ${toMXN(total)}`);
    });
});
// ========================================================
// 4️⃣ CONSUMO DE API RESTful (Simulación Valentino Garavani)
// ========================================================
document.addEventListener('DOMContentLoaded', async () => {
    const contenedorCatalogo = document.getElementById('catalogo');

    try {
        // Simulación de una respuesta de API de tenis Valentino Garavani
        const productos = [
            {
                id: 1,
                title: "Valentino Garavani Rockstud Untitled Sneaker",
                description: "Tenis blancos de piel italiana con los icónicos tachones Rockstud dorados.",
                price: 890,
                image: "VL7N.jpg.webp"
            },
            {
                id: 2,
                title: "Valentino Garavani Open Skate Sneaker",
                description: "Diseño moderno con paneles de gamuza y la franja característica de Valentino.",
                price: 950,
                image: "VLNEGROS.JPG.webp"
            },
            {
                id: 3,
                title: "Valentino Garavani VLogo Signature Sneaker",
                description: "Modelo urbano con el logo V dorado en el lateral y suela de caucho premium.",
                price: 1020,
                image: "Netrunner.jpg.webp"
            },
            {
                id: 4,
                title: "Valentino Garavani One Stud Low-Top Sneaker",
                description: "Tenis minimalistas con un solo tachón XL y acabados en piel napa.",
                price: 980,
                image: "Lvlowwhite navy.jpg"
            }
        ];

        // Limpia contenido previo del catálogo
        contenedorCatalogo.innerHTML = '<h3 class="h5 mb-3">Tenis Valentino Garavani (desde API simulada)</h3>';

        // Recorre y muestra productos dinámicamente
        productos.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'card mb-3 shadow-sm';
            card.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${prod.image}" class="img-fluid rounded-start" alt="${prod.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${prod.title}</h5>
                            <p class="card-text text-muted">${prod.description.substring(0, 80)}...</p>
                            <p class="card-text text-success fw-semibold">${toMXN(prod.price * 18)}</p>
                            <button class="btn btn-dark btn-sm">Agregar al carrito</button>
                        </div>
                    </div>
                </div>`;
            contenedorCatalogo.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar datos de los tenis:", error);
        contenedorCatalogo.innerHTML = `<p class="text-danger">No se pudieron cargar los tenis.</p>`;
    }
});
