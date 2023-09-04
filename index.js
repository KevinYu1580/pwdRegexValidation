// 引入模組
import pwdValidation from './pwdRegexValidation.js'

Vue.createApp({
  data() {
    return {
      // 密碼規則陣列，格式為 [{Name: '密碼規則名稱', Regex: '密碼規則正規式'}]
      pwdRuleList: [],
      inputVal: '',
      module_outPut: false,
    }
  },
  components: {
    // 註冊元件
    pwdValidation,
  },

  methods: {
    // 從後端取得密碼規則陣列
    getPwdRuleList() {
      // 假設後端api的response為 @param:returnData，後端格式需與下方格式相同
      let returnData = [
        { Name: '長度為8-20碼', Regex: '/^.{8,20}$/' },
        { Name: '含數字0-9', Regex: '/[0-9]/' },
        { Name: '含英文字大寫A-Z', Regex: '/[A-Z]/' },
        { Name: '含英文字小寫a-z', Regex: '/[a-z]/' },
        { Name: '特殊符號#?!@$%^&*-', Regex: '/[#?!@$%^&*-]/' },
      ]

      //在取得的密碼規則陣列中，加入key: Passed，該key代表該正規式是否已符合
      returnData.forEach((item, index) => {
        returnData[index]['Passed'] = false
      })
      this.pwdRuleList = returnData //將密碼規則陣列記錄在Vue.data中，供chkPwd_module()使用
    },
  },

  computed: {
    // function_Name() {},
  },

  watch: {
    data: function (newValue, oldValue) {},
  },
  mounted() {
    this.getPwdRuleList()
  },
}).mount('#app')
