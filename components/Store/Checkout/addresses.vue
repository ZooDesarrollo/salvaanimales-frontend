<template>
  <v-row>
    <v-col class="col-12">
      <v-list>
        <v-card  
          class="rounded-lg ml-1 mr-1 mb-2" 
          v-for="address in addresses.data" 
          :key="address.id"
          @click="selectAddress(address)"
          :outlined="address.id != selectedAddress.id"
          :class="{
            'primary lighten-2':address.id == selectedAddress.id
          }"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{address.name}}</v-list-item-title>
              <v-list-item-subtitle>{{address.address}}</v-list-item-subtitle>
              <v-list-item-subtitle>0{{address.phone}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn dense class="ml-2" fab x-small depressed>
                <v-icon color="success darken-1">mdi-plus</v-icon>
              </v-btn>

            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-list>
    </v-col>
    <v-col class="col-12 d-flex flex-column justify-center align-space-between mb-3"
      v-if="addresses.data && addresses.data.length == 0">
      <template></template>
      <v-icon size="100">ion-ios-home</v-icon>
      <h4 class="text-center">No tienes ninguna direccion</h4>
    </v-col>
    <v-col class="col-12 d-flex flex-column justify-center align-space-between mb-3">
      <v-btn color="gradient-primary" class="white--text font-weight-bold rounded-lg"
        @click="dialogAddress = !dialogAddress">
        Agregar direccion&nbsp;&nbsp;<v-icon>ion-ios-add-circle</v-icon>
      </v-btn>
    </v-col>
    <v-dialog v-model="dialogAddress">
      <v-card>
        <v-toolbar class="elevation-0">
          <v-toolbar-title class="secondary--text font-weight-black">
            Tu perfil
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn dense class="ml-2" fab @click="dialogAddress = !dialogAddress" x-small depressed>
            <v-icon color="grey">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="py-3">
          <v-form ref="form">
            <v-text-field filled class="rounded-lg" v-model="address.name" label="Nombre de la direccion">
            </v-text-field>
            <v-text-field filled class="rounded-lg" v-model="address.address" label="Direccion"></v-text-field>
            <v-text-field filled class="rounded-lg" v-model="address.city" label="Ciudad"></v-text-field>
            <v-text-field filled class="rounded-lg" v-model="address.phone" label="Telefono"></v-text-field>
            <v-textarea filled class="rounded-lg" v-model="address.address" label="Comentarios (Opcional)"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gradient-primary" class="rounded-lg font-weight-black white--text" @click="addAddress()">Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data() {
      return {
        addresses: {},
        address: {},
        dialogAddress: false,
        selectedAddress:{}
      }
    },
    created() {
      this.getAdresses()
    },
    methods: {
      async getAdresses() {
        this.addresses = await this.$axios.get(`/customer-addresses/?user=${this.$auth.user.id}`)
      },
      addAddress() {
        if (!this.$refs.form.validate()) return
        this.address.user = this.$auth.user.id
        this.$axios.post('/customer-addresses', this.address)
          .then((data) => {
            this.addresses.data.push(data.data)
            this.address = {}
            this.selectedAddress = data.data
            this.dialogAddress = false
          })

      },
      selectAddress(address) {
        this.selectedAddress = address
        this.$emit('value',address)

      }
    },
  }

</script>

<style>

</style>
