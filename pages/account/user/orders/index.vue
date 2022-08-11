<template>
  <v-container class="pt-4">
    <v-row>
      <v-col class="col-6 col-md-6">
        <v-btn rounded @click.native="params.status = 'Pending'" block class="font-weight-black"
          :depressed="params.status != 'Pending'" :class="{
              'gradient-primary white--text':params.status == 'Pending'
          }">
          Pendientes
        </v-btn>
      </v-col>
      <v-col class="col-6 col-md-6 text-right">
        <v-btn rounded @click.native="params.status = 'Finished'" block class="font-weight-black"
          :depressed="params.status == 'Pending'" :class="{
              'gradient-primary white--text':params.status == 'Finished'
          }">
          Finalizadas
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12">
        <v-card v-for="(order) in orders" outlined :key="order.id" class="mb-4 rounded-xl"
          :to="`/account/user/orders/${order.id}`">
          <v-card-text>
            <v-row>
              <v-col class="col-6">
                <v-row no-gutters>
                  <v-col class="col-12 mb-3 ">
                    <h2 class="black--text">Compra en la tienda</h2>
                  </v-col>
                  <v-col class="col-12">
                      <p class="font-weight-black mb-0 black--text">
                      <v-icon color="black" class="mb-1">
                          {{(order.payment_method=='coins')?'mdi-paw':'mdi-currency-usd'}}
                      </v-icon>
                      {{totalPrice(order)}}
                      </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="col-6">
                <v-row no-gutters>
                  <v-col class="col-12 text-right  mb-3 black--text"># {{order.id}}</v-col>
                  <v-col class="col-12 border-left text-right">
                    <span class="black--text">Fecha:</span><br>
                    <b
                      class="black--text">{{moment(order.created_at).locale('es').format('DD [de] MMMM [de] YYYY')}}</b>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  const moment = require('moment')
  export default {
    layout: 'simpleWithBackButton',
    data() {
      return {
        moment: moment,
        orders: [],
        pendientOrders: true,
        params: {
          status: 'Pending',
          user: this.$auth.user.id,
          _sort: "id:DESC"
        }
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: 'Mis compras',
        color: 'secondary',
      })
      this.getOrders()
    },
    methods: {
      getOrders() {

        this.$axios.get(`/orders/`, {
            params: this.params
          })
          .then((data) => {
            this.orders = data.data
          })
      },
      totalPrice(order) {
        if (order.payment_method == 'coins') {
          return order.products[0].product.coins
        } else {
          return order.products.reduce((a, b) => {
            return a + b.product.price * b.cant
          }, 0)
        }
      }
    },
    watch: {
      params: {
        handler() {
          this.getOrders()
        },
        deep: true
      }
    }
  }

</script>

<style>
  .border-left {
    border-left: 1px solid #0000002e;
  }

</style>
