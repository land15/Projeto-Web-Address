<template>
  <div id="app">
    <h1>Bem Vindo</h1>

    <address_table/>
  </div>
</template>

<script>
import address_table from './components/address_table.vue';
export default {
  name: 'App',
  components: {
    address_table,
  },
  created () {
		document.title = "Web Address";
	},
}
</script>

<style>

</style>
