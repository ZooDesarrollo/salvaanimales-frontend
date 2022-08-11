<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-card class="rounded-lg">
          <v-card-title class="font-weight-black secondary--text">
            Mi subscripcion <v-spacer></v-spacer>&nbsp;<v-icon color="primary">mdi-star</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-black">Estado</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-black">{{setSubscriptionStatus(subscription)}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-black">Finalizacion</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-black">{{formatDate(subscription.updated_at,30)}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-black">Info del ultimo pago</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-black">{{paymentData(subscription.status)}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-black">Fecha del ultimo pago</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-black">{{formatDate(subscription.updated_at,0)}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions v-if="setSubscriptionStatus(subscription) == 'Expirada'">
            <v-btn block rounded color="secondary" to="/account/subscription"
              class="font-weight-black text--darken-4">
              Subscribete ahora!&nbsp;<v-icon>mdi-star</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
    import moment from 'moment'
  export default {
    layout: 'simpleWithBackButton',
    data() {
      return {
        subscription: {}
      }
    },
    created() {
      this.$store.dispatch('titlePages/setTitlePage', {
        text: '',
        color: 'secondary'
      })
    },
    mounted() {
      this.getSubscriptionData()
    },
    methods: {
      async getSubscriptionData() {
        this.subscription = await this.getSubscription()
      },
      formatDate(date, days) {
          return moment(date).add(days,'days').format('DD/MM/YYYY')
      },
      paymentData(status) {
          switch(status) {
              case 'Pending': {
                  return 'Pago esperando aprobacion'
              }
              break;
              case 'Rejected': {
                  return 'Pago rechazado'
              }
              break;
              case 'Payed': {
                  return 'Pago aceptado con exito'

              }
              break;

            }
      },
    }
  }

</script>
