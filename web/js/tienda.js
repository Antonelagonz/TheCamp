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
                this.json = response.data;
                this.cervezasFiltradas = this.json.map(nombreCerveza => nombreCerveza.nombre);
                this.tipoDeCerveza = this.json.map(tipo => tipo.tipoCerveza);
                this.formato = this.json.map(formato => formato.presentacion);
                this.marca = this.json.map(marca => marca.fabricante);
                this.funcionFiltroTipo();
                this.funcionFiltroFormato();
                this.funcionFiltroMarca();
                /* this.searchbar(); */
            })
            .catch(error => console.error(error))
        },
        funcionFiltroTipo(){
            this.setTipo = [... new Set(this.tipoDeCerveza)];
            console.log(this.setTipo);
        },
            funcionFiltroFormato(){
            this.setFormato = [... new Set(this.formato)];
            console.log(this.setFormato);
        },
        funcionFiltroMarca(){
            this.setMarca = [... new Set(this.marca)];
            console.log(this.setMarca);
        },
/*         searchbar(){
            this.cervezasFiltradas = this.cervezasFiltradas.toLowerCase().trim.includes(this.filtroInput.toLowerCase().trim())
        }, */
    },
    computed: {
        filtro(){
            let filtroChecked = this.json.filter(tipo =>this.checked.includes(tipo.tipoCerveza))
            this.cervezasFiltradas = filtroChecked.filter(name => name.nombre.toLowerCase().trim().includes(this.filtroInput.toLowerCase().trim()))
            if(this.checked.length === 0){
                this.cervezasFiltradas = this.json
            }
            console.log(this.cervezasFiltradas);
            console.log(this.checked);
        }
    }
}).mount('#app')