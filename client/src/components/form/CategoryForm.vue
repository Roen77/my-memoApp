<template>
    <v-card class="pa-2">
        <h3 class="overline">대표 카테고리</h3>
        <!-- 대표 카테고리 -->
        <v-chip class="my-2 subtitle-1 white--text font-weight-bold" :color="unitCard.bgcolor">
            {{unitCard.Category && unitCard.Category.type}}</v-chip>
        <!-- 변경할 대표 카테고리 리스트 -->
        <div v-if="edit.editState">
            <category-list :label="`변경할 대표 카테고리`" :noDataTxt="`더이상 카테고리가 없습니다.`" :categoryList="Categorys"
                @updateInput="onupdateInput" :isEdit="category.isEdit" ></category-list>
            <!-- 변경할 대표 카테고리가 있을 경우에만 -->
            <div class="py-1" v-if="mainCategory.id">
                <!--대표 카테고리 수정 버튼 -->
                <v-btn color="primary" class="mb-2" dark elevation="2" small @click.prevent="onupdateCategory">대표 카테고리 수정</v-btn>
            </div>
        </div>
        <!--카테고리 리스트 -->
        <div class="category_list">
          <h3 class="overline">카테고리 리스트</h3>
           <!--카테고리 리스트 이미지 추가 로딩 -->
          <div class="imageloading" v-if="imageLoading">
            카테고리 추가중...
            <v-progress-circular indeterminate color="primary" :width="2" :size="20"></v-progress-circular>
          </div>
          <!-- 현재 가지고 있는 카테고리 리스트 -->
          <category-chip :selectList="unitCard.CardTypes || []"></category-chip>
        </div>
        <div v-if="edit.editState">
            <!-- 카테고리 추가 폼 보여주기 버튼 -->
            <v-btn type="button" class="my-1" text small @click="addchangeState" rounded outlined color="info">원하시는
                카테고리가 없나요??
            </v-btn>
            <!-- 카테고리 삭제할 엑스 버튼 보여주기 버튼  -->
            <v-btn type="button" class="my-1" @click="removechangeState" text small rounded outlined color="info">카테고리를
                삭제하고
                싶으신가요??</v-btn>
            <v-card v-if="edit.addState && edit.editState">
                <!-- 카테고리 추가 폼 -->
                <v-card-text>
                    <v-form @submit.prevent="onAddCategory" v-model="category.validcategory">
                        <v-text-field label="카테고리 이름" v-model="category.input"
                            prepend-icon="mdi-emoticon-outline" :rules="category.categoryRules" :counter="10" clearable>
                        </v-text-field>
                        <v-file-input v-model="files"
                         :rules="imgRules"
                         accept="image/png, image/jpeg"
                        show-size counter label="아이콘 이미지"></v-file-input>
                        <v-btn type="submit" name="submit" :disabled="fileInvalid || !category.validcategory"
                            color="green" text outlined>추가</v-btn>
                        <v-alert class="mt-3" v-if="category.errmsg" border="left" color="red" dense text type="error">
                            {{category.errmsg}}
                        </v-alert>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </v-card>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import CategoryChip from '../Categorys/CategoryChip.vue'
import CategoryList from '../Categorys/CategoryList.vue'
import { loadImage } from '../../utils/loadImage'
export default {
  components: { CategoryChip, CategoryList },
  computed: {
    ...mapState(['unitCard', 'edit', 'mainCategory']),
    fileInvalid () {
      return (this.files && this.files.length === 0) || !this.files
    },
    // 대표카테고리 제외하고 보여줄 카테고리
    Categorys () {
      return (this.unitCard.CardTypes && this.unitCard.CardTypes.filter(category => category.id !== this.unitCard.Category.id)) || []
    }
  },
  data () {
    return {
      // 이미지 파일
      files: [],
      imageLoading: false,
      //  이미지 유효성 검사
      imgRules: [
        value => !value || value.size < 2000000 || '2mb 이하여야 합니다.',
        v => (v && /image/.test(v.type)) || '이미지 타입이 아닙니다.'
      ],
      category: {
        isEdit: true,
        validcategory: true,
        input: '',
        // 카테고리 유효성 검사
        categoryRules: [
          v => (v && v.length < 11) || '카테고리는 10자이하로 입력해주세요.'
        ],
        errmsg: ''
      }
    }
  },
  methods: {
    ...mapActions(['CREATCATEGORY', 'UPDATECATEGORY']),
    ...mapMutations(['UPDATE_STATE']),
    //   카테고리 추가
    async onAddCategory () {
      if (this.category.input.trim().length < 0) {
        this.category.errmsg = '카테고리 이름을 입력해주세요'
        return
      }
      try {
        this.imageLoading = true
        // FormDta로 이미지와 함께 저장
        const data = new FormData()
        // 카테고리 이름
        data.append('type', this.category.input)
        // 카테고리 이미지
        data.append('image', this.files)
        await this.CREATCATEGORY({
          BoardId: this.unitCard.BoardId,
          CardId: this.unitCard.id,
          info: data
        })
          .then((data) => {
            // 추가한 카테고리 이미지를 불러오고 이미지가 로드된 후 로딩 종료
            loadImage(data.category[0] || '')
            this.category.errmsg = ''
            this.categoryReset()
            this.imageLoading = false
          })
      } catch (error) {
        console.log(error)
        this.category.errmsg = error.response ? error.response.data.msg : error
        this.imageLoading = false
      }
    },
    //  대표 카테고리 수정
    onupdateCategory () {
      this.UPDATECATEGORY({
        BoardId: this.unitCard.BoardId,
        CardId: this.unitCard.id,
        choice: this.mainCategory
      })
        .then(() => {
        // 대표 카테고리 수정 후 초기화
          this.UPDATE_STATE({
            mainCategory: {}
          })
        })
    },
    //  카테고리 입력폼 초기화
    categoryReset () {
      this.category.input = ''
      this.files = []
    },
    // 카테고리 추가 편집 모드 상태
    addchangeState () {
      // 입력값 초기화
      this.category.input = ''
      this.UPDATE_STATE({
        edit: {
          editState: true,
          addState: !this.edit.addState
        }
      })
    },
    //   카테고리 삭제 편집 모드 상태
    removechangeState () {
      this.UPDATE_STATE({
        edit: {
          editState: true,
          removeState: !this.edit.removeState
        }
      })
    },
    onupdateInput (value) {
      this.UPDATE_STATE({ mainCategory: value })
    }
  }
}
</script>

<style>
.imageloading{text-align: center; font-size: 12px;}
.category_list{position: relative;}
.category_list .imageloading{position: absolute; z-index: 1; left:0; top:0; width:100%; height:100%; background-color:#fff; display: flex; justify-content: center; align-items: center;}
</style>
