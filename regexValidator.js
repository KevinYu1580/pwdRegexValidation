export const RegexValidator = {
  data() {
    return {
      outPut_boolean: false, // true符合，false不符合
    }
  },
  props: {
    regexList: {
      type: Array,

      // 如未傳入regexList，預設密碼規則為下
      default: () => {
        return [
          { Name: '長度為8-20碼', Regex: '/^.{8,20}$/' },
          { Name: '含數字0-9', Regex: '/[0-9]/' },
          { Name: '含英文字大寫A-Z', Regex: '/[A-Z]/' },
          { Name: '含英文字小寫a-z', Regex: '/[a-z]/' },
          { Name: '特殊符號#?!@$%^&*-', Regex: '/[#?!@$%^&*-]/' },
        ]
      },
    },
    inputValue: {
      type: String,
      required: true,
    },
  },
  template: `
  <div class="pwdCheck">
  <div
    v-for="(item, index) in regexList"
    class="pwdCheck__item"
    :class="{'pwdCheck__item--passed': item.Passed}"
  >
  <div class="item__svgWrapper">
  <slot name="icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M14.5832 8.42858V9.00358C14.5825 10.3513 14.1461 11.6627 13.3391 12.7422C12.5321 13.8217 11.3978 14.6114 10.1053 14.9935C8.81289 15.3756 7.43154 15.3298 6.16729 14.8627C4.90305 14.3956 3.82366 13.5324 3.0901 12.4017C2.35654 11.2711 2.00812 9.93361 2.0968 8.58877C2.18548 7.24393 2.70651 5.96378 3.58218 4.93925C4.45785 3.91471 5.64124 3.20069 6.95587 2.90367C8.27049 2.60665 9.64592 2.74254 10.877 3.29108M14.5832 4L8.33325 10.2562L6.45825 8.38125"
      stroke="#9E9E9E"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  </slot>
  
  </div>

    <!-- 正規式名稱 -->
    <span>{{item.Name}}</span>
    
  </div>
  
  </div>
        `,
  methods: {
    //驗證正規式格式
    stringToRegex(obj) {
      switch (typeof obj) {
        case 'string':
          const RegexObj = obj.match(/\/(.+)\/.*/)[1]
          return new RegExp(RegexObj)

        case 'object':
          return obj
        default:
          throw new Error('Regex type error')
      }
    },
    // 驗證
    async validate(value) {
      // 已通過的正規式數量
      let passedItemLength = 0

      this.regexList.forEach((item, index) => {
        // 取得正規式物件
        let regex = this.stringToRegex(this.regexList[index].Regex)

        // 檢查是否符合正規式，並執行以下
        // 1: 將結果記錄在regexList.Passed，以控制template UI樣式，如果該正規式符合，則將key: Passed = true，反之key: Passed = false
        // 2: passedItemLength++，用來計算已通過的正規式數量，如果該正規式符合，則passedItemLength+1, 反之passedItemLength不變
        regex.test(value)
          ? ((this.regexList[index].Passed = true), passedItemLength++)
          : (this.regexList[index].Passed = false)
      })

      // 如果已通過的正規式數量等於正規式陣列長度，代表全部符合，將output設為true，反之設為false
      this.outPut_boolean = passedItemLength == this.regexList.length ? true : false
    },
    sendOutput() {
      // 將驗證結果傳給父元件
      this.$emit('output', this.outPut_boolean)
    },
  },
  watch: {
    // 監聽父元件傳入的inputValue
    inputValue: function (newValue, oldValue) {
      // 確保驗證完成後才輸出output給父元件
      this.validate(newValue).then(this.sendOutput())
    },
  },
}
