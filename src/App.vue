<template>
  <div id="app">
    <h1>Bem Vindo</h1>
    <h2>Por favor Digite Seu CEP: </h2>

    <vs-row>
      <vs-col>
        <vs-input
          v-model="cep"
          placeholder="digite o CEP aqui"
          v-mask="'#####-###'"
        />
      </vs-col>

      <vs-col>
        <vs-button @click="getAddress()">Pesquisar</vs-button>
      </vs-col>
    </vs-row>

    <vs-row v-show="address">
      <vs-col>        
        <fieldset>
          <legend>Dados</legend>
          <vs-list>
            <vs-list-item title="CEP" :subtitle="zipCode"></vs-list-item>
            <vs-list-item title="LOGRADOURO" :subtitle="publicPlace"></vs-list-item>
            <vs-list-item title="COMPLEMENTO" :subtitle="complement"></vs-list-item>
            <vs-list-item title="BAIRRO" :subtitle="district"></vs-list-item>
            <vs-list-item title="LOCALIDADE" :subtitle="location"></vs-list-item>
            <vs-list-item title="UF" :subtitle="state"></vs-list-item>
            <vs-list-item title="IBGE" :subtitle="ibge"></vs-list-item>
            <vs-list-item title="GIA" :subtitle="gia"></vs-list-item>
            <vs-list-item title="DDD" :subtitle="ddd"></vs-list-item>
            <vs-list-item title="SIAFI" :subtitle="siafi"></vs-list-item>
          </vs-list>          
        </fieldset>
      </vs-col>
    </vs-row>    

    <vs-popup
      title="CEP INVALIDO"
      :active.sync="popupError"
    >
      <p>CEP informado não trouxe nenhum resultado, por favor verifique e tente novamente</p>
    </vs-popup>
  </div>
</template>

<script>
import getAddress from '@/services/getAddress'

export default {
  name: 'App',
  data: () => ({
    cep: null,
    address : null,
    error: null,
    zipCode: null,
    publicPlace: null,
    complement: null,
    district: null,
    location: null,
    state: null,
    ibge: null,
    gia: null,
    ddd: null,
    siafi: null,
    popupError: false,
  }),
  created () {
		document.title = "Web Address";
	},

  methods: {
    getAddress() {
      this.$vs.loading();
      new getAddress()
      .getAddress(this.cep)
      .then(({ data }) => {
        this.address = Array.isArray(data) ? data : [data];
        console.log(this.address)

        if (this.address[0].erro == true) {
          this.address = null;
          this.popupError = true;  
        } else{
          this.zipCode = this.address[0].cep;
          this.publicPlace = this.address[0].logradouro;
          this.complement = this.address[0].complemento;
          this.district = this.address[0].bairro;
          this.location = this.address[0].localidade;
          this.state = this.address[0].uf;
          this.ibge = this.address[0].ibge;
          this.gia = this.address[0].gia == "" ? "Não Disponivel" : this.address[0].gia;
          this.ddd = this.address[0].ddd;
          this.siafi = this.address[0].siafi;
        }        
      })
      .catch(({ response }) => {
        this.address = null;
        this.popupError = true;
        if (response && response.data) {          
          this.error = response.data;
          console.log(response);
        }
      })
      .finally(() => {
          this.$vs.loading.close();                
      });
    }
  }
}
</script>

<style>
</style>
