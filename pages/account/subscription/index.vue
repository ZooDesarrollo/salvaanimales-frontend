<template>
  <v-container>
    <v-card class="rounded-lg">
      <v-toolbar color="secondary elevation-0">
        <v-toolbar-title class="font-weight-black white--text">Estas a punto de subscribirte!</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card outlined class="pa-3 text-center">
          <h3 class="font-weight-black secondary--text">A solo US$ 12 por mes</h3>
        </v-card>
      </v-card-text>
      <v-card-text>
        <StoreCheckoutCreditCardForm @submitForm="submitForm($event)">
          <template v-slot:titlebutton>
            SUBSCRIBIRME AHORA
          </template>
        </StoreCheckoutCreditCardForm>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  import Vue from 'vue'
  import LoadScript from 'vue-plugin-load-script';

  Vue.use(LoadScript);

  export default {
    layout: 'simpleWithBackButton',
    components: {},
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Subscribirse',
        color: 'secondary',
      })

    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      submitForm(data) {
        this.$axios.post(`/subscriptions/pay`, {
            token: data.token,
            tarjeta: data.paymentMethod,
            ci: data.ci,
            type: this.$route.query.type,
            idProducto: this.$route.params.id_producto
          })
          .then(data => {
              return;
            this.procesando = false
            this.$router.push(
              `/account/user/products/impulsar/${this.$route.params.id_producto}/pago/finalizar/${data.data.id}/`);
          });

      },
    }
  }

</script>

<style>
  .cardfield-base {
    background: rgba(0, 0, 0, 0.06);
    padding: 15px;
    border-radius: 10px;
  }

  .cardfield-base input {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 900 !important;
  }

</style>
