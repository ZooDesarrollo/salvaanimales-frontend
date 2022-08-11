<template>
  <v-bottom-sheet :value="value" class="gradient-primary" inset @click:outside="$emit('input', false)">
    <v-list nav dense class="pl-3 pt-3 gradient-primary bottom-sheet">
      <v-btn fab @click="$emit('input', false)" absolute x-small right depressed outlined color="white">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
      <v-list-item-group v-if="$auth.loggedIn">
        <v-list-item class="mb-5" two-line>
          <v-list-item-avatar size="70" v-if="$auth.user.profile_picture">
            <img :src="$axios.defaults.baseURL + $auth.user.profile_picture.url">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              <h2>{{$auth.user.username}}</h2>
            </v-list-item-title>
            <v-list-item-subtitle class="white--text">Maldonado</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/myPets">
          <v-list-item-icon>
            <v-icon color="white">mdi-bell</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold white--text">Mis mascotas</v-list-item-title>
        </v-list-item>

        <v-list-item to="/account/subscription/mysubscription">
          <v-list-item-icon>
            <v-icon color="white">mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold white--text">Mi subscripcion</v-list-item-title>
        </v-list-item>
        <v-list-item to="/account/user/orders">
          <v-list-item-icon>
            <v-icon color="white">mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold white--text">Mis compras</v-list-item-title>
        </v-list-item>

        <v-list-item to="/account/user/setup">
          <v-list-item-icon>
            <v-icon color="white">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold white--text">Configuracion</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon color="white">mdi-exit</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold white--text">Desconectarse</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-bottom-sheet>

</template>

<script>
  export default {
    props: {
      value: Boolean
    },
    methods: {
      logout() {
        this.$auth.logout()
        return this.$router.push('/home')
      }


    }
  }

</script>
<style scoped>
  .bottom-sheet {
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
  }

</style>
