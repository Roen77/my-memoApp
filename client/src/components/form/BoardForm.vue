<template>
    <v-form class="px-3" ref="form" v-model="valid">
        <v-card-text>
            <!-- 보드 제목 -->
            <v-text-field ref="input" clearable label="보드 제목" v-model="title" :counter="10"
                prepend-icon="mdi-format-title" :rules="titleRules">
                <!-- 보드 설명(메모) -->
            </v-text-field>
            <v-textarea label="메모" clearable v-model="description" :counter="50" prepend-icon="mdi-content-paste"
                :rules="descriptionRules">
            </v-textarea>
        </v-card-text>
        <!-- 보드 색 변경 -->
        <v-card-subtitle>
            <v-btn outlined color="indigo darken-1" dark @click="showColorpicker=!showColorpicker">보드 색 변경</v-btn>
        </v-card-subtitle>
        <v-row v-if="showColorpicker" justify="center" align="center" class="ma-1">
            <v-card>
                <v-color-picker style="max-width: 500px" v-model="color" hide-canvas></v-color-picker>
            </v-card>
        </v-row>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue daren-1" text @click="reset">닫기</v-btn>
            <!-- 보드 추가와 수정시 보여지는 버튼 구분하기 -->
            <template v-if="!board">
                <v-btn clor="green" text outlined @click="onAddBoard" :disabled="!valid">생성</v-btn>
            </template>
            <template v-else>
                <v-btn clor="green" text outlined @click="onEditBoard" :disabled="!valid">수정</v-btn>
            </template>
        </v-card-actions>
    </v-form>
</template>

<script>
import FormMixin from '../../mixin/FormMixin'
import { mapActions } from 'vuex'
export default {
  mixins: [FormMixin],
  props: {
    board: {
      type: Object,
      required: false
    }
  },
  data () {
    //  props로 받은 데이터가 있다면 그 데이터를 보여주고, 없다면 빈문자열을 보여줍니다.
    return {
      title: (this.board && this.board.title) || '',
      description: (this.board && this.board.description) || '',
      color: (this.board && this.board.color) || '',
      showColorpicker: false,
      titleRules: [
        v => !!v || '보드 제목은 필수입니다.',
        v => (v && v.length < 11) || '보드 제목은 10자리 이하로 입력해주세요.'
      ],
      descriptionRules: [
        v => (v && v.length < 51) || '50자리 이하로 입력해주세요.'
      ]
    }
  },
  methods: {
    ...mapActions(['CREATLIST', 'UPDATELIST']),
    // 보드 추가
    onAddBoard () {
      const info = {
        title: this.title,
        description: this.description,
        bgcolor: this.color
      }
      this.CREATLIST({
        routeName: 'boards',
        info
      })
        .then(() => {
          // 기존 데이터 초기화
          this.reset()
          // 메인으로 라우터 이동
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    },
    // 보드 수정
    onEditBoard () {
      const info = {
        title: this.title,
        description: this.description,
        bgcolor: this.color
      }
      this.UPDATELIST({
        routeName: 'boards',
        info,
        id: this.board.id
      })
        .then(() => this.reset())
    },
    reset () {
      // 보드 수정시 초기화
      if (this.board) {
        this.title = this.board.title
        this.description = this.board.description
      } else {
        // 보드 추가시 초기화
        this.title = ''
        this.description = ''
      }
      this.color = ''
      this.showColorpicker = false
      //  보드 추가 팝업창 닫기
      this.$emit('close')
    }
  }

}
</script>

<style>

</style>
