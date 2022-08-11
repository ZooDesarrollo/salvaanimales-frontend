<template>
  <v-container>
    <v-stepper v-model="paymentSteps" flat class="elevation-0">
      <v-stepper-header class="elevation-0">
        <v-stepper-step :complete="paymentSteps > 1" step="1">
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="paymentSteps > 2" step="2">
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div style="height:80vh">
            <addresses @value="order.address = $event"></addresses>
            <v-btn x-large height="50px" color="gradient-secondary white--text font-weight-bold rounded-lg"
              @click="nextStep()" block>
              SIGUIENTE
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <creditCardForm @changeStatusPayment="createPayment($event)"></creditCardForm>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card v-if="order.status == 'Rejected'" class="rounded-xl elevation-3 my-3">
            <v-toolbar color="red" class="elevation-0">
              <v-toolbar-title class="white--text">
                Hubo un error
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="d-flex flex-column justify-center">
              <v-icon color="red" class="icon">fa-times</v-icon>
              <p>Tu publicacion fue rechazada, revisa nuevamente los datos de tu tarjeta y vuelve a intentarlo</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="gradient-primary font-weight-black" to="/" outlined block>IR AL INICIO&nbsp;<v-icon>mdi-home</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else-if="order.status == 'Finished'" class="rounded-xl elevation-3 my-3">
            <v-toolbar color="gradient-secondary" class="elevation-0">
              <v-toolbar-title class="white--text">
                Felicitaciones!
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="d-flex flex-column justify-center">
              <v-icon color="success" class="icon">mdi-checkbox-marked-circle</v-icon>
              <p>Compra realizada con exito!</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="gradient-primary font-weight-black" to="/" outlined block>IR AL INICIO&nbsp;<v-icon>mdi-home</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card outlined v-else class="rounded-xl elevation-3 my-3">
            <v-toolbar color="gradient-primary" class="elevation-0">
              <v-toolbar-title class="white--text">
                En espera
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="d-flex flex-column justify-center">
              <v-icon color="gradient-primary" class="icon">mdi-clock</v-icon>
              <p>Tu compra esta siendo revisada, te avisaremos a la brevedad!</p>
            </v-card-text>
            <v-card-actions>
              <v-btn to="/" color="gradient-primary font-weight-black" outlined block>IR AL INICIO&nbsp;<v-icon>mdi-home</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
  import addresses from '~/components/Store/Checkout/addresses.vue'
  import creditCardForm from '~/components/Store/Checkout/creditCardForm.vue'
  export default {
    layout: 'simpleWithBackButton',
    components: {
      addresses,
      creditCardForm
    },
    data() {
      return {
        paymentSteps: 3,
        order: {
          products: [],
          discount: 0
        },
        addresses: {},
        wallet: {}
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Entregar en',
        color: 'secondary',
      })
      this.getOrder()
      this.getAdresses()
      this.getWallet()
    },
    methods: {
      nextStep() {
        switch (this.paymentSteps) {
          case 1:
            this.updateAddress()
            this.paymentSteps = 2
            break;
          case 2:

            break;
          case 3:

            break;

          default:
            break;
        }
      },
      async updateAddress() {
        if (!this.order.address) return
        await this.$axios.post('/orders/', this.order)
        this.paymentSteps = 2
      },
      getOrder() {
        this.$axios.get('/orders/users')
          .then((data) => {
            this.order = data.data
          })
      },
      createPayment(e) {
        this.$axios.put(`/orders/${this.order.id}`, e)
          .then(() => {
            this.$axios.get(`/orders/${this.order.id}`)
              .then((data) => {
                this.order = data.data
                this.paymentSteps = 3

              })
          })
      },
      checkCoins($e) {
        if ($e > this.wallet.coins) {
          this.order.discount = this.wallet.coins
          console.log(this.order.discount)
        } else {
          this.order.discount = $e
        }
      },
      async getAdresses() {
        this.addresses = await this.$axios.get('/customer-addresses')
      }
    },
    computed: {
      sumProductsPrice() {
        return this.order.products.reduce((a, b) => {
          return a + b.product.price * b.cant
        }, 0)
      },
      totalPrice() {
        return this.sumProductsPrice + 15
      }
    }
  }

</script>

<style>

</style>
