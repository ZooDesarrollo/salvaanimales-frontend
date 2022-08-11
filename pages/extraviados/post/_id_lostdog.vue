<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-card class="rounded-lg">
          <v-toolbar color="red accent-2" class="elevation-0">
            <v-toolbar-title class="font-weight-black white--text">
              <span>{{lostDog.data.type}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-chip class="font-weight-black black--text mb-0 text-subtitle-2">
              <v-icon>mdi-map-marker</v-icon>{{lostDog.data.city}}
            </v-chip>
          </v-toolbar>
          <v-card-text>
            <v-card class="rounded-lg">
              <v-carousel height="300px" hide-delimiters :show-arrows="false">
                <v-carousel-item v-for="(picture,index) in lostDog.data.pictures"
                  :src="$axios.defaults.baseURL+picture.url" :key="index" cover>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-btn block outlined depressed color="red" v-show="$auth.user.is_admin"
              @click="deletePublication(lostDog.data.id)">
              <v-icon color="red">mdi-delete</v-icon> Eliminar
            </v-btn>

          </v-card-actions>
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="font-weight-black black--text">
              Ayuda a {{lostDog.data.name}} a encontrar su hogar
            </h3>
            <p class="font-weight-bold black--text mb-0">{{lostDog.data.info}}</p>
          </v-card-text>
          <v-divider></v-divider>
          <div v-show="captureCreated">
            <v-card-text>
              <h3 class="font-weight-black black--text">
                telefono: {{lostDog.data.phone}}
              </h3>
            </v-card-text>
            <v-divider></v-divider>
          </div>
          <v-card-text>
            <h3 class="font-weight-black black--text">
              Donde lo encontraste?
            </h3>
            <map-component v-if="lostDog.data.lat" v-model="lostDog.data" :zoom="15"></map-component>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col class="col-12">
                <v-btn large block color="red accent-2 white--text font-weight-black lostdog-buttons"
                  @click="downloadScreenshot()">
                  <v-icon>mdi-phone</v-icon>CONTACTAR AHORA<v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="captureCreated" color="success darken-1">
      <span class="font-weight-black black--text">Captura de pantalla guardada en el telefono!</span>
    </v-snackbar>
  </v-container>
</template>

<script>
  import {
    Screenshot
  } from 'capacitor-screenshot';
  import {
    Filesystem,
    Directory,
    Encoding
  } from '@capacitor/filesystem';

  import mapComponent from '~/components/Map/mapComponent.vue'
  export default {
    layout: 'simpleWithBackButton',
    components: {
      mapComponent
    },
    data() {
      return {
        screenshot: Screenshot,
        captureCreated: false,
        lostDog: {
          data: {}
        }
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Mascotas perdidas',
        color: 'red accent-2',
      })
      this.getLostDog()
    },
    methods: {
      async getLostDog() {
        this.lostDog = await this.$axios.get(`/lostdogs/${this.$route.params.id_lostdog}`)
      },
      downloadScreenshot() {
        this.captureCreated = true
        setTimeout(() => {
          Screenshot.take().then(async (ret) => {
            await Filesystem.writeFile({
              path: "screenshot.jpg",
              data: ret.base64,
              directory: Directory.Documents,
            });
            this.captureCreated = false
          })
        }, 3000);

      },
      deletePublication(id) {
        this.$axios.delete(`/lostdogs/${id}`).then(() => {
          this.$router.push('/extraviados')
        })
      }
    }
  }

</script>

<style lang="scss">
  .lostdog-buttons {
    .v-btn__content {
      justify-content: space-around;
    }
  }

</style>
