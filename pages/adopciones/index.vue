<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-card color="#00b7b7" height="70" elevation="12" class="d-flex justify-space-between align-center rounded-xl">
          <img :src="`/logo.png`" position="center left" height="70" width="70" contain>
          <h3 class="text-h6 font-weight-black text-center text-shadow white--text">ADOPCIONES</h3>
          <div style="width:70px"></div>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <v-divider></v-divider>
      </v-col>
      <v-col class="col-12" v-for="lostdog in lostDogs.data" :key="lostdog.id">
        <v-card class="rounded-xl my-3" :to="`/adopciones/post/${lostdog.id}`">
          <v-card-title class="font-weight-black d-flex justify-space-between">
            <v-chip class="success darken-1 black--text">{{lostdog.type}}</v-chip>
          </v-card-title>
          <v-img :src="$axios.defaults.baseURL+lostdog.pictures[0].url" height="180px" cover>
          </v-img>
          <v-divider></v-divider>
          <v-card-text>
            <p class="font-weight-black black--text mb-0"><b>{{lostdog.name}}</b></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        lostDogs: {}
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Mascotas perdidas',
        color: 'secondary',
      })
      this.$store.dispatch('general/setShowBottomBar', true)
      this.getDogs()
    },
    methods: {
      async getDogs() {
        this.lostDogs = await this.$axios.get('/adopted-dogs')
      },
    }
  }

</script>

<style>

</style>
