<template>
  <v-container>
    <v-card class="rounded-lg">
      <v-toolbar color="secondary elevation-0">
        <v-toolbar-title class="font-weight-black white--text">
          <slot name="title-form"></slot>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card outlined class="pa-3 text-center">
          <h3 class="font-weight-black secondary--text">
             <slot name="subtitle-form"></slot>
          </h3>
        </v-card>
      </v-card-text>
      <v-card-text>
        <v-card flat class="text-center">
          <h3 class="font-weight-black secondary--text">
             <slot name="aditional-info"></slot>
          </h3>
        </v-card>
      </v-card-text>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col class="col-12">
              <v-text-field flat filled class="rounded-lg" hide-details v-model="client.name" required placeholder="Nombre completo"
                type="text">
              </v-text-field>
            </v-col>
            <v-col class="col-12">
              <v-text-field flat filled class="rounded-lg" hide-details  v-model="client.doc" required placeholder="Documento" type="text">
              </v-text-field>
            </v-col>
            <v-col class="col-12">
              <div id="cardnumber-field"></div>
            </v-col>
            <v-col class="col-6">
              <div id="expiration-field"></div>
            </v-col>
            <v-col class="col-6">
              <div id="cvv-field"></div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="secondary" large class="font-weight-black rounded-lg" @click="submitForm()">
          <slot name="title-button"></slot>
        </v-btn>
      </v-card-actions>
    </v-card>
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
        client:{},
        dlocal: null,
        monthPlan: this.$route.params.monthsPlan,
        cvvField:null,
        cardNumberField:null,
        expirationField:null,
        rules: {
          requerido: [value => !!value || "Requerido."],
          email: [
            v => !!v || "E-mail is required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
          ]
        },
        card: null,
        fieldsFilled:{
          card:false,
          cvv:false,
          expiration:false
        }
      }
    },
    mounted() {
      this.generateForm()
    },
    methods: {
      async generateForm() {
        await Vue.loadScript('https://js-sandbox.dlocal.com');
        this.dlocal = window.dlocal('d2694245-c35d-4b04-93c9-d1240201ee04');
        var fields = this.dlocal.fields({
          fonts: [{
            cssSrc: 'https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap'
          }],

          locale: 'es',
          country: 'UY'
        });
        var options = {
          style: {
            base: {
              weight: '900',
              fontSize: "16px",
              fontFamily: "Nunito, sans-serif",
              lineHeight: '18px',
              fontSmoothing: 'antialiased',
              fontWeight: '500',
              color: "rgba(0, 0, 0, 0.6)",
              '::placeholder': {
                color: "rgba(0, 0, 0, 0.6)"
              },
              iconColor: "#c1c1c1"
            },
          },
          classes: {
            base: 'cardfield-base'
          }
        }

        this.cardNumberField = fields.create('pan', {
          ...options,
          placeholder: '4111 1111 1111 1111'
        });

        this.cvvField = fields.create('cvv', {
          ...options,
          placeholder: '123'
        });

        this.expirationField = fields.create('expiration', {
          ...options,
          placeholder: '01/24'
        });

        this.cvvField.mount(document.getElementById('cvv-field'));
        this.expirationField.mount(document.getElementById('expiration-field'));
        this.cardNumberField.mount(document.getElementById('cardnumber-field'));
        var vm = this
        this.cvvField.on('change', function(event){
            vm.fieldsFilled.cvv = event.complete
        })
        this.expirationField.on('change', function(event){
            vm.fieldsFilled.expiration = event.complete
        })
        this.cardNumberField.on('change', function(event){
            vm.fieldsFilled.card = event.complete
        })
      },
      submitForm() {
        if(!this.$refs.form.validate()) return
        if(!this.fieldsFilled.cvv && !this.fieldsFilled.expiration && !this.fieldsFilled.card)return 
          
          this.dlocal.createToken(this.cardNumberField, {
              name: this.$auth.user.username
          }).then((result) => {
            this.$emit('formSubmitted',{token:result.token,...this.client})
          }).catch((result) => { 
            console.log(result.error.message)
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
