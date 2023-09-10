
# RegexValidator (powered by Vue option api)

專為vue option api打造，快速使用該模組以使用您自訂的正規式驗證input資料並即時顯示於UI 


## Demo

Insert gif or link to demo


## 功能

* 自由綁定您的input資料
* 自訂驗證正規式
* 自訂驗證正規式名稱 (畫面UI)
* 自訂svg樣式
* 完成驗證後可輸出驗證結果 (布林值)

## 快速開始
將RegexValidator用於您的專案

### 1. 於html引入css

```html
 <link rel="stylesheet" href="./css/index.css" />
```

### 2. 於main.js引入模組並註冊元件

```javascript
 import { RegexValidator } from './regexValidator.js'

 Vue.createApp({
  data() {
    return {
    //   your data
    }
  },
  components: {
    // 註冊元件
    RegexValidator,
  },

  methods: {
    //   your methods
  },
}).mount('#app')
```

