const {createApp} = Vue; 

createApp({
    data(){
        return{
            json: [],
            cervezas: [],
            tipoDeCerveza: [], 
            setCheckbox: [],
            checked: [],
            cervezasFiltradas: [], //para comparar los datos
            filtroInput: '', //es para lo que ingrese el usuario
            formato: [],
            setFormato: [],
            carrito: {},
            tipos: [],
            marca: [],
            setMarca: [],
            filtroMarca: [],
            setTipo: [],
            productoActual: {},
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        loadData(){
            axios.get("./js/json-cervezas.json")
            .then(response =>{
                this.cervezas = response.data;
                this.cervezasFiltradas = this.cervezas.map(nombreCerveza => nombreCerveza.nombre);
                this.tipoDeCerveza = this.cervezas.map(tipo => tipo.tipoCerveza);
                this.formato = this.cervezas.map(formato => formato.presentacion);
                this.marca = this.cervezas.map(marca => marca.fabricante);
                this.mostrarTipoCerveza();
                this.mostrarPresentacion();
                this.mostrarFabricante();
                console.log(this.cervezasFiltradas);
                /* this.searchbar(); */
            })
            .catch(error => console.error(error))
        },
        mostrarTipoCerveza(){
            this.setTipo = [... new Set(this.tipoDeCerveza)];
            console.log(this.setTipo);
        },
        mostrarPresentacion(){
            this.setFormato = [... new Set(this.formato)];
            console.log(this.setFormato);
        },
        mostrarFabricante(){
            this.setMarca = [... new Set(this.marca)];
            console.log(this.setMarca);
        },
        buscarCervezaIndex(index){
            this.productoActual = this.cervezasFiltradas[index]
            console.log(this.productoActual);
        }
/*         searchbar(){
            this.cervezasFiltradas = this.cervezasFiltradas.toLowerCase().trim.includes(this.filtroInput.toLowerCase().trim())
        }, */
    },
    computed: {
        filtro(){
            let filtroCheckedTipo = this.cervezas.filter(cerveza => this.checked.includes(cerveza.tipoCerveza) || this.checked.length == 0);
            
            let filtroCheckedPresentacion = this.cervezas.filter(cerveza => this.checked.includes(cerveza.presentacion) || this.checked.length === 0)
            
            let filtroCheckedMarca = this.cervezas.filter(cerveza => this.checked.includes(cerveza.fabricante) || this.checked.length === 0)
            
            let filtroCheckedNombre = this.cervezas.filter(cerveza => this.checked.includes(cerveza.nombre) || this.checked.length === 0)

            this.tipoDeCerveza = (filtroCheckedTipo
                                    .filter(cerveza => cerveza.tipoCerveza
                                        .toLowerCase()
                                        .trim()
                                        .includes(this.filtroInput.toLowerCase().trim()))) 
            this.formato = (filtroCheckedPresentacion
                                    .filter(cerveza => cerveza.presentacion
                                        .toLowerCase()
                                        .trim()
                                        .includes(this.filtroInput.toLowerCase().trim())));
            this.marca = (filtroCheckedMarca
                                        .filter(cerveza => cerveza.fabricante
                                        .toLowerCase()
                                        .trim()
                                        .includes(this.filtroInput.toLowerCase().trim())));
            this.cervezasFiltradas = (filtroCheckedNombre
                                        .filter(cerveza => cerveza.nombre
                                        .toLowerCase()
                                        .trim()
                                        .includes(this.filtroInput.toLowerCase().trim()))) ;
            console.log(this.cervezasFiltradas);
            console.log(this.filtroInput)
            console.log(filtroCheckedNombre);


        },

       /*  filtroPresentacion(){
            let filtroChecked = this.cervezas
                                    .filter(cerveza => this.checked.includes(cerveza.presentacion) || this.checked.length === 0)
            this.cervezasFiltradas = filtroChecked
                                    .filter(cerveza => cerveza.presentacion
                                        .toLowerCase()
                                        .trim()
                                        .includes(this.filtroInput.toLowerCase().trim()));
        },
        filtroMarca(){
            let filtroChecked = this.cervezas
                                    .filter(cerveza => this.checked.includes(cerveza.fabricante) || this.checked.length === 0)
            this.cervezasFiltradas = filtroChecked
                                    .filter(cerveza => cerveza.fabricante
                                    .toLowerCase()
                                    .trim()
                                    .includes(this.filtroInput.toLowerCase().trim()));
        },
        filtroNombre(){
            let filtroChecked = this.cervezas
                                    .filter(cerveza => this.checked.includes(cerveza.nombre) || this.checked.length === 0)
            this.cervezasFiltradas = filtroChecked
                                    .filter(cerveza => cerveza.nombre
                                    .toLowerCase()
                                    .trim()
                                    .includes(this.filtroInput.toLowerCase().trim()));
        } */
    }
}).mount('#app')