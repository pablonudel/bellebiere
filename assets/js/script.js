/////////////////////////
/////// Variables ///////
/////////////////////////

let categoria = document.getElementById("body").getAttribute("data");

let productos = []
let pag = 1
let filtrosPropiedades = []
let usuarios = []
let usuario = []

let cartCant = 0
let cartTotal = 0
let cartProd = []
let cart
let prodListOrder

const stockMin = 6
const descMin = 15
const stockDes = 18
const descStock = 10

let divProductos = document.getElementById('productos')
let divModalBody = document.getElementById('modalBody')
let divPaginacion = document.getElementById('pagination')
let divCartTotal = document.getElementById('total')
let divEnvioGratis = document.getElementById('envioGratis')



/////////////////////////
/////// innerHTML ///////
/////////////////////////

const infoProd = (obj) => {
  if (obj.categoria == "cervezas") {
    return `
    <div class="col" id="cerveza-${obj.id}">
      <div class="h-100 d-flex cardProd bg-white border border-0 text-dark position-relative">
        <div class="position-absolute top-0 mt-3">
          <span class="d-block bg-primary mb-1 px-2 text-white border border-0 rounded-end text-center"><p class="small" id="descPag-${obj.id}"></p></span>
          <span class="d-block bg-warning px-2 text-white border border-0 rounded-end text-center"><p class="small" id="stockPag-${obj.id}"></p></span>
        </div>
        <div class="flex-fill d-flex flex-column flex-lg-row flex-xl-column">
          <div class="imgProd d-flex">
            <img class="align-self-center img-fluid p-md-3" src="./assets/img/productos/${obj.imagen}" alt="${obj.imagen}">
          </div>
          <div class="infoProd d-flex flex-column flex-grow-1 justify-content-between p-3">
            <div class="text-center mb-3">
              <h5 class="card-title">${obj.nombre} <span class="text-muted">${obj.volumen}ml</span></h5>
              <h6 class="card-subtitle text-muted text-uppercase">${obj.cerveceria}</h6>
            </div>
            <div class="text-center mb-3 flex-grow-1">
              <div>
                <span class="badge rounded-pill bg-light text-white p-2 d-block"><strong class="text-capitalize">${obj.familia} | ${obj.estilo}</strong></span>
              </div>
              <div class="d-flex align-items-center justify-content-between mt-1">
              <span class="badge rounded-pill bg-info text-white p-2 flex-grow-1 me-1">${obj.abv}% ABV</span><span class="badge rounded-pill bg-warning text-white p-2 me-1 flex-grow-1 flex-grow-md-0">IBU ${obj.ibu}</span><span class="badge rounded-pill bg-light text-white p-2 me-1 flex-grow-1 flex-grow-md-0">Color <span class="rounded-circle px-2 ms-1 me-0 border border-2 border-white" style="background-color: ${obj.color}"><span class="visually-hidden">color</span></span></span><img src="./assets/img/flags/${obj.origen}.png" class="flag rounded-pill border border-2 border-light" alt="${obj.origen}">              
              </div>
            </div>
            <div class="d-flex align-items-end">
              <div class="flex-fill">
                <p class="precioAnt me-auto text-muted small text-decoration-line-through" id="precioAnt-${obj.id}"></p>
                <h4 class="precio me-auto text-primary" id="precio-${obj.id}"></h4>
              </div>
              <button type="button" class="btn btn-sm btn-success rounded-pill ms-3" id="btnAdd-${obj.id}">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div> 
    `
  }
  if (obj.categoria == "packs") {
    return `
    <div class="col" id="packs-${obj.id}">
      <div class="h-100 d-flex cardProd bg-white border border-0 text-dark">
        <div class="flex-fill d-flex flex-column flex-lg-row flex-xl-column">
          <div class="imgProd d-flex">
            <img class="align-self-center img-fluid" src="./assets/img/productos/${obj.imagen}" alt="${obj.imagen}">
          </div>
          <div class="infoProd d-flex flex-column flex-grow-1 p-3">
            <div class="text-center mb-3 justify-content-between flex-grow-1">
              <h5 class="card-title text-wrap">${obj.nombre}</h5>
              <h6 class="card-subtitle mb-3 text-muted text-uppercase">${obj.cantItems} Cervezas</h6>
              <p class="small">${obj.descripcion}</p>
            </div>
            <div class="d-flex align-items-center ">
              <h4 class="precio me-auto text-primary" id="precio-${obj.id}"></h4>
              <button type="button" class="btn btn-sm btn-success rounded-pill ms-3" id="btnAdd-${obj.id}">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
  if (obj.categoria == "accesorios") {
    return `
    <div class="col" id="acc-${obj.id}">
      <div class="h-100 d-flex cardProd bg-white border border-0 text-dark">
        <div class="flex-fill d-flex flex-column flex-lg-row flex-xl-column">
          <div class="imgProd d-flex">
            <img class="align-self-center img-fluid p-md-3" src="./assets/img/productos/${obj.imagen}" alt="${obj.imagen}">
          </div>
          <div class="infoProd d-flex flex-column flex-grow-1 p-3">
            <div class="text-center mb-3 justify-content-between flex-grow-1">
              <h5 class="card-title text-wrap">${obj.nombre}</h5>
              <p class="small">${obj.descripcion}</p>
            </div>
            <div class="d-flex align-items-center ">
              <h4 class="precio me-auto text-primary" id="precio-${obj.id}"></h4>
              <button type="button" class="btn btn-sm btn-success rounded-pill ms-3" id="btnAdd-${obj.id}">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
}

const infoProdCart = (obj) => {
  if (obj.categoria == "cervezas") {
    return `
    <div class="card rounded-3 mb-2 position-relative border-0 bgProdCart py-3" id="prodId-${obj.id}">
      <button class="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle mt-2 me-2 btnBasura" type="button" id="del-${obj.id}"><i class="bi bi-trash-fill"></i></button>
      <div class="position-absolute top-0 mt-3">
        <span class="d-block bg-primary mb-1 px-2 text-white border border-0 rounded-end text-center"><p class="small" id="descCart-${obj.id}"></p></span>
        <span class="d-block bg-warning px-2 text-white border border-0 rounded-end text-center"><p class="small" id="stockCart-${obj.id}"></p></span>
      </div>
      <div class="row gy-3 gx-0">
        <div class="col-5 rounded-start d-flex">
          <img class="align-self-center img-fluid" src="./assets/img/productos/${obj.imagen}" alt="${obj.imagen}">
        </div>
        <div class="col-7 d-flex">
          <div class="card-body flex-fill d-flex rounded-end">
            <div class="row flex-fill mt-3">
            <div class="col-12 d-flex flex-column justify-content-center">
              <h5 class="card-title text-dark">${obj.nombre} - ${obj.volumen}ml</h5>
              <p class="text-muted text-uppercase">${obj.cerveceria}</p>
              <h6 class="text-nowrap text-primary" id="subTotal-${obj.id}"></h6>
            </div>
            <div class="col-12 d-flex mt-3">
              <div class="input-group input-group-sm align-self-end align-self-lg-center">
                <button class="btn btn-info" type="button" id="rem-${obj.id}">-</button>
                <input type="text" class="form-control text-center border-info bg-light text-white" id="cant-${obj.id}" value="${obj.cant}" readonly>
                <button class="btn btn-info" type="button" id="add-${obj.id}">+</button>
              </div>
            </div>
            </div>   
          </div>
        </div>
      </div>
    </div>
    `
  }
  if (obj.categoria == "packs") {
    return `
    <div class="card rounded-3 mb-2 position-relative border-0 bgProdCart py-3" id="prodId-${obj.id}">
      <button class="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle mt-2 me-2 btnBasura" type="button" id="del-${obj.id}"><i class="bi bi-trash-fill"></i></button>
      <div class="row gy-3 gx-0">
        <div class="col-5 rounded-start d-flex">
          <img class="align-self-center img-fluid" src="./assets/img/productos/${obj.imagen}" alt="${obj.imagen}">
        </div>
        <div class="col-7 d-flex">
          <div class="card-body flex-fill d-flex rounded-end">
            <div class="row flex-fill">
            <div class="col-12 d-flex flex-column justify-content-center">
              <h5 class="card-title text-dark">${obj.nombre}</h5>
              <p class="text-muted">${obj.cantItems} Cervezas</p>
              <h6 class="text-nowrap text-primary" id="subTotal-${obj.id}">Subtotal: $${obj.subTotal}</h6>
            </div>
            <div class="col-12 d-flex mt-3">
              <div class="input-group input-group-sm align-self-end align-self-lg-center">
                <button class="btn btn-info" type="button" id="rem-${obj.id}">-</button>
                <input type="text" class="form-control text-center border-info bg-light text-white" id="cant-${obj.id}" value="${obj.cant}" readonly>
                <button class="btn btn-info" type="button" id="add-${obj.id}">+</button>
              </div>
            </div>
            </div>   
          </div>
        </div>
      </div>
    </div>
    `
  }
  if (obj.categoria == "accesorios") {
    return `
    <div class="card rounded-3 mb-2 position-relative border-0 bgProdCart py-3" id="prodId-${obj.id}">
      <button class="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle mt-2 me-2 btnBasura" type="button" id="del-${obj.id}"><i class="bi bi-trash-fill"></i></button>
      <div class="row gy-3 gx-0">
        <div class="col-5 rounded-start d-flex">
          <img class="align-self-center img-fluid" src="./assets/img/productos/${obj.imagen}" alt="${obj.imagen}">
        </div>
        <div class="col-7 d-flex">
          <div class="card-body flex-fill d-flex rounded-end">
            <div class="row flex-fill">
            <div class="col-12 d-flex flex-column justify-content-center">
              <h5 class="card-title text-dark">${obj.nombre}</h5>
              <h6 class="text-nowrap text-primary" id="subTotal-${obj.id}">Subtotal: $${obj.subTotal}</h6>
            </div>
            <div class="col-12 d-flex mt-3">
              <div class="input-group input-group-sm align-self-end align-self-lg-center">
                <button class="btn btn-info" type="button" id="rem-${obj.id}">-</button>
                <input type="text" class="form-control text-center border-info bg-light text-white" id="cant-${obj.id}" value="${obj.cant}" readonly>
                <button class="btn btn-info" type="button" id="add-${obj.id}">+</button>
              </div>
            </div>
            </div>   
          </div>
        </div>
      </div>
    </div>
    `
  }
}

/////////////////////////////
/////// Local Storage ///////
/////////////////////////////

// Get Local Opción Orden
function getLocalOrder() {
  if (localStorage.getItem('orden')) {
    prodListOrder = localStorage.getItem('orden')
    document.getElementById("selectOrden").value = prodListOrder
  } else {
    localStorage.setItem('orden', "ultimas")
  }
}

// Set Local Cart
function setLocalCartList() {
  let cartSet = [cartCant, cartTotal, cartProd]
  localStorage.setItem('cart', JSON.stringify(cartSet))
}
// Get Local Cart
function getLocalCartList() {
  if (JSON.parse(localStorage.getItem('cart'))) {
    cart = JSON.parse(localStorage.getItem('cart'))
    cartCant = cart[0]
    cartTotal = cart[1]
    cartProd = cart[2]
  } else {
    setLocalCartList()
  }
}

// Set Local DB
function setLocalDBProd() {
  localStorage.setItem('dbProductos', JSON.stringify(productos))
}

// Get Local DB Productos
function getLocalDBProd() {
  if (JSON.parse(localStorage.getItem('dbProductos'))) {
    productos = JSON.parse(localStorage.getItem('dbProductos'))
  } else {
    setLocalDBProd()
  }
}

// Set Local DB Usuarios
function setLocalDBUsers() {
  localStorage.setItem('dbUsuarios', JSON.stringify(usuarios))
}

// Get Local DB Usuarios
function getLocalDBUsers() {
  if (JSON.parse(localStorage.getItem('dbUsuarios'))) {
    usuarios = JSON.parse(localStorage.getItem('dbUsuarios'))
  } else {
    setLocalDBUsers()
  }
}

// Set Local Usuario
function setLocalUser() {
  localStorage.setItem('user', JSON.stringify(usuario))
}

// Get Local DB Usuarios
function getLocalUser() {
  if (JSON.parse(localStorage.getItem('user'))) {
    usuario = JSON.parse(localStorage.getItem('user'))
    accesoUsuario()
  } else {
    setLocalUser()
  }
}

///////////////////////////////
/////// Session Storage ///////
///////////////////////////////

function setSessionPag() {
  sessionStorage.setItem('pag', JSON.stringify(pag))
}

function getSessionPag() {
  if (JSON.parse(sessionStorage.getItem('pag'))) {
    pag = JSON.parse(sessionStorage.getItem('pag'))
  } else {
    setSessionPag()
  }
}

function setSessionFiltProp() {
  sessionStorage.setItem('filtProp', JSON.stringify(filtrosPropiedades))
}

function getSessionFiltProp() {
  if (JSON.parse(sessionStorage.getItem('filtProp'))) {
    filtrosPropiedades = JSON.parse(sessionStorage.getItem('filtProp'))
  } else {
    setSessionFiltProp()
  }
}

///////////////////////
/////// Eventos ///////
///////////////////////

if (categoria != 'home') {
  // Busqueda por nombre
  document.getElementById('busqueda').addEventListener('keyup', () => {
    if (document.getElementById('busqueda').value.length > 0) {
      let value = (document.getElementById('busqueda').value).toLowerCase()
      showProd(paginacion(aplicFilters(catOrdenada(productos)).filter(prod => prod.nombre.toLowerCase().includes(value))))
    } else {
      showProd(paginacion(aplicFilters(catOrdenada(productos))))
    }
  })

  // Cambia el tipo de orden
  document.getElementById("selectOrden").addEventListener('change', (e) => {
    localStorage.setItem('orden', e.target.value)
    pag = 1
    setSessionPag()
    let value = (document.getElementById('busqueda').value).toLowerCase()
    showProd(paginacion(aplicFilters(catOrdenada(productos)).filter(prod => prod.nombre.toLowerCase().includes(value))))
  })
}

// Boton ver carrito
document.getElementById('btnCart').addEventListener('click', () => {
  if (cartProd.length == 0) {
    showModal('modalEmpty')
  } else {
    showModal('modalCart')
  }
})

// Boton Menu Login
document.getElementById('btnLogin').addEventListener('click', () => {
  showModal('modalLogin')
})

// Boton Modal Registro
document.getElementById('btnRegistro').addEventListener('click', () => {
  hideModal('modalLogin')
  showModal('modalRegistro')
})

// Boton Modal Login
document.getElementById('btnInicioSesion').addEventListener('click', () => {
  hideModal('modalRegistro')
  showModal('modalLogin')
})

//Boton Logout
document.getElementById('btnLogout').addEventListener('click', () => {
  let username = usuario[0].username
  usuario = []
  setLocalUser()
  getLocalUser()
  let msg = `¡Hasta pronto, <span class="text-capitalize">${username}!</span>`
  showAlert(msg)
})


/////////////////////////////////
/////// Funciones Filtros ///////
/////////////////////////////////

// Filtrar productos destacados
function filtrarDestacados(arr) {
  return ordFecha(arr.filter(prod => prod.destacado == true), 'fechaAlta', 'desc')
}

function ordFecha(arr, fecha, tipo) {
  if (tipo == 'asc') {
    arr.sort((a, b) => new Date(a[fecha]) - new Date(b[fecha]))
    return arr
  }
  if (tipo == 'desc') {
    arr.sort((a, b) => new Date(b[fecha]) - new Date(a[fecha]))
    return arr
  }
}

function ordNumero(arr, num, tipo) {
  if (tipo == 'asc') {
    arr.sort((a, b) => a[num] - b[num])
    return arr
  }
  if (tipo == 'desc') {
    arr.sort((a, b) => b[num] - a[num])
    return arr
  }
}

function ordString(arr, str, tipo) {
  if (tipo == 'asc') {
    arr.sort(function (a, b) {
      let x = a[str].toLowerCase()
      let y = b[str].toLowerCase()
      if (x < y) {
        return -1
      }
      if (x > y) {
        return 1
      }
      return 0
    })
    return arr
  }
  if (tipo == 'desc') {
    arr.sort(function (a, b) {
      let x = a[str].toLowerCase()
      let y = b[str].toLowerCase()
      if (x < y) {
        return 1
      }
      if (x > y) {
        return -1
      }
      return 0
    })
    return arr
  }
}

// Ordenar el array de productos
function orderProdList(arr) {
  getLocalOrder()
  if (prodListOrder == "ultimas") {
    ordFecha(arr, 'fechaAlta', 'desc')
  } else if (prodListOrder == "primeras") {
    ordFecha(arr, 'fechaAlta', 'asc')
  } else if (prodListOrder == "precioAsc") {
    ordNumero(arr, 'precio', 'asc')
  } else if (prodListOrder == "precioDesc") {
    ordNumero(arr, 'precio', 'desc')
  } else if (prodListOrder == "nombreDesc") {
    ordString(arr, 'nombre', 'desc')
  } else if (prodListOrder == "nombreAsc") {
    ordString(arr, 'nombre', 'asc')
  }
  return arr
}

// Aplicar el orden a los productos filtrados por categoría
function catOrdenada(arr) {
  return orderProdList(arr.filter(prod => prod.categoria == categoria))
}

// Filtrar categoria cervezas por propiedades
let keys = ['familia', 'estilo', 'cerveceria', 'origen']

function aplicFilters(arr) {
  origArr = arr

  if (filtrosPropiedades.length == 0) {
    return origArr
  } else {
    let res = arr.filter(prod => filtrosPropiedades.every(p => Object.values(prod).includes(p)))
    return res
  }
}

// Toma las propiedades de los productos
function getProdFilters(arr) {
  var listOfFilters = []

  keys.forEach((key) => {
    let valProp = key
    arr.forEach((prod) => {
      var i = listOfFilters.findIndex(o => o.valor == prod[valProp])
      if (i <= -1) {
        listOfFilters.push({
          propiedad: key,
          valor: prod[valProp],
          cant: (arr.filter(o => o[valProp] == prod[valProp])).length
        })
      }
    })
  })
  listOfFilters = ordString(listOfFilters, 'valor', 'asc')
  return listOfFilters
}

// Muestra las propiedades como filtros
function showProdFilters(arr) {
  getSessionFiltProp()
  document.getElementById('filterList').replaceChildren()
  keys.forEach((key) => {
    document.getElementById('filterList').innerHTML += `
    <div class="mb-4">
      <h5 class="text-capitalize mb-2">${key}</h5>
      <div id="filter-${key}"></div>
    </div>
    `
  })
  arr.forEach((prop, index) => {
    document.getElementById(`filter-${prop.propiedad}`).innerHTML +=
      `
      <button type="button" class="btn btn-primary btn-sm mb-1 border-0" id="${prop.propiedad}-${index}">
        ${prop.valor} <span class="badge rounded-pill bg-dark ms-1">${prop.cant}</span>
      </button>
      `
    if (!filtrosPropiedades.includes(prop.valor)) {
      document.getElementById(`${prop.propiedad}-${index}`).classList.remove('bg-warning')
      document.getElementById(`${prop.propiedad}-${index}`).classList.remove('text-black')
    } else {
      document.getElementById(`${prop.propiedad}-${index}`).classList.add('bg-warning')
      document.getElementById(`${prop.propiedad}-${index}`).classList.add('text-black')
    }
  })
  arr.forEach((prop, index) => {
    document.getElementById(`${prop.propiedad}-${index}`).addEventListener('click', () => {
      pag = 1
      setSessionPag()
      showProdFilterProps(prop, index)
    })
  })
}

// Muestra las cervezas filtradas segun su propiedad
function showProdFilterProps(prop, index) {
  getSessionFiltProp()
  document.getElementById(`${prop.propiedad}-${index}`).classList.toggle('bg-warning')
  if (!filtrosPropiedades.includes(prop.valor)) {
    filtrosPropiedades.push(prop.valor)
    setSessionFiltProp()
    showProd(paginacion(aplicFilters(catOrdenada(productos))))
    showProdFilters(getProdFilters(aplicFilters(catOrdenada(productos))))
  } else {
    let valor = filtrosPropiedades.find(o => o == prop.valor)
    filtrosPropiedades.splice(filtrosPropiedades.indexOf(valor), 1);
    setSessionFiltProp()
    showProd(paginacion(aplicFilters(catOrdenada(productos))))
    showProdFilters(getProdFilters(aplicFilters(catOrdenada(productos))))
  }
}

/////// Paginacion ///////

// Resetar paginación cuando cambia de página
let catAnt = categoria
if (categoria == catAnt) {
  pag = 1
  setSessionPag()
}

// Función para paginar
function paginate(arr, pagActual) {
  let pagina = pagActual || 1,
    offset = (pagina - 1) * 16,

    itemsPaginados = arr.slice(offset).slice(0, 16),
    pagTotales = Math.ceil(arr.length / 16);

  return {
    pagina: pagina,
    pagTotales: pagTotales,
    data: itemsPaginados
  };
}

// Genera la paginación
function paginacion(arr) {
  let arrPag = []
  getSessionPag()
  let prodInPage = paginate(arr, pag)

  if (prodInPage.pagTotales > 1) {
    divPaginacion.hidden = false

    if (pag == 1) {
      document.getElementById('liPagPrev').classList.add("disabled")
    } else {
      document.getElementById('liPagPrev').classList.remove("disabled")
    }
    if (pag == prodInPage.pagTotales) {
      document.getElementById('liPagNext').classList.add("disabled")
    } else {
      document.getElementById('liPagNext').classList.remove("disabled")
    }

    document.getElementById('paginas').replaceChildren()
    for (let p = 1; p <= prodInPage.pagTotales; p++) {
      arrPag.push(p)
      document.getElementById('paginas').innerHTML += `
      <li class="page-item" id="liPagina-${p}">
        <button class="pagina page-link text-white" id="pagina-${p}">${p}</button>
      </li>
      `
    }

    btnPag(arrPag)

    document.getElementById('liPagina-' + prodInPage.pagina).classList.add("active")
  } else {
    divPaginacion.hidden = true
    pag = 1
    prodInPage = paginate(arr, pag)
    setSessionPag()
  }
  return prodInPage.data
}

// Eventos de los botones de paginacion
btnPag = (arr) => {
  arr.forEach((pagina) => {
    document.getElementById('pagina-' + pagina).addEventListener('click', () => {
      document.getElementById('top').scrollIntoView();
      getSessionPag()
      pag = pagina
      setSessionPag()
      showProd(paginacion(aplicFilters(catOrdenada(productos))))
    })
  })
}

btnPrevNext = (tipo) => {
  let btn = document.getElementById(tipo)
  if (btn) {
    btn.addEventListener('click', () => {
      document.getElementById('top').scrollIntoView();
      getSessionPag()
      if (tipo == 'pagPrev') {
        pag--
      }
      if (tipo == 'pagNext') {
        pag++
      }
      setSessionPag()
      showProd(paginacion(aplicFilters(catOrdenada(productos))))
    })
  }
}
btnPrevNext('pagPrev')
btnPrevNext('pagNext')

////////////////////////////////////////////
/////// Funciones Carga de productos ///////
////////////////////////////////////////////

// Formato de precios
let precioFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Aplicar descuentos al producto de la categoria cervezas según su stock
function aplicarDescuento(prod) {
  if (prod.categoria == 'cervezas') {
    if (prod.stock <= stockDes && prod.stock > stockMin) {
      prod.precioOriginal = prod.precio
      prod.descuento = descStock
      prod.precio = prod.precioOriginal - (prod.precioOriginal * (descStock / 100))
      return prod
    }
    if (prod.stock <= stockMin && prod.stock > 0) {
      prod.precioOriginal = prod.precio
      prod.descuento = descMin
      prod.precio = prod.precioOriginal - (prod.precioOriginal * (descMin / 100))
      return prod
    }
    if (prod.stock > stockDes) {
      return prod
    }
    if (prod.descuento && prod.stock == 0){
      prod.precio = prod.precioOriginal
      return prod
    }
  } else {
    return prod
  }
}

// Mostrar descuento en el producto
function showPrecios(prod) {
  if (prod.categoria == 'cervezas') {
    if (prod.descuento == descStock) {
      document.getElementById(`precioAnt-${prod.id}`).innerHTML = `${precioFormat.format(prod.precioOriginal)}`
      document.getElementById(`precio-${prod.id}`).innerHTML = `${precioFormat.format(prod.precio)}`
    }
    if (prod.descuento == descMin) {
      if (prod.stock == 0) {
        document.getElementById(`precio-${prod.id}`).innerHTML = `${precioFormat.format(prod.precioOriginal)}`
      }
      if (prod.stock == 1) {
        document.getElementById(`precioAnt-${prod.id}`).innerHTML = `${precioFormat.format(prod.precioOriginal)}`
        document.getElementById(`precio-${prod.id}`).innerHTML = `${precioFormat.format(prod.precio)}`
      }
      if (prod.stock > 1) {
        document.getElementById(`precioAnt-${prod.id}`).innerHTML = `${precioFormat.format(prod.precioOriginal)}`
        document.getElementById(`precio-${prod.id}`).innerHTML = `${precioFormat.format(prod.precio)}`
      }
    }
    if (!prod.descuento) {
      document.getElementById(`precio-${prod.id}`).innerHTML = `${precioFormat.format(prod.precio)}`
    }
  } else {
    document.getElementById(`precio-${prod.id}`).innerHTML = `${precioFormat.format(prod.precio)}`
  }
}

function showDescTags(prod, tagDesc, tagStock) {
  if(prod.categoria == 'cervezas' && prod.descuento){
    if (prod.descuento == descStock) {
      document.getElementById(`${tagDesc}-${prod.id}`).innerHTML = `${descStock}% OFF`
    }
    if (prod.descuento == descMin) {
      if (prod.stock == 1) {
        document.getElementById(`${tagDesc}-${prod.id}`).innerHTML = `${descMin}% OFF`
        document.getElementById(`${tagStock}-${prod.id}`).innerHTML = `Última`
      }
      if (prod.stock > 1) {
        document.getElementById(`${tagDesc}-${prod.id}`).innerHTML = `${descMin}% OFF`
        document.getElementById(`${tagStock}-${prod.id}`).innerHTML = `Últimas ${prod.stock}`
      }
    }
  }
}

// Muestra los productos
function showProd(arr) {
  divProductos.replaceChildren()

  arr.forEach((prod) => {
    divProductos.innerHTML += infoProd(prod)
  })

  arr.forEach((prod) => {
    let btnAddToCart = document.getElementById(`btnAdd-${prod.id}`)
    let producto = productos.find(p => p.id == prod.id)
    let item = cartProd.find(p => p.id == prod.id)

    showPrecios(producto)
    showDescTags(producto, 'descPag', 'stockPag')

    getLocalCartList()

    if (producto.stock == 0 || (item && item.cant == producto.stock)) {
      disabledBtn(btnAddToCart, "Sin stock")
    }

    btnAddToCart.addEventListener('click', () => {
      addToCart(prod)
    })
  })
  if (document.getElementById('filtrosCant')) {
    document.getElementById('filtrosCant').textContent = `${filtrosPropiedades.length}`
  }
}

// Agrega Productos al carrito

function addToCart(prod) {
  let btnAddToCart = document.getElementById(`btnAdd-${prod.id}`)
  getLocalCartList()
  let producto = productos.find(p => p.id == prod.id)
  let item = cartProd.find(i => i.id == prod.id)
  cartCant++
  cartTotal += prod.precio

  animCantAdd()

  if (item) {
    item.cant++
    item.subTotal = item.cant * prod.precio
    if (item.cant == producto.stock) {
      disabledBtn(btnAddToCart, "Sin stock")
    }
  } else {
    cartProd.push({
      id: prod.id,
      categoria: prod.categoria,
      nombre: prod.nombre,
      cantItems: prod.cantItems,
      cerveceria: prod.cerveceria,
      volumen: prod.volumen,
      precio: prod.precio,
      cant: 1,
      subTotal: prod.precio,
      imagen: prod.imagen
    })
  }
  setLocalCartList()
  cartCounter()
  fillCart(cartProd)
}


/////////////////////////////////
/////// Funciones Carrito ///////
/////////////////////////////////

// deshabilitar botones
let disabledBtn = (btn, value) => {
  if (btn) {
    btn.disabled = true
    btn.textContent = value
  }
}
// habilitar botones
let enableBtn = (btn, value) => {
  if (btn) {
    btn.disabled = false
    btn.textContent = value
  }
}

// cartCounter
function cartCounter() {
  getLocalCartList()
  if (cartCant > 0) {
    $('#cartCounter').empty()
    $('#cartCounter').show()
    $('#cartCounter').append(
      `
    <span class="position-absolute start-100 translate-middle badge rounded-pill bg-info border border-primary border-3" id="cant">
      ${cartCant}
    </span>
    `
    )
  } else {
    $(() => {
      animCantDel()
    })
  }
}

// Aviso envío gratis
let envioGratis = () => {
  let resto = precioFormat.format(3000 - cartTotal)
  if (cartTotal < 3000) {
    divEnvioGratis.innerHTML = `
    <span class="badge rounded-pill bg-info">
      Estás a ${resto} del envío gratuito
    </span>
    `
  } else {
    divEnvioGratis.innerHTML = `
    <span class="badge rounded-pill bg-warning">
      ¡Tenés el envío GRATIS!
    </span>
    `
  }
}

// Boton borrar carrito
document.getElementById('btnBorrarCarrito').addEventListener('click', () => {
  cartProd.forEach((prod => {
    let btn = document.getElementById(`btnAdd-${prod.id}`)
    enableBtn(btn, 'Agregar')
  }))
  cartCant = 0
  cartTotal = 0
  cartProd = []
  divModalBody.replaceChildren()
  setLocalCartList()
  getLocalCartList()
  cartCounter()
  hideModal('modalCart')
})

function finalizarCompra() {
  if (usuario.length > 0) {
    cartProd.forEach((prod) => {
      let cantidad = prod.cant
      let producto = productos.find(p => p.id == prod.id)
      let prodIndex = productos.findIndex(p => p.id == producto.id)
      productos.splice(prodIndex, 1)
      cartCant = 0
      cartTotal = 0
      cartProd = []
      setLocalCartList()
      producto.stock -= cantidad
            
      productos.push(aplicarDescuento(producto))
    })
    setLocalDBProd()
    getLocalDBProd()
    if (categoria == 'home') {
      showProd(filtrarDestacados(productos))
    } else {
      showProd(paginacion(aplicFilters(catOrdenada(productos))))
    }
    showModal('modalCompra')
    hideModal('modalCart')
  } else {
    hideModal('modalCart')
    showModal('modalLogin')
  }
}

// Boton Realizar Compra
document.getElementById('btnComprar').addEventListener('click', () => {
  finalizarCompra()
  getLocalCartList()
  cartCounter()
})

// Llenar carrito
function fillCart(arr) {
  divModalBody.replaceChildren()
  precioTotal = precioFormat.format(cartTotal)
  divCartTotal.innerHTML = `Total: ${precioTotal}`
  envioGratis()

  arr.forEach((prod) => {
    divModalBody.innerHTML += infoProdCart(prod)
  })

  arr.forEach((prod) => {
    let btnAddToCart = document.getElementById(`btnAdd-${prod.id}`)
    let subTotal = document.getElementById(`subTotal-${prod.id}`)
    let btnAdd = document.getElementById(`add-${prod.id}`)
    let btnRem = document.getElementById(`rem-${prod.id}`)
    let btnDel = document.getElementById(`del-${prod.id}`)

    let producto = productos.find(p => p.id == prod.id)
    let item = cartProd.find(i => i.id == prod.id)

    showDescTags(producto, 'descCart', 'stockCart')

    precioSubTotal = precioFormat.format(item.subTotal)
    subTotal.innerHTML = `Subtotal: ${precioSubTotal}`

    if (producto.stock == 0 || item.cant == producto.stock) {
      disabledBtn(btnAdd, "+")
      disabledBtn(btnAddToCart, "Sin Stock")
    }

    var aplicFunc = () => {
      setLocalCartList()
      getLocalCartList()
      cartCounter()
      envioGratis()
    }

    btnAdd.addEventListener('click', () => {
      operacion(prod, 'sumItem')
      aplicFunc()
    })

    btnRem.addEventListener('click', () => {
      operacion(prod, 'restItem')
      aplicFunc()
    })

    btnDel.addEventListener('click', () => {
      operacion(prod, 'delItem')
      aplicFunc()
    })

  })
}

function operacion(prod, tipo) {
  let btnAddToCart = document.getElementById(`btnAdd-${prod.id}`)
  let btnAdd = document.getElementById(`add-${prod.id}`)
  let inputCant = document.getElementById(`cant-${prod.id}`)
  let subTotal = document.getElementById(`subTotal-${prod.id}`)
  let item = cartProd.find(i => i.id == prod.id)
  let producto = productos.find(p => p.id == prod.id)
  let cartCantPrev = cartCant

  if (tipo == 'sumItem') {
    cartCant++
    cartTotal += item.precio
    item.cant++
    inputCant.value = item.cant
    item.subTotal = item.cant * prod.precio

    animCantAdd()

    if (item.cant === producto.stock) {
      disabledBtn(btnAdd, "+")
      disabledBtn(btnAddToCart, "Sin Stock")
    }
  }

  if (tipo == 'restItem') {
    cartCant--
    cartTotal -= item.precio
    item.cant--
    inputCant.value = item.cant
    item.subTotal = item.cant * prod.precio

    if (cartCant == 0) {
      animCantDel()
      hideModal('modalCart')
    } else {
      animCantRem(cartCantPrev, cartCant)
    }

    enableBtn(btnAdd, "+")
    enableBtn(btnAddToCart, "Agregar")

    if (item.cant == 0) {
      document.getElementById('modalBody').removeChild(document.getElementById(`prodId-${prod.id}`))
      let itemToDel = (item) => item['id'] == prod.id
      let index = cartProd.findIndex(itemToDel)
      cartProd.splice(index, 1)
    }
  }

  if (tipo == 'delItem') {
    cartCant -= item.cant
    cartTotal -= item.subTotal

    if (cartCant === 0) {
      animCantDel()
      hideModal('modalCart')
    } else {
      animCantRem(cartCantPrev, cartCant)
    }

    enableBtn(btnAddToCart, "Agregar")

    document.getElementById('modalBody').removeChild(document.getElementById(`prodId-${prod.id}`))
    let itemToDel = (item) => item['id'] == prod.id
    let index = cartProd.findIndex(itemToDel)
    cartProd.splice(index, 1)
  }

  precioSubTotal = precioFormat.format(item.subTotal)
  precioTotal = precioFormat.format(cartTotal)
  subTotal.innerHTML = `Subtotal: ${precioSubTotal}`
  divCartTotal.innerHTML = `Total: ${precioTotal}`
}

/////////////////////////////////
/////// Funciones Usuario ///////
/////////////////////////////////

// Muestra un modal
function showModal(modal) {
  new bootstrap.Modal(document.getElementById(modal)).show()
  formLogin.reset()
  formRegistro.reset()
}

// Cierra un modal
function hideModal(modal) {
  bootstrap.Modal.getInstance(document.getElementById(modal)).hide()
}

// Muestra alerta
function showAlert(msg) {
  let toast = document.querySelectorAll(".toast")[0]
  let toastBody = toast.getElementsByClassName("msg")[0]
  if (toastBody) {
    toastBody.innerHTML = msg
    new bootstrap.Toast(toast).show()
  }
}

// Acceso usuario
function accesoUsuario() {
  if (usuario.length > 0) {
    document.getElementById('btnLogout').hidden = false
    document.getElementById('btnLogin').hidden = true
    document.getElementById('userName').textContent = usuario[0].username
  } else {
    document.getElementById('btnLogout').hidden = true
    document.getElementById('btnLogin').hidden = false
  }
}

// Form Registro Usuario
document.getElementById('formRegistro').addEventListener('submit', (e) => {
  e.preventDefault()

  let dataForm = new FormData(e.target)
  let usuario = usuarios.find(u => u.email == dataForm.get("userEmailReg"))

  if (usuario) {
    let msg = 'El Email ingresado se encuentra registrado'
    showAlert(msg)
    formRegistro.reset()
  } else {
    usuarios.push(
      new Usuario(dataForm.get("userNameReg"), dataForm.get("userEmailReg"), dataForm.get("userPassReg")))
    let msg = '¡Usuario registrado con éxito!'
    showAlert(msg)
    hideModal('modalRegistro')
    showModal('modalLogin')
  }


  setLocalDBUsers()
  getLocalDBUsers()
  formRegistro.reset()
})

// Form Login Usuario
document.getElementById('formLogin').addEventListener('submit', (e) => {
  e.preventDefault()

  let dataForm = new FormData(e.target)
  let user = usuarios.find(u => u.email == dataForm.get("userEmailLogin"))

  if (user) {
    let pass = user.pass
    if (dataForm.get("userPassLogin") == pass) {
      let msg = `¡Bienvenido <span class="text-capitalize">${user.username}</span>!`
      showAlert(msg)
      formLogin.reset()
      hideModal('modalLogin')
      usuario.push({
        username: user.username,
        email: user.email
      })
      setLocalUser()
      accesoUsuario()
    } else {
      let msg = `La contraseña es incorrecta`
      showAlert(msg)
    }
  } else {
    let msg = `Usuario no registrado`
    showAlert(msg)
  }
})