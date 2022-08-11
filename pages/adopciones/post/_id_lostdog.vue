<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-card class="rounded-lg">
          <v-toolbar color="#00b7b7" class="elevation-0">
            <v-toolbar-title class="font-weight-black white--text">
              <span>{{lostDog.data.type}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
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
              {{lostDog.data.name}} es de {{lostDog.data.location}} tiene {{lostDog.data.year}} y esta buscando una
              familia para adoptarlo.
            </h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <p class="font-weight-bold black--text mb-0">{{lostDog.data.info}}</p>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col class="col-12">
                <v-btn large block color="success darken-1" class="black--text font-weight-black lostdog-buttons">
                  <v-icon>mdi-phone</v-icon>INICIAR ADOPCION<v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  const {
    createCanvas,
    loadImage,
  } = require('canvas')
  var QRCode = require('qrcode')

  export default {
    layout: 'simpleWithBackButton',
    components: {},
    data() {
      return {
        lostDog: {
          data: {}
        }
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'En adopcion',
        color: 'secondary',
      })
      this.getLostDog()
    },
    methods: {
      async getLostDog() {
        this.lostDog = await this.$axios.get(`/adopted-dogs/${this.$route.params.id_lostdog}`)
      },
      async createCanvas() {

        async function generateQR() {
          var opts = {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            quality: 0.9,
            margin: 4,
            color: {
              dark: "#ff9800",
              light: "#ffffff"
            }
          }
          return await QRCode.toDataURL('text', opts).then((url) => {
            return url
          })
        }


        var output = await this.$html2canvas(document.getElementById("divToTake"), {
          useCORS: true,
          scale: 3,
          windowWidth: 360,
          windowHeight: 640,
          backgroundColor: "#ffffff"
        })
        const canvas = createCanvas(690, 800)
        output = output.toDataURL('image/png')
        const ctx = canvas.getContext('2d')



        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        loadImage(output).then((img) => {
          var hRatio = canvas.width / img.width;
          var vRatio = canvas.height / img.height;
          var ratio = Math.min(hRatio, vRatio);
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, -10, img.width * ratio + 40, img.height * ratio +
            10);
        })
        await loadImage('/logo.png').then(image => {
          ctx.drawImage(image, 40, 40, 240, 90)
        })
        await generateQR().then(async (url) => {
          await loadImage(url).then(image => {
            console.log(url)
            ctx.drawImage(image, 520, 30, 120, 120)
          })
        })

        let downloadLink = document.createElement('a');
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        downloadLink.setAttribute('download', `${this.lostDog.data.name}.png`);
        downloadLink.setAttribute("href", image);
        downloadLink.click();

      },
      deletePublication(id) {
        this.$axios.delete(`/adopted-dogs/${id}`).then(() => {
          this.$router.push('/adopciones')
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
