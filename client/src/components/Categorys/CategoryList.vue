<template>
    <div>
        <v-select class="pt-4 category_select" :value="value" :rules="selectRules" :items="categoryList" item-text="type"
            item-value="type" return-object :label="label" :multiple="!isEdit" hide-selected outlined :clearable="!isEdit"
        @click:clear="$emit('clearCategory')"
         @change="$emit('updateInput',$event)" :no-data-text=" noDataTxt"></v-select>
    </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    noDataTxt: {
      type: String,
      required: true
    },
    categoryList: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: false
    },
    isEdit: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      selectRules: [
        v => this.isEdit || !!v || '카테고리는 필수입니다.'
      ]
    }
  }

}
</script>

<style>
.category_select .v-input__slot{min-height: 50px !important;}
</style>
