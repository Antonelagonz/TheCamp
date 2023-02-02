const { createApp } = Vue

createApp({
    data() {
        return {
            productos: [],
            tipo: ["apa", "ipa", "stout", "porter", "lager", "honey", "ale"],
            presentacion: ["botella", "lata"],
            searchFilterInput: "",
            nombresCervezas: [],
            abv: "",
            ibu: "",
            fabricante: "",
            Linkimagen:"",
            precio: 0.00,
            stock: 0,
            descripcion: "",
        }
    },
    created() {
        this.loadData()
    },
    methods: {
        addNewProduct() {
            return Swal.fire({
                title: 'Estas seguro?',
                text: "Agregarás un producto",
                icon: 'warning',
                background: '#3f3f3f',
                color: '#edc93b',
                showCancelButton: true,
                confirmButtonColor: '#edc93b',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Agregar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.post("/api/", {
                        "nombre" :  this.nombre, 
                        "descripcion" : this.descripcion, 
                        "tipo" : this.tipo , 
                        "presntacion" : this.presentacion , 
                        "abv" : this.abv , 
                        "ibu" : this.ibu , 
                        "precio" : this.precio, 
                        "stock" : this.stock, 
                        "Linkimagen" : this.Linkimagen,
                    }, 
                        { 
                            headers: {'Content-Type': 'multipart/form-data'} 
                        }).catch(function (error) {
                        let errorData = error.response.data
                        Swal.fire({
                        icon: 'error',
                        title: 'Cuidado!!!!!',
                        text: `${errorData}`,
                        background: '#3f3f3f',
                        color: '#edc93b',
                      })}
                      )
                  Swal.fire(

                    'Producto agregado a la base de datos',
                    'Buen Trabajo.',
                    'terminado'
                    
                  ).then(response=> window.location.href = "http://localhost:8080/web/manager.html")

                }
              }) 

        },
        
        loadData() {
            axios.get("./json-cervezas.json")
            .then(response =>{
              console.log(response);
              this.productos = response.data;
              this.nombresCervezas = this.productos.map(cerveza => cerveza.nombre)
              this.descripcion = this.productos.descripcion;
              console.log(this.descripcion)
              console.log(this.productos.img)
              console.log(this.nombresCervezas)
          })
        },
        BorrarProducto(){
            return Swal.fire({
                title: 'Estas seguro?',
                text: "Estas por borrar un producto",
                icon: 'warning',
                background: '#3f3f3f',
                color: '#edc93b',
                showCancelButton: true,
                confirmButtonColor: '#edc93b',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.patch("/api/products",`id=${this.ideaso}`).catch(function (error) {
                        let errorData = error.response.data
                        Swal.fire({
                        icon: 'error',
                        title: 'Warining!!!!!',
                        text: `${errorData}`,
                        background: '#3f3f3f',
                        color: '#edc93b',
                      })}
                      )
                  Swal.fire(

                    'Producto eliminado',
                    'Buen trabajo.',
                    'terminado'
                    
                  ).then(response=> window.location.href = "http://localhost:8080/web/manager.html")

                }
              }) 
            
            
        },
        logOut(){
            return Swal.fire({
            title: 'Estas seguro que quieres cerrar sesión?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Cerrar sesión!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/api/logout`).catch(function (error) {
                    let errorData = error.response.data
                    Swal.fire({
                    icon: 'error',
                    title: 'Warning!!!!!',
                    text: `${errorData}`,
                  })}
                  )
              Swal.fire(
                'Logged out successfully'
              ).then(response=> window.location.href = "http://localhost:8080/web/index.html")
            }
          }) 
    

        },
    },
}).mount('#app')