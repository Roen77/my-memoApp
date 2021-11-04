<template>
  <div>
    <v-dialog @click:outside="changeRouter"  v-model="dialog" max-width="850px">
      <v-card>
        <v-card-title>
          <span class="headline">새 카드</span>
        </v-card-title>
        <card-add-form></card-add-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CardAddForm from '../components/form/CardAddForm.vue'
export default {
  components: { CardAddForm },
  data () {
    return {
      dialog: true,
      confirm: false,
      agree: false
    }
  },
  methods: {
    changeRouter () {
      this.$router.push(`/board/${this.$route.params.id}`)
    }

  }

}
</script>

<style>

</style>
