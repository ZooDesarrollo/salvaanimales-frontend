<template>
  <div>
    <v-dialog v-model="showResetPass" max-width="500px" transition="dialog-transition" class="text-center">
      <v-card>
        <v-toolbar color="primary" class="white--text elevation-0">
          <v-toolbar-title>
            Nueva contraseña
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <p>Copia el codigo que te enviamos por email y pegalo aqui</p>
          <v-text-field name="contraseña" type="password" prepend-inner-icon="mdi-key-variant" filled class="rounded-lg"
            label="Contraseña" v-model="resetPass">
          </v-text-field>
          <v-text-field name="contraseña_confirm" hide-details type="password" prepend-inner-icon="mdi-key-variant"
            filled class="rounded-lg" label="Confirmacion de contraseña" v-model="resetPassConf">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="verde_fuerte" class="white--text" @click="resetPassword">Cambiar contraseña</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showNewPassword" max-width="500px" transition="dialog-transition" class="text-center">
      <v-card>
        <v-toolbar color="primary" class="white--text elevation-0">
          <v-toolbar-title>
            Reseteo de contraseña
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="py-3">
          <v-text-field name="email" hide-details filled prepend-inner-icon="mdi-email" class="rounded-lg"
            label="Tu email" v-model="email" color="primary"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn small color="verde_fuerte" outlined @click="showResetPass = true">Ingresar codigo</v-btn>
          <v-spacer></v-spacer>
          <v-btn small color="verde_fuerte" class="white--text" @click="newPassword">Enviar email</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="py-3">
      <span @click="showNewPassword = true" class="grey--text mt-3 font-weight-medium">¿Olvidaste tu
        contraseña?</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showNewPassword: false,
        showResetPass: false,
        password_code: '',
        resetPass: '',
        resetPassConf: '',

      }
    },
    created() {
      this.checkVal()
    },
    methods: {
      checkVal() {
        if (this.$route.query.password_code != undefined) {
          this.showResetPass = true
          this.password_code = this.$route.query.password_code
        }
      },
      resetPassword() {
        axios.post(this.$axios.defaults.baseURL + '/auth/reset-password', {
          code: this.password_code,
          password: this.resetPass,
          passwordConfirmation: this.resetPassConf

        }).then((response) => {
          this.snackBarMessage = 'Nueva contraseña lista'
          this.showResetPass = false
          this.showNewPassword = false
          this.showSnackbar = true
        }).catch(error => {
          this.snackBarMessage = 'Contraseñas no coinciden'
          this.showSnackbar = true
        })
      },
      newPassword() {
        axios.post(this.$axios.defaults.baseURL + '/auth/forgot-password', {
          email: this.email
        }).then(response => {
          this.showNewPassword = false
          this.showResetPass = true
        })
      },

    }
  }

</script>

<style>

</style>
