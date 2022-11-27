<template>
  <div id="app">
    <h1>Bem Vindo</h1>
    <h2>Por favor Digite Seu CEP: </h2>

    <vs-row>
      <vs-col>
        <vs-input
          v-model="cep"
          placeholder="digite o CEP aqui"
        />
      </vs-col>

      <vs-col>
        <vs-button @click="getAddress()">Pesquisar</vs-button>
      </vs-col>
    </vs-row>

    <p>{{address}}</p>
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
      })
      .catch(({ response }) => {
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
