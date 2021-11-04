import { createLocalVue, shallowMount } from '@vue/test-utils'
import RegisterForm from '../../form/RegisterForm.vue'
import Vuetify from 'vuetify'

describe('RegisterForm.vue', () => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('이메일/비밀번호 데이터가 유효하지 않은 경우,회원가입 버튼이 비활성화됩니다.', () => {
    const wrapper = shallowMount(RegisterForm, {
      localVue,
      vuetify,
      data () {
        return {
          valid: false
        }
      }
    })
    const btn = wrapper.find('.register_btn')
    expect(btn.attributes('disabled')).toBeTruthy()
  })
})
