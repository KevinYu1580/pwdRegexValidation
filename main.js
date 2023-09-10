// 引入模組
import { RegexValidator } from './regexValidator.js'

Vue.createApp({
  data() {
    return {
      pwdRuleList: [], //正規式陣列
      inputVal: '', //input輸入值
      moduleOutput: false, //正規式模組輸出
    }
  },
  components: {
    // 註冊元件
    RegexValidator,
  },

  methods: {
    getPwdRuleList() {
      // 使用者自訂的密碼規則(格式須符合模組格式)
      this.pwdRuleList = [
        { Name: '長度為8-20碼', Regex: '/^.{8,20}$/' },
        { Name: '含數字0-9', Regex: '/[0-9]/' },
        { Name: '含英文字大寫A-Z', Regex: '/[A-Z]/' },
        { Name: '含英文字小寫a-z', Regex: '/[a-z]/' },
        { Name: '特殊符號#?!@$%^&*-', Regex: '/[#?!@$%^&*-]/' },
      ]
    },
    // 接收正規式模組輸出
    updatePwdModuleOutput(output) {
      this.moduleOutput = output
    },
  },

  mounted() {
    this.getPwdRuleList()
  },
}).mount('#app')
