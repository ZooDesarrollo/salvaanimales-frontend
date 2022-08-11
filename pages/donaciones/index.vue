<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-card color="cyan lighten-3" height="70" elevation="12" class="d-flex align-center justify-space-between rounded-xl">
          <img :src="`/logo.png`" position="center left" height="70" width="70" contain>
          <h3 class="text-h6 font-weight-black text-center text-shadow white--text">DONACIONES</h3>
          <div style="width:70px"></div>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <v-divider></v-divider>
      </v-col>
      <v-card-text>
        <h4 class="text-h6 font-weight-black text-center">Selecciona uno de los montos precargados para donar.</h4>
      </v-card-text>
      <v-col class="col-6" v-for="(donation,index) in donations" :key="index">
        <v-card color="cyan lighten-3" height="150" elevation="6" @click="generateWhatsappLink(donation)"
          class="d-flex align-center rounded-xl">
          <v-card-text class="d-flex justify-center">
            <span class="text-h4 mr-4 font-weight-black black--text">
              $ {{donation}}
            </span>
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
        donations: [50, 100, 150, 250, 500, 1000]
      }
    },
    methods: {
      generateWhatsappLink(donation) {
        let url =
          `https://api.whatsapp.com/send?phone=59898772020&text=Hola,%20quiero%20donar%20${donation}%20pesos%20a%20la%20organización%20${this.user.name}.%20Gracias%20por%20contribuir%20con%20la%20vida%20de%20los%20animales.`;
        window.open(url, '_blank');
      }
    }
  }

</script>
