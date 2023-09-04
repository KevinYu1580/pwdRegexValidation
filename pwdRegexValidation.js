export default {
  data() {
    return {
      count: 0,
    }
  },
  props: ['regexList', 'inputValue'],
  template: `

  <div class="pwdCheck">
  <div
    class="pwdCheck__item"
   v-for="(item, index) in regexList"
  >
    <!-- 勾勾(stroke) -->
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
    <!-- 正規式名稱(UI) -->
    <span>{{item.Name}}</span>
  </div>
  </div>
        `,
  mounted() {
    console.log('regexList', this.regexList)
  },
  watch: {
    // 將input值傳給父元件
    inputVal: function (newValue, oldValue) {
      this.$emit('inputValue', this.inputVal)
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
