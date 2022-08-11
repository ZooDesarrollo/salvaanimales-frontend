<template>
  <v-container>
    <cardPaymentWall @changeStatusPayment="createPayment($event)"></cardPaymentWall>
  </v-container>
</template>

<script>
  import addresses from '~/components/Store/Checkout/addresses.vue'
  import cardPaymentWall from '~/components/Store/Checkout/cardPaymentWall.vue'
  export default {
    layout: 'simpleWithBackButton',
    components: {
      addresses,
      cardPaymentWall
    },
    data() {
      return {
        paymentSteps: 1,
        order: {
          products: [],
          discount: 0
        },
        addresses: {},
        wallet: {},
        frame:{}
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
      this.getFrame()
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

      async getFrame() {
        this.frame = await this.$axios.get('/subscriptions/testpaymentwall/')
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
        this.$axios.put(`/orders/${this.order.id}`, {status:e})
          .then((data) => {
            this.order = data.data
            this.paymentSteps = 3
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
