<template>
  <logged-in-template>
    <template slot-scope="mainProps">
      <v-content class="white">
        <nuxt />
      </v-content>
      <bottomNavigationBarComponent></bottomNavigationBarComponent>
      <bottomSheetComponent v-model="drawer"></bottomSheetComponent>
    </template>
  </logged-in-template>
</template>

<script>
  import bottomNavigationBarComponent from '~/components/General/bottomNavigationBarComponent.vue'
  import bottomSheetComponent from '~/components/General/bottomSheetComponent.vue'
  import loggedInTemplate from "~/layouts/templates/loggedIn.vue"
  import titleToolbars from "~/components/General/titleToolbars.vue"
  import { App } from '@capacitor/app';


  export default {
    middleware: "auth",
    components: {
      titleToolbars,
      bottomNavigationBarComponent,
      loggedInTemplate,
      bottomSheetComponent
    },
    data() {
      return {
        addPublication: false,
        title: "Home",
        drawer: false
      }
    },
    created() {
      this.$store.dispatch('wallets/getCoins')
      App.addListener('backButton', ({ canGoBack }) => {
        if(canGoBack){
          window.history.back();
        } else {
          App.exitApp();
        }
      });

    },
    computed: {}
  }

</script>

<style scoped lang="scss">
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  .coins {
    .v-avatar {
      background: linear-gradient(-45deg, #FF9800, #fbaf02, #ff1865)!important;
      background-size: 400% 400%;
      animation: gradient 5s ease infinite;
      margin-left:-3px;
    }

  }

</style>
<style lang="scss">
  .coins {
      border: 3px solid!important;
      border-color: #fea001 !important;
    .v-btn__content {
      display: flex;
      justify-content: start;
    }
  }

</style>