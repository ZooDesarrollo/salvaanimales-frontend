<template>
  <v-container d-flex align-center fill-height>
    <v-app-bar app color="primary" dense class="white--text font-weight-medium">
        <v-btn dense fab class="ml-2" to="/bienvenido" color="transparent" x-small depressed>
          <v-icon color="white" size="30">mdi-chevron-left</v-icon>
        </v-btn>
      <v-toolbar-title class="font-weight-black">Iniciar sesion</v-toolbar-title>
    </v-app-bar>
    <v-row no-gutters>
      <v-col class="col-12 text-center mb-6">
        <v-img src="/logo.png" class="ma-auto" width="300px" @click="$router.push('/home')"></v-img>
      </v-col>
      <v-col class="col-12">
        <v-text-field prepend-inner-icon="mdi-email" filled required label="Email" type="email" class="rounded-lg"
          v-model="profile.email"></v-text-field>
        <v-text-field required prepend-inner-icon="mdi-key-variant" label="Password" :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" filled class="rounded-lg"
          v-model="profile.password">
        </v-text-field>
        <v-btn large rounded style="width:100%" class="white--text font-weight-bold" color="primary"
          @click="loginUser()">INICIAR SESION</v-btn>
      </v-col>
      <v-col class="col-12 d-flex">
        <retrievePasswordComponent></retrievePasswordComponent>
      </v-col>
      <v-col class="col-12">
          <ProfileSocialLoginComponent></ProfileSocialLoginComponent>
      </v-col>
    </v-row>
    <!-- NewPassword -->
    <!-- ResetPassword -->
    <v-snackbar v-model="showSnackbar" timeout="1000" :color="snackBarColor">
      {{snackBarMessage}}
    </v-snackbar>
  </v-container>
</template>


<script>
  import axios from 'axios';
  import retrievePasswordComponent from '~/components/Login/retrievePasswordComponent.vue';
  export default {
    layout: 'disconected',
    components:{
      retrievePasswordComponent
    },
    data() {
      return {
        profile: {},
        show1: false,
        showSnackbar: false,
        email: '',
        snackBarMessage: 'Credenciales incorrectas',
      }
    },
    methods: {
      async loginUser() {
        this.loading = true
        try {
          await this.$auth.loginWith("local", {
            data: {
              identifier: this.profile.email,
              password: this.profile.password
            }
          })
          return this.$router.push('/account/steps/activar_notificaciones')
        } catch (e) {
          this.snackBarMessage = 'Credenciales incorrectas'
          this.showSnackbar = true
        }
      },
    },
    watch: {}
  }

</script>

<style scoped>
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
    margin: 8px;
  }

  .fb-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
    margin: 8px;
  }

</style>
