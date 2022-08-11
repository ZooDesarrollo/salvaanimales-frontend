<template>
  <loggedIn-template>
    <template slot-scope="mainProps">
      <titleToolbars>
        <template>
          <v-btn fab x-small color="grey lighten-1 mr-2" depressed @click="$router.go(-1)">
            <v-icon color="black" size="25">
              mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title class="black--text font-weight-black pl-0">
            {{mainProps.titles.text}}
          </v-toolbar-title>
        </template>
      </titleToolbars>
      <v-content class="white lighten-5">
        <nuxt style="margin-top:-15px;" />
      </v-content>
      <bottomNavigationBarComponent v-if="showBottomBar"></bottomNavigationBarComponent>
    </template>
  </loggedIn-template>
</template>

<script>
  import titleToolbars from "~/components/General/titleToolbars.vue"
  import loggedInTemplate from "~/layouts/templates/loggedIn.vue"
  import bottomNavigationBarComponent from '~/components/General/bottomNavigationBarComponent.vue'
  import { App } from '@capacitor/app';

  export default {
    middleware: "auth",
    components: {
      titleToolbars,
      loggedInTemplate,
      bottomNavigationBarComponent
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
    computed: {
      showBottomBar() {
        return this.$store.getters['general/showBottomBar']
      }
    }
  }

</script>
