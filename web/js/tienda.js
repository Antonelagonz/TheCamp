const {createApp} = Vue; 

createApp({
    data(){
        return{
            json: [],
            cervezas: [],
            tipoDeCerveza: [], 
            filtroCheckbox: [],
            checked: [],
            filtroSearchbar: [], //para comparar los datos
            filtroInput: '', //es para lo que ingrese el usuario
            formato: [],
            filtroFormato: [],
            carrito: {},
            tipos: [],
        }
    },
    created(){
        this.loadData();
        this.funcionFiltroCheckbox();
        this.funcionFiltroFormato();
    },
    methods:{
        loadData(){
            axios.get("./js/json-cervezas.json")
            .then(response =>{
                this.json = response.data;
                this.filtroSearchbar = this.json.map(nombreCerveza => nombreCerveza.nombre);
                this.tipoDeCerveza = this.json.map(tipo => tipo.tipoCerveza);
                this.formato = this.json.map(formato => formato.presentacion);
                console.log(this.json);
                console.log(this.filtroSearchbar);
                console.log(this.tipoDeCerveza);
                console.log(this.formato);
            })
            .catch(error => console.error(error))
        },
        funcionFiltroCheckbox(){
            this.filtroCheckbox = [... new Set(this.json.filter(tipo => tipo.tipoCerveza).map(tipo => tipo.tipoCerveza))];
            console.log(this.filtroCheckbox);
        },
        funcionFiltroFormato(){
            this.filtroFormato = [... new Set(this.formato)]
            console.log(this.filtroFormato);
        },
        searchbar(){
            this.filtroSearchbar = this.json.filter(name => name.nombre.toLowerCase().trim.includes(this.filtroInput.toLowerCase().trim()))
        }
    },
    computed: {
        filtro(){
            let filtroChecked = this.json.filter(tipo => this.checked.includes(tipo.tipoCerveza) || this.checked.length ===0)
            this.filtroSearchbar = filtroChecked.filter(name => name.nombre.toLowerCase().trim().includes(this.filtroInput.toLowerCase().trim()))
            console.log(this.filtroSearchbar);
        }
    }
}).mount('#app')