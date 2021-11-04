<template>
    <v-stepper  class="card_step my-2 " :value="currentStep" alt-labels>
        <v-stepper-header height="100px" >
            <template v-for="n in steps">
              <!-- 카드 스탭 진행중, 완료 보여주기 -->
                <v-stepper-step class="pa-2" color="pink accent-2" :key="`step${n.step}`" :editable="edit.editState" :step="n.step" @click="changeStep(n.step)">
                    {{n.state}}
                </v-stepper-step>
                <v-divider v-if="n.step===1" :key="n.step"></v-divider>
            </template>
        </v-stepper-header>
    </v-stepper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      steps: [{
        step: 1,
        state: '진행중'
      }, {
        step: 2,
        state: '완료'
      }],
      complete: false
    }
  },
  computed: {
    ...mapState(['unitCard', 'edit']),
    currentStep () {
      return this.unitCard && this.unitCard.complete ? 2 : 1
    }
  },
  methods: {
    ...mapActions(['UPDATELIST']),
    changeStep (step) {
      // 편집모드 가 아니면 리턴해줍니다.
      if (!this.edit.editState) return
      if (step === 1) {
        this.complete = false
      } else {
        this.complete = true
      }
      const info = {
        complete: this.complete,
        cardState: true
      }
      this.UPDATELIST({
        routeName: this.$route.name,
        updateCard: true,
        id: this.unitCard.id,
        info
      })
    }
  }
}
</script>

<style >
@media only screen and (max-width: 1200px){
     .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: block  !important;
     }
}
@media only screen and (max-width: 600px){
    .container .v-stepper__header{display: block;}
    .container .v-stepper--alt-labels .v-stepper__step{flex-basis: 130px;}
    .container .v-stepper--alt-labels .v-stepper__header .v-divider{display: none;}

}

</style>
