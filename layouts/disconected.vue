<template>
    <v-app>
      <v-main class="pa-0 overflow">
        <v-content>
          <nuxt />
        </v-content>
      </v-main>
    </v-app>
  </template>

<script>
  import { App } from '@capacitor/app';

    export default {
        middleware(cntx) {
            if (cntx.$auth.loggedIn) {
                //cntx.redirect("/")
            }
        },
        data() {
            return {
                drawer: false
            }
        },
        created() {
      App.addListener('backButton', ({ canGoBack }) => {
        if(canGoBack){
          window.history.back();
        } else {
          App.exitApp();
        }
      });
        },
        methods: {
            logout() {
                this.$auth.logout()
                this.$router.push('/login')
            }
        },
    }
</script>