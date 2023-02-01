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
/*         searchbar(){
            this.cervezasFiltradas = this.cervezasFiltradas.toLowerCase().trim.includes(this.filtroInput.toLowerCase().trim())
        }, */
    },
    computed: {
        filtro(){
            let filtroChecked = this.cervezas
                                    .filter(cerveza => this.checked.includes(cerveza.tipoCerveza) || this.checked.length == 0);
            this.cervezasFiltradas = filtroChecked
                                    .filter(cerveza => cerveza.nombre
                                        .toLowerCase()
                                        .trim()
                                        .includes(this.filtroInput.toLowerCase().trim()));
            // if(this.checked.length === 0 ){
            //     this.cervezasFiltradas = this.cervezas;
            // }
            console.log(this.cervezasFiltradas);
            //console.log(this.checked);
            console.log(this.filtroInput)
        }
    }
}).mount('#app')