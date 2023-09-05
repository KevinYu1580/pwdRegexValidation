export default {
  data() {
    return {
      outPut_boolean: false, // true符合，false不符合
    }
  },
  props: ['regexList', 'inputValue', 'ttt'],
  template: `
  <div class="pwdCheck">
  <div
    v-for="(item, index) in regexList"
    class="pwdCheck__item"
    :class="{'pwdCheck__item--passed': item.Passed}"
  >
    <!-- svg -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="18"
      viewBox="0 0 17 18"
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
    <!-- 正規式名稱 -->
    <span>{{item.Name}}</span>
  </div>
  </div>
        `,
  methods: {
    //將正規式字串轉型為正規式物件
    stringToRegex(string) {
      const RegexObj = string.match(/\/(.+)\/.*/)[1]
      return new RegExp(RegexObj)
    },
    async validate(value) {
      //重置驗證結果
      this.outPut_boolean = false

      for (let i = 0; i < this.regexList.length; i++) {
        let regex = this.stringToRegex(this.regexList[i].Regex)

        // 檢查是否符合正規式，並將結果記錄在regexList[i].Passed，以控制template UI
        if (regex.test(value)) {
          //如果該正規式符合，則將key: Passed = true
          this.regexList[i].Passed = true
        } else {
          //如果該正規式不符合，則將key: Passed = false
          this.regexList[i].Passed = false
        }

        // 如果有一個正規式不符合，則將outPut_boolean = false
        if (this.regexList[i].Passed === false) {
          this.outPut_boolean = false
          continue
        } else {
          // 如果全部正規式都符合，則將outPut_boolean = true
          this.outPut_boolean = true
        }
      }
    },
    sendOutput() {
      // 將驗證結果傳給父元件
      this.$emit('output', this.outPut_boolean)
    },
  },
  watch: {
    // 將input值傳給父元件
    inputValue: function (newValue, oldValue) {
      // this.$emit('inputValue', this.inputVal)
      this.validate(newValue).then(this.sendOutput())
    },
  },
}

// <!-- 勾勾(fill) -->
// <!-- <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//           >
//             <path
//               d="M7.08333 13.8215L3.92259 10.6607C3.59715 10.3353 3.06951 10.3353 2.74408 10.6607C2.41864 10.9862 2.41864 11.5138 2.74408 11.8393L6.49408 15.5893C6.81951 15.9147 7.34715 15.9147 7.67259 15.5893L16.8393 6.42259C17.1647 6.09715 17.1647 5.56951 16.8393 5.24408C16.5138 4.91864 15.9862 4.91864 15.6607 5.24408L7.08333 13.8215Z"
//               fill=""
//             />
//           </svg> -->
