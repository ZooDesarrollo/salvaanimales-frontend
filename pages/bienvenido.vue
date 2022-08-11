<template>
  <v-container class=" pa-0">
    <v-card height="100vh" outlined>
      <div class="pa-4">
        <v-card-text>
        <v-img src="/logo.png" class="ma-auto" width="200px"></v-img>
        </v-card-text>
        <v-card-title class=" text-center d-flex justify-center">
          <h2 class="primary--text">Bienvenidos</h2>
        </v-card-title>
        <v-card-text>
          <loginFormComponent></loginFormComponent>
        </v-card-text>
        <v-card-actions>
              <v-btn rounded block large  outlined depressed style="border:width:5px!important" color="primary darken-1" to="/registro"
                class="white--text font-weight-black">
                Crear cuenta
              </v-btn>
        </v-card-actions>
      </div>
    </v-card>

  </v-container>
</template>

<script>
  export default {
    layout: 'empty',
    data() {
      return {
        section: 0,
        logo: 'logo.png',
        title: [
          'Bienvenidos',
          'Vivo',
          'Perimetro Virtual',
          'Seguimiento de actividad',
        ],
        imgs: [
          '1.jpg',
          '2.png',
          '3.png',
          '4.png',
        ],
        txts: [
          'Localizador de mascotas que ayuda a controlar la ubicacion de tu mascota y sus actividades siempre seguros.',
          'El modo vivo te permite ver la ubicacion en vivo de tu mascota, lo que te permite estar siempre conectados.',
          'Crear una valla virtual, delimita la zona importante y recibe notificaciones si tu mascota entra o sale de ellas',
          'Controla los niveles de actividad de tu mascota para asegurarte de que tiene actividad fisica durante el dia, para tener una mascota sana y en forma.'
        ]
      }
    },
    computed: {
      imgSection() {
        return this.imgs[this.section]
      },
      txtSection() {
        return this.txts[this.section]
      }
    },
    methods: {
      changeView() {
        if (this.section == 3) {
          this.$router.push('/home')
        } else {
          this.section++
        }
      }
    }
  }

</script>

<style scoped>
  .v-btn {
    padding: 200px;
  }

  .mb100 {
    margin-bottom: 100%;
  }

  .cover-photo {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

</style>
