<template>
  <section class="mt-n12">
    <v-card class="col-12 top-background background-container primary d-flex align-end">
      <div class="fill-width">
      <v-text-field label="Buscar" filled hide-details class="rounded-lg white--text" append-icon="mdi-magnify"
        v-model="search.name_contains" @click:append="getProducts()" color="white" background-color="#ffffff80">
      </v-text-field>
      <v-card-title class="justify-center white--text font-weight-black">EMPRENDIMIENTOS</v-card-title>
      </div>
    </v-card>
    <v-container>
      <v-row class="mt-2">
        <v-col class="col-12 col-md-12" v-for="(business) in businesses" :key="business.id">
          <businessesCardComponent :business="business"></businessesCardComponent>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  import bestProducts from '~/components/Store/bestProducts.vue'
  import generalProducts from '~/components/Store/generalProducts.vue'
  export default {
    components: {
      bestProducts,
      generalProducts
    },
    data() {
      return {
        modalCategories: false,
        businesses: [],
        search: {}
      }
    },
    created() {
      this.getBusinesses()
    },

    methods: {
      getBusinesses() {
        this.businesses = []

        this.$axios.get(`/businesses/`, {
            params: this.search
          })
          .then((data) => {
            this.businesses = data.data
          })
      }
    },
  }

</script>
<style scoped>
  .top-background {
    height: 22vh;
    border-bottom-left-radius: 30px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

</style>
