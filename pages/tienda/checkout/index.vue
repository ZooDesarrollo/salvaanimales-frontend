<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-list>
          <v-list-item v-for="(product) in order.products" :key="product.id" class="elevation-2 mb-2 rounded-lg">
            <v-list-item-avatar class="rounded-lg" size="80">
              <v-img :src="product.product.pictures[0].url" v-if="product.product.pictures[0]"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black black--text mt-1">{{product.product.name}}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold primary--text mt-1" v-if="order.payment_method=='coins'"> 
                PTC {{product.product.price}}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="font-weight-bold primary--text mt-1" v-else>
                $ {{product.product.coins}}
              </v-list-item-subtitle>

            </v-list-item-content>
            <v-list-item-action>
              <v-input>
                <v-btn fab depressed x-small>
                  <v-icon color="red" :disabled="product.cant == 0" @click="product.cant--">mdi-minus</v-icon>
                </v-btn>
                <b class="pl-2 pr-2">{{product.cant}}</b>
                <v-btn fab depressed x-small @click="product.cant++">
                  <v-icon color="success darken-1">mdi-plus</v-icon>
                </v-btn>
              </v-input>
              <v-btn fab depressed x-small>
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col class="col-12">

      </v-col>
    </v-row>
    <v-card width="100%" class="card-resume rounded-t-xl">
      <v-card-text class="pb-0">
        <v-list dense v-if="order.payment_method=='coins'">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black black--text mt-1">Orden</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="font-weight-black">PTC {{sumProductsPrice}}</v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black black--text mt-1">Envio</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="font-weight-black">PTC 15</v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black black--text mt-1">Resumen</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="font-weight-black">PTC {{totalPrice}}</v-list-item-action>
          </v-list-item>

        </v-list>
        <v-list dense v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black black--text mt-1">Orden</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="font-weight-black">$ {{sumProductsPrice}}</v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black black--text mt-1">Envio</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="font-weight-black">$ 15</v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black black--text mt-1">Resumen</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="font-weight-black">$ {{totalPrice}}</v-list-item-action>
          </v-list-item>

        </v-list>

      </v-card-text>
      <v-card-actions class="pl-6 pr-6">
        <v-btn large block color="gradient-primary" class="white--text font-weight-black rounded-lg" @click="updateOrder()">
          PAGAR
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    layout: 'simpleWithBackButton',
    data() {
      return {
        order: {
          products: []
        }
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Carro de compras',
        color: 'secondary',
      })
      this.getOrder()
    },
    methods: {
      getOrder() {
        this.$axios.get('/orders/users/')
          .then((data) => {
            this.order = data.data
          })
      },
      updateOrder() {
        this.$axios.post('/orders/',this.order)
          .then((data) => {
            this.$router.push('/store/checkout/payment')
          })

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

<style scoped>
  .card-resume {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }

</style>
