const {createApp} = Vue;

createApp({
    data(){
        return{
            json: [],
            cervezasLata: [],
            antares: [],
            laPaloma: [],
            gluck: [],
            imperial: [],
            quilmes: [],
            temple: [],
            penonDelAguila: []
        }
    },
    created(){
        this.loadData();
    },
    methods: {
        loadData(){
            axios.get("./js/json-cervezas.json")
            .then(response =>{
                console.log(response);
                this.json = response.data;
                this.cervezasLata = this.json.filter(cerveza => cerveza.presentacion === "LATA")
                this.antares = this.cervezasLata.filter(cerveza => cerveza.fabricante === "Antares");
                this.laPaloma = this.cervezasLata.filter(cerveza => cerveza.fabricante === "La Paloma");
                this.gluck = this.cervezasLata.filter(cerveza => cerveza.fabricante === "Gluck");
                this.imperial = this.cervezasLata.filter(cerveza => cerveza.fabricante === "Imperial");
                this.quilmes = this.cervezasLata.filter(cerveza => cerveza.fabricante === "Quilmes");
                this.temple = this.cervezasLata.filter(cerveza => cerveza.fabricante === "Temple");
                this.penonDelAguila = this.cervezasLata.filter(cerveza => cerveza.fabricante === "Peñon del Águila")
                console.log(response.data.data)
                console.log(this.json)
                console.log(this.cervezasLata)
                console.log(this.laPaloma)
                console.log(this.gluck)
                console.log(this.imperial)
                console.log(this.quilmes)
                console.log(this.penonDelAguila);
            })
/*             .then((response) =>{
                this.json = response.data.data;
                this.antares = this.json.filter(cerveza => cerveza.fabricante === "Antares");
                this.laPaloma = this.json.filter(cerveza => cerveza.fabricante === "La Paloma");
                this.gluck = this.json.filter(cerveza => cerveza.fabricante === "Gluck");
                this.imperial = this.json.filter(cerveza => cerveza.fabricante === "Imperial");
                this.quilmes = this.json.filter(cerveza => cerveza.fabricante === "Quilmes");
                console.log(response.data.data)
                console.log(this.json)
                console.log(this.antares)
                console.log(this.laPaloma)
                console.log(this.gluck)
                console.log(this.imperial)
                console.log(this.quilmes)
            }) */
            .catch((error => console.log(error)));
        }
    },
}).mount("#app");