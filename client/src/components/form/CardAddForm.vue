<template>
    <v-form v-model="valid" class="px-3" ref="form">
        <!-- 카테고리 리스트 -->
       <category-list :label="`필수 카테고리`" :noDataTxt="`추가할 카테고리가 없습니다.`" :categoryList="categoryList" v-model="selectList"
       @clearCategory="categoryReset"
       @updateInput="onupdateInput"></category-list>
        <!-- 대표 카테 고리 -->
        <template v-if="hasSelectList">
            <!-- 대표 카테고리가 없을 경우-->
            <v-alert class="caption warn py-2" v-if="!hasRepresentCategory" border="left" type="error" colored-border
                color="red" elevation="2">
                아래 카테고리 중 대표 카테고리를 선택해주세요
            </v-alert>
            <!-- 대표 카테고리가 있을 경우 -->
            <v-container v-else class="d-flex">
                <v-card-title class="pa-0">대표 카테고리</v-card-title>
                <v-chip class="ml-1 font-weight-bold" style="font-size:15px;" text-color="white" color="cyan">
                    {{ representCategory.type}}</v-chip>
            </v-container>
        </template>
        <!-- 내가 선택한 카테고리 리스트 -->
        <category-chip :selectList="selectList" @onRepresent="onRepresent"></category-chip>
      <!-- 카드 제목 -->
        <v-card-text>
            <v-text-field ref="input" label="카드 제목" v-model="title" :counter="10"  :rules="titleRules" clearable prepend-icon="mdi-format-title">
            </v-text-field>
            <!-- 카드 메모 -->
            <v-textarea v-model="description" :counter="50" :rules="descriptionRules" label="메모"  clearable prepend-icon="mdi-content-paste">
            </v-textarea>
        </v-card-text>
        <!-- 카드 색 변경 -->
        <v-card-subtitle>
            <v-btn outlined color="indigo darken-1" dark @click="showColorpicker=!showColorpicker">카드 색 변경</v-btn>
        </v-card-subtitle>
        <!-- 카드 색 선택창 -->
        <v-row v-if="showColorpicker" justify="center" align="center" class="ma-1">
            <v-card>
                <v-color-picker style="max-width: 500px" v-model="color" hide-canvas></v-color-picker>
            </v-card>
        </v-row>
        <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="`/board/${$route.params.id}`"><v-btn link color="blue daren-1" text>닫기</v-btn></router-link>
            <v-btn class="add_btn" color="green" :disabled="!valid ||!hasRepresentCategory" text outlined @click="onAddCard">생성</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
import FormMixin from '../../mixin/FormMixin'
import { mapActions, mapState } from 'vuex'
import CategoryList from '../Categorys/CategoryList.vue'
import CategoryChip from '../Categorys/CategoryChip.vue'
export default {
  components: { CategoryList, CategoryChip },
  mixins: [FormMixin],
  data () {
    return {
      // 카테고리 리스트
      selectList: [],
      // 대표 카테고리
      representCategory: {},
      title: '',
      description: '',
      color: '',
      showColorpicker: false,
      titleRules: [
        v => !!v || '카드제목은 필수입니다.',
        v => (v && v.length < 11) || '카드제목은 10자리 이하로 입력해주세요.'
      ],
      descriptionRules: [
        v => (v && v.length < 51) || '50자리 이하로 입력해주세요.'
      ]
    }
  },
  created () {
    this.onFetchCategory()
  },
  computed: {
    ...mapState(['categoryList']),
    hasRepresentCategory () {
      return this.representCategory && this.representCategory.type
    },
    hasSelectList () {
      return this.selectList && this.selectList.length
    }
  },
  methods: {
    ...mapActions(['CREATLIST', 'FETCHCATEGORYS']),
    onFetchCategory () {
      this.FETCHCATEGORYS({
        BoardId: this.$route.params.id
      })
    },
    onAddCard () {
      const info = { title: this.title, description: this.description, bgcolor: this.color, category: this.selectList, BoardId: this.$route.params.id, CategoryId: this.representCategory.id }
      this.CREATLIST({ routeName: 'cards', info })
      // 카드 추가 후 라우터 이동
        .then(() => this.$router.push(`/board/${this.$route.params.id}`))
    },
    // 카테고리 초기화 시, 대표 카테고리도 초기화
    categoryReset () {
      this.representCategory = {}
    },
    // 대표 카테고리
    onRepresent (choice) {
      this.representCategory = choice
    },
    // 카테고리 리스트중 내가 선택한 카테고리
    onupdateInput (value) {
      this.selectList = value
    }
  }
}
</script>

<style>
.warn.v-sheet{color:rgb(248, 53, 39);}
</style>
