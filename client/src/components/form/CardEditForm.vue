<template>
  <div>
    <!-- 카드 스탭 -->
    <card-steper></card-steper>
    <!-- 카테고리 수정 -->
    <category-form></category-form>
    <!-- 카드 제목 -->
    <v-card class="my-6" elevation="7" shaped>
      <v-form v-model="valid">
        <v-card-text>
          <v-text-field ref="input" label="카드 제목" :clearable="editState" :readonly="!editState" :value="unitCard.title"
          @input=" chageInput('title',$event)"
            prepend-icon="mdi-format-title" :rules="titleRules">
          </v-text-field>
          <!-- 카드 내용 -->
          <v-textarea ref="desInput" label="메모" :value="unitCard.description"
          @input=" chageInput('description',$event)"
          :rules="descriptionRules" prepend-icon="mdi-content-paste"
            :clearable="editState" :readonly="!editState">
          </v-textarea>
        </v-card-text>
        <!-- 카드 색 변경 -->
        <v-card-subtitle v-if="editState">
          <v-btn outlined color="indigo darken-1" dark @click="showColorpicker=!showColorpicker">카드 색 변경</v-btn>
        </v-card-subtitle>
        <!-- 카드 색 선택창 -->
        <v-row v-if="showColorpicker" justify="center" align="center" class="ma-1">
          <v-card>
            <v-color-picker style="max-width: 500px" v-model="color" hide-canvas></v-color-picker>
          </v-card>
        </v-row>
        <v-card-actions v-if="editState">
          <v-btn  :disabled="!valid" @click.prevent="onUpdateCard" text class="indigo darken-1 ma-2" dark>
            카드 내용 수정
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FormMixin from '../../mixin/FormMixin'
import CardSteper from '../card/CardSteper.vue'
import CategoryForm from './CategoryForm.vue'
export default {
  components: { CategoryForm, CardSteper },
  mixins: [FormMixin],
  computed: {
    ...mapState({ editState: state => state.edit.editState, unitCard: 'unitCard' })
  },
  data () {
    return {
      showColorpicker: false,
      color: '',
      titleRules: [
        v => !!v || '카드제목은 필수입니다.',
        v => (v && v.length < 11) || '카드제목은 10자리 이하로 입력해주세요.'
      ],
      descriptionRules: [
        v => (v && v.length < 51) || '50자리 이하로 입력해주세요.'
      ],
      newCard: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    ...mapActions(['UPDATELIST']),
    chageInput (value, newInput) {
      this.newCard[value] = newInput
    },
    onUpdateCard () {
      const { title, description } = this.newCard
      const info = {
        title: title || this.unitCard.title,
        description: description || this.unitCard.description,
        bgcolor: this.color
      }
      this.UPDATELIST({
        routeName: this.$route.name,
        id: this.$route.params.id,
        info
      })
        .then(() => {
          // 라우터 이동
          this.$router.push(`/board/${this.unitCard.BoardId}`)
        })
    }
  }
}
</script>

<style>

</style>
