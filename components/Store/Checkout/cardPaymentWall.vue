<template>
  <v-card>
    <v-toolbar color="secondary elevation-0">
        <v-toolbar-title class="font-weight-black white--text">
          <slot name="title-form"></slot>
        </v-toolbar-title>
      </v-toolbar>
    <iframe :src="frame.data" width="100%" height="500px" style="border:none!important" id="framePayment"></iframe>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        frame: {}
      }
    },
    created() {
      this.getFramePayment()
      this.checkCorrectPayment()
    },
    methods: {
      async getFramePayment() {
        this.frame = await this.$axios.get('/orders/testpaymentwall/')
      },
      checkCorrectPayment() {
        var vm = this
        window.addEventListener('message', function (event) {
          if (event.origin !== 'https://api.paymentwall.com') return;
          var eventData = JSON.parse(event.data);
          if (eventData.event == 'paymentSuccess') {
            vm.$emit('changeStatusPayment', eventData.event)
          }
        }, false);
      }
    }
  }

</script>
