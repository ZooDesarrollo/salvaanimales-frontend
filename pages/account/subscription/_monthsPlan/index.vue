<template>
  <v-container>
    <creditCardForm @changeStatusPayment="submitForm($event)"></creditCardForm>
  </v-container>
</template>
<script>
  import creditCardForm from "~/components/Store/Checkout/creditCardForm.vue";
  import Vue from 'vue'
  import LoadScript from 'vue-plugin-load-script';

  Vue.use(LoadScript);

  export default {
    layout: 'simpleWithBackButton',
    components: {
      creditCardForm,
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Subscribirse',
        color: 'secondary',
      })

    },
    data() {
      return {
        type: {
          3: {
            name: 'Basic',
            price: 36,
            months: 3
          },
          6: {
            name: 'Premium',
            price: 72,
            months: 6
          },
          12: {
            name: 'Gold',
            price: 144,
            months: 12
          },
        },
        dlocal: null,
        monthPlan: this.$route.params.monthsPlan,
        cvvField: null,
        cardNumberField: null,
        expirationField: null,
        rules: {
          requerido: [value => !!value || "Requerido."],
          email: [
            v => !!v || "E-mail is required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
          ]
        },
        card: null,
        fieldsFilled: {
          card: false,
          cvv: false,
          expiration: false
        }
      }
    },
    mounted() {
    },
    methods: {
      submitForm(e) {
        this.$axios.post(`/subscriptions/createSubscription`,e)
          .then((data) => {
            console.log(data.data)
          })
      }
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
