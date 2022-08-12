<template>
  <v-container>
    <v-row class="full-width mb-12 mb-sm-n12" no-gutters>
      <v-col class="col-12">
        <v-card color="red accent-2" height="70" elevation="12"
          class="d-flex align-center justify-space-between rounded-xl mt-6">
          <img :src="`/logo.png`" position="center left" height="70" width="70" contain>
          <h3 class="text-h6 font-weight-black text-center text-shadow white--text">EXTRAVIADOS</h3>
          <div style="width:70px"></div>
        </v-card>
      </v-col>
    </v-row>
    <v-row> 
      <v-col class="col-12" v-for="lostdog in lostDogs.data" :key="lostdog.id">
        <v-card class="rounded-xl my-3" :to="`/extraviados/post/${lostdog.id}`">
          <v-card-title class="font-weight-black d-flex justify-space-between">
            <v-chip class="red darken white--text">{{lostdog.type}} perdido</v-chip>
            <v-chip class="font-weight-black black--text mb-0 text-subtitle-2">
              <v-icon>mdi-map-marker</v-icon>{{lostdog.city}}
            </v-chip>
          </v-card-title>
          <v-img :src="$axios.defaults.baseURL+lostdog.pictures[0].url" height="180px" cover>
          </v-img>
          <v-card-actions>
            <span class="font-weight-black black--text mb-0"><b>{{lostdog.name}}</b></span>
            <v-spacer></v-spacer>
            
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn fixed fab right bottom class="mb-12" @click="createModal = true" color="red accent-2">
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
    <encontradosCreateComponent v-model="createModal"></encontradosCreateComponent>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        lostDogs: {},
        createModal: false
      }
    },
    created() {
      this.getDogs()
    },
    methods: {
      async getDogs() {
        this.lostDogs = await this.$axios.get('/lostdogs')
      }
    },
    watch:{
      createModal() {
        this.getDogs()
      }
    }
  }

</script>

<style>

</style>
