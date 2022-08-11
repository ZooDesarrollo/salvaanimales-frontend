<template>
  <v-container class="background-registro">
    <v-app-bar app color="primary" dense class="white--text font-weight-medium">
      <v-btn dense fab class="ml-2" to="/bienvenido" color="transparent" x-small depressed>
        <v-icon color="white" size="30">mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-black">Registrate</v-toolbar-title>
      <v-spacer></v-spacer>
      <img src="/logo.png" contain width="50px">
    </v-app-bar>
    <v-row>
      <v-col class="col-12">
        <v-card>
          <v-toolbar elevation="0" color="primary" dense class="white--text font-weight-medium">
            <v-toolbar-title class="font-weight-black">Estas a un paso!</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row no-gutters>
              <!-- ==== -->
              <v-col class="col-12 col-md-12">
                <v-text-field required label="Nombre" dense outlined class="rounded-lg" type="email"
                  v-model="user.first_name">
                </v-text-field>
              </v-col>
              <v-col class="col-12 col-md-12">
                <v-text-field required label="Apellido" outlined dense class="rounded-lg" type="email"
                  v-model="user.last_name">
                </v-text-field>
              </v-col>
              <v-col class="col-12 col-md-12">
                <v-text-field required label="Email" outlined dense class="rounded-lg" type="email"
                  v-model="user.email">
                </v-text-field>
              </v-col>

              <v-col class="col-12 col-md-12">
                <v-text-field required outlined dense class="rounded-lg" color="grey darken-1" label="Telefono"
                  type="number" v-model="user.username">
                </v-text-field>

              </v-col>

              <v-col class="col-12 col-md-12">
                <v-textarea required outlined dense class="rounded-lg" color="grey darken-1"
                  label="Hablanos sobre ti..." type="number" v-model="user.description">
                </v-textarea>

              </v-col>

              <v-col class="col-12 col-md-12">
                <v-text-field required outlined dense class="rounded-lg" label="Password" placeholder="Password"
                  :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword" v-model="user.password">
                </v-text-field>

              </v-col>
              <v-col class="col-12 col-md-12">
                <v-text-field required outlined dense class="rounded-lg" label="Confirmar Password"
                  placeholder="Confirmar Password" color="white" :type="showConfirmPassword ? 'text' : 'password'"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showConfirmPassword = !showConfirmPassword" v-model="confirmPassword">
                </v-text-field>

              </v-col>
              <v-col class="col-12 d-flex">
                <v-btn block x-large class="white--text font-weight-bold" color="primary" @click="createProfile()">CREAR
                  USUARIO
                </v-btn>
              </v-col>
              <v-col class="col-12 pr-10 pl-10 text-center text-caption">
                <div class="pa-5">
                  Al crear una cuenta estas aceptando los terminos los <a>termino y condiciones</a> de ONG Salva animales y sus
                  <a>politica de privacidad</a>
                </div>
              </v-col>

            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="showSnackbar" timeout="1000" label="aver">
      Error en el registro
    </v-snackbar>

  </v-container>
</template>


<script>
  import axios from 'axios';
  export default {
    layout: 'disconected',
    data() {
      return {
        user: {
        },
        profile_picture: null,
        googleSignInParams: {

        },
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true
        },
        showSnackbar: false,
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        notificar: true,
        loading: false,
        rules: {
          required: [value => !!value || 'Required.'],
        }
      }
    },
    computed: {
      initialImage() {
        return (this.profile_picture.url == '') ? null : this
          .profile_picture.url
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Registrate ahora!',
        color: 'secondary'
      })
    },
    methods: {
      createProfile() {
        this.loading = true
        if (this.user.password != this.confirmPassword) {
          this.showSnackbar = true
          this.loading = false
          return;
        }

        const uploadFile = (img, userID) => {
          const profilePicture = new FormData()
          profilePicture.append('field', 'profile_picture')
          profilePicture.append('files', img)
          profilePicture.append('source', 'users-permissions');
          profilePicture.append('ref', 'user')
          profilePicture.append('refId', userID)
          return axios.post(`/upload`, profilePicture)
        }


        axios.post(this.$axios.defaults.baseURL + '/auth/local/register', this.user)
          .then(async (data) => {
            await this.login()
          }).catch((err) => {
            this.showSnackbar = true
            this.loading = false
          })
      },
      async login() {
        this.loading = true
        try {
          await this.$auth.loginWith("local", {
            data: {
              identifier: this.user.email,
              password: this.user.password
            }
          });
          return this.$router.push('/')
        } catch (e) {}
      },
      onSignInSuccessGoogle(googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user.
        // See https://developers.google.com/identity/sign-in/web/reference#users
        const profile = googleUser.getBasicProfile() // etc etc
      },
      onSignInSuccessFacebook(response) {
        FB.api('/me', dude => {
          console.log(`Good to see you, ${dude.name}.`)
        })
      },
      onSignInError(error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
      }
    }
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

  .loading {
    position: absolute;
    top: 10px;
    left: calc(50vw - 25px);
  }

  .relative {
    position: relative;
  }

</style>
