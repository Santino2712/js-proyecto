/*
const baseDeDatos = [
  {
    id: 1,
    nombre: "Sorrentinos",
    precio: 1500,
    Image: ".",
  },
  {
    id: 2,
    nombre: "Ravioles",
    precio: 1500,
    imagen: "ravioles.jpg",
  },
  {
    id: 3,
    nombre: "Spaghetti",
    precio: 1400,
    imagen: "spaghetti.jpg",
  },
  {
    id: 4,
    nombre: "Lasagna",
    precio: 1600,
    imagen: "lasagna.jpg",
  },

  {
    id: 5,
    nombre: "Agua",
    precio: 200,
    imagen: "lasagna.jpg",
  },
  {
    id: 6,
    nombre: "Coca Cola",
    precio: 300,
    imagen: "lasagna.jpg",
  },
];

let carrito = [];
const divisa = "$";
const DOMitems = document.querySelector("#items");
const DOMcarrito = document.querySelector("#carrito");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");
const DOMbotonComprar = document.querySelector("#boton-comprar");

function renderizarProductos() {
  baseDeDatos.forEach((info) => {
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "col-sm-4");

    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");

    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = info.nombre;

    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-fluid");
    miNodoImagen.setAttribute("src", info.imagen);

    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = `${info.precio}${divisa}`;

    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn", "btn-primary");
    miNodoBoton.textContent = "+";
    miNodoBoton.setAttribute("marcador", info.id);
    miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);

    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  });
}

function anyadirProductoAlCarrito(evento) {
  carrito.push(evento.target.getAttribute("marcador"));

  renderizarCarrito();
}

function renderizarCarrito() {
  DOMcarrito.textContent = "";

  const carritoSinDuplicados = [...new Set(carrito)];

  carritoSinDuplicados.forEach((item) => {
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      return itemBaseDatos.id === parseInt(item);
    });

    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === item ? (total += 1) : total;
    }, 0);

    const miNodo = document.createElement("li");
    miNodo.classList.add("list-group-item", "text-right", "mx-2");
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

    const miBoton = document.createElement("button");
    miBoton.addEventListener("click", borrarItemCarrito);
    miNodo.appendChild(miBoton);
    DOMcarrito.appendChild(miNodo);
  });

  DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
  const id = evento.target.dataset.item;

  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });

  renderizarCarrito();
}

function calcularTotal() {
  return carrito
    .reduce((total, item) => {
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });

      return total + miItem[0].precio;
    }, 0)
    .toFixed(2);
}

function vaciarCarrito() {
  carrito = [];

  renderizarCarrito();
}

function comprarCarrito() {
  renderizarCarrito();
}

DOMbotonVaciar.addEventListener("click", vaciarCarrito);

renderizarProductos();
renderizarCarrito();
*/

/*
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const botonVaciar = document.getElementById("vaciar-carrito");
const precioTotal = document.getElementById("precioTotal");
let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});
stocksProductos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
  <img src= ${producto.img} alt = "">
  <h3>${producto.nombre}<h3>
  <p> class="precioProducto" > Precio:$ ${producto.precio}</p>
  <button id ="agregar ${producto.id}" class= "boton-agregar" > Agregar <i class= "fas fa-shopping-cart"></button>`;

  contenedorProductos.appendChild(div);
  const boton = document.getElementById("agregar ${producto.id}");
  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
});

const agregarAlCarrito = (proId) => {
  const existe = carrito.some((prod) => proId === proId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === proId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prompt.id === proId);
    carrito.push(item);
    actualizarCarrito();
    console.log(carrito);
  }
  actualizarCarrito();
};

const eliminarDelCarrito = (proId) => {
  const item = carrito.find((prod) => prod.id === proId);
  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);
  actualizarCarrito();
};
const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
    <p> ${prod.nombre}</p>
    <p> Precio: ${prod.precio}</p>
    <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
    <button onClick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class= "fas fa-trash-alt</button>
    `;
    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  });

  contadorCarrito.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);
};

*/

document.addEventListener("DOMContentLoaded", () => {
  const baseDeDatos = [
    {
      id: 1,
      nombre: "Sorrentinos",
      precio: 1500,
      imagen: "",
    },
    {
      id: 2,
      nombre: "Ravioles",
      precio: 1500,
      imagen: "cebolla.jpg",
    },
    {
      id: 3,
      nombre: "Ñoquis",
      precio: 1500,
      imagen: "calabacin.jpg",
    },
    {
      id: 4,
      nombre: "Lasagna",
      precio: 1600,
      imagen: "fresas.jpg",
    },
    {
      id: 5,
      nombre: "Fusilli",
      precio: 1500,
      imagen: "calabacin.jpg",
    },
    {
      id: 6,
      nombre: "Tortelloni",
      precio: 1500,
      imagen: "calabacin.jpg",
    },
  ];

  let carrito = [];
  const divisa = "$";
  const DOMitems = document.querySelector("#items");
  const DOMcarrito = document.querySelector("#carrito");
  const DOMtotal = document.querySelector("#total");
  const DOMbotonVaciar = document.querySelector("#boton-vaciar");
  const miLocalStorage = window.localStorage;
  const DOMbotonComprar = document.querySelector("#boton-comprar");

  function renderizarProductos() {
    baseDeDatos.forEach((info) => {
      const miNodo = document.createElement("div");
      miNodo.classList.add("card", "col-sm-4");

      const miNodoCardBody = document.createElement("div");
      miNodoCardBody.classList.add("card-body");

      const miNodoTitle = document.createElement("h5");
      miNodoTitle.classList.add("card-title");
      miNodoTitle.textContent = info.nombre;

      const miNodoImagen = document.createElement("img");
      miNodoImagen.classList.add("img-fluid");
      miNodoImagen.setAttribute("src", info.imagen);

      const miNodoPrecio = document.createElement("p");
      miNodoPrecio.classList.add("card-text");
      miNodoPrecio.textContent = `${info.precio}${divisa}`;

      const miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add("btn", "btn-primary");
      miNodoBoton.textContent = "+";
      miNodoBoton.setAttribute("marcador", info.id);
      miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);

      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }

  function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute("marcador"));

    renderizarCarrito();

    guardarCarritoEnLocalStorage();
  }

  function renderizarCarrito() {
    DOMcarrito.textContent = "";

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });

      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
        return itemId === item ? (total += 1) : total;
      }, 0);

      const miNodo = document.createElement("li");
      miNodo.classList.add("list-group-item", "text-right", "mx-2");
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

      const miBoton = document.createElement("button");
      miBoton.classList.add("btn", "btn-danger", "mx-5");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      miBoton.dataset.item = item;
      miBoton.addEventListener("click", borrarItemCarrito);

      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
    });

    DOMtotal.textContent = calcularTotal();
  }

  function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });

    renderizarCarrito();

    guardarCarritoEnLocalStorage();
  }

  function calcularTotal() {
    return carrito
      .reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
        });

        return total + miItem[0].precio;
      }, 0)
      .toFixed(2);
  }

  function vaciarCarrito() {
    carrito = [];

    renderizarCarrito();

    localStorage.clear();
  }

  function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function cargarCarritoDeLocalStorage() {
    if (miLocalStorage.getItem("carrito") !== null) {
      carrito = JSON.parse(miLocalStorage.getItem("carrito"));
    }
  }
  function comprarBoton() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Desea comprar los productos seleccionados?",
        text: "Puedes cancelar o modificar los productos dando en Cancelar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Terminar compra",
        cancelButtonText: "Cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Hecho!",
            "Tu compra resultó exitosa.",
            "success"
          );
          carrito = [];
          renderizarCarrito();
          localStorage.clear();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Pero puedes modificar los productos aún!",
            "error"
          );
        }
      });
  }

  DOMbotonVaciar.addEventListener("click", vaciarCarrito);
  DOMbotonComprar.addEventListener("click", comprarBoton);

  cargarCarritoDeLocalStorage();
  renderizarProductos();
  renderizarCarrito();
});
