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
      imagen: "",
    },
    {
      id: 3,
      nombre: "Ñoquis",
      precio: 1500,
      imagen: "",
    },
    {
      id: 4,
      nombre: "Lasagna",
      precio: 1600,
      imagen: "",
    },
    {
      id: 5,
      nombre: "Fusilli",
      precio: 1500,
      imagen: "",
    },
    {
      id: 6,
      nombre: "Tortelloni",
      precio: 1500,
      imagen: "",
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
