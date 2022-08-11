<template>
  <v-card flat @click="goToPublication()" v-if="publication.main_picture!=null" width="100%">
    <v-img aspect-ratio="2" gradient="to top right, #0000001c, #00000040"
      :src="`${this.$axios.defaults.baseURL}${publication.main_picture.url}`" max-height="200" class="d-flex align-end" cover>
      <postComments :publication="publication" :goToPublication="goToPublication" :likeOrDislike="likeOrDislike">
      </postComments>
    </v-img>
  </v-card>
</template>

<script>
  import moment from 'moment';
  import postComments from '~/components/Posts/PostCard/postComments.vue';
  export default {
    components: {
      postComments
    },
    props: {
      index: Number,
      publicProp: {
        type: Object,
        default: {
          likes: [],
        }
      }
    },
    data() {
      return {
        publication: this.publicProp,
        openBottomFollow: false
      }
    },
    methods: {
      goToProfile() {
        return this.$router.push('account/user/profile/' + this.publication.user.id)
      },
      goToPublication() {
        if (this.publication.comments_active)
          return this.$router.push(`/post/${this.publication.id}`)
      },
      formatDate(date) {
        return moment(date).lang("es").fromNow()
      },
      likeOrDislike() {

        if (this.publication.likeUser) {
          this.$axios.delete(`/publicaciones/removeLike/${this.publication.id}`).then(response => {
            this.publication.likeUser = false
            this.publication.likes -= 1
          })
        } else {
          this.$axios.post(`/publicaciones/addLike/${this.publication.id}`).then(response => {
            this.likeId = response.data.id
            this.publication.likeUser = true
            this.publication.likes += 1
          })
        }
      },
      deletePublication(id, index) {
        this.$axios.delete(`/publicaciones/${id}/`)
          .then(() => {
            this.$root.$emit('deletePublication', this.index)
          })
      }
    }
  }

</script>
