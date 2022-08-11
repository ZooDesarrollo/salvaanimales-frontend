<template>
  <section>
    <v-carousel height="300" hide-delimiters class="mt-n14 elevation-2">
      <v-carousel-item v-for="(picture,index) in product.pictures" :src="$axios.defaults.baseURL+picture.url" :key="index" cover>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <v-row>
        <v-col class="col-6">
          <h3 class="font-weight-black black--text">{{product.name}}</h3>
        </v-col>
        <v-col class="col-6 text-right">
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-6 font-weight-bold">
          <v-icon color="black">mdi-currency-usd</v-icon> {{product.price}}
        </v-col>
        <v-col class="col-12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <h4 class="font-weight-black">Descripcion</h4>
          <p class="font-weight-bold">{{product.description}}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-app-bar app bottom color="white" class="elevation-3 product-bottom-bar" height="50">
      <v-btn block small color="teal lighten-1" class="white--text font-weight-bold rounded-lg">
        COMPRAR!&nbsp;&nbsp;<v-icon>ion-ios-cart</v-icon>
      </v-btn> 
    </v-app-bar>
  </section>
</template>

<script>
  export default {
    layout: 'simpleWithBackButton',
    data() {
      return {
        product: {
          categories: []
        }
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: '',
        color: 'teal lighten-1'
      })
      this.$store.dispatch('general/setShowBottomBar',false)

      this.getProduct()
    },
    methods: {
      getProduct() {
        this.$axios.get(`/productos/${this.$route.params.id_product}`)
          .then((data) => {
            this.product = data.data
          })
      },
      buyProduct(method) {
        let data = {
          payment_method: method,
          user: this.$auth.user,
          status:'Pending',
          products: [{
            product: this.product,
            cant: 1
          }]
        }
        this.$axios.post(`/orders/`, data)
          .then((data) => {
            if(method == 'coins') {
              this.$router.push('/store/checkout')              
            } else {
            this.$router.push('/account/user/orders/'+data.data.id)

            }
          })
      }
    }
  }

</script>

<style lang="scss">
.product-bottom-bar{
  .v-toolbar__content{
    display: flex;
    flex-direction: column;
  }
}
</style>
