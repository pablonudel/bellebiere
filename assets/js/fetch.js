class Usuario {
  constructor(username, email, pass){
    this.username = username
    this.email = email
    this.pass = pass
  }
}

fetch('./assets/api/productos.json')
    .then(response => response.json())
    .then(data => {
      getLocalDBProd()
      getLocalDBUsers()
      getLocalUser()
      if(productos.length == 0 || productos.length !== data.length){
        productos = []
        data.forEach((prod) => {
          productos.push(aplicarDescuento(prod))
        })
        setLocalDBProd()
      }
      if (categoria == 'cervezas') {
        getSessionFiltProp()
        showProdFilters(getProdFilters(aplicFilters(catOrdenada(productos))))
      }
      if (categoria == 'home') {
        showProd(filtrarDestacados(productos))
      } else {
        showProd(paginacion(aplicFilters(catOrdenada(productos))))
      }
      fillCart(cartProd)
      cartCounter()
    })
    .catch(error => console.log(error))