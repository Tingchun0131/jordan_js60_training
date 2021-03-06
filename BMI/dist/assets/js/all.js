"use strict";

$(document).ready(function () {
  //請解讀 Vic 的(程式碼)，並在 Slack 上回報他以下邏輯是做了什麼事情：
  // arrayBMIrecord 的陣列用途是什麼？
  //用來儲存每次重新整理之前的BMI查詢記錄
  // 請描述 calculateBMI 函式做了什麼事情
  // 1. 先取值
  // 2. 把數值計算成BMI值
  // 3. 宣告一個空變數，內容包含[身高、體重、BMI、title]
  // 4. 把身高、體重、BMI值存在那個空變數，
  // 5. if判斷BMI屬於哪種title，知道之後賦值給status.title
  // 6. 把結果push去arrayBMIrecord
  // 7. 執行render()函式
  // 8. 把input清空
  // 請描述 render 函式做了什麼事情
  //render主要用來產生innerHtml，顯示結果
  //1.先取得DOM上面的元件
  var btnBmiSubmit = document.querySelector('#btnBmiSubmit');
  var btnBmiDelete = document.querySelector('#btnBmiDelete');
  var bmiHeightNum = document.querySelector('#bmiHeightNum');
  var bmiWeightNum = document.querySelector('#bmiWeightNum');
  var recordList = document.querySelector('.recordList');
  var bmiAvarge = document.querySelector('.bmiAvarge'); //2.建立array

  var arrayBmiRecord = [];
  var ArrayBmiNum = []; //3.建立 BmiRecordData的各種類型

  var BmiRecordData = {
    tooThin: {
      title: '體重太輕'
    },
    normal: {
      title: '體重正常'
    },
    fat: {
      title: '胖'
    },
    littleFat: {
      title: '輕度肥胖'
    },
    middleFat: {
      title: '中度肥胖'
    },
    overFat: {
      title: '重度肥胖'
    }
  };

  function render() {
    var text = '';
    arrayBmiRecord.forEach(function (item) {
      text += '<li class="recordBox"><ul><li class="recordBox__title">' + item.title + '</li><li class="recordBox__text">BMI：' + item.BMI + '</li><li class="recordBox__text">height：' + item.height + '</li><li class="recordBox__text">weight：' + item.weight + '</li></ul></li>';
    }); // console.log(text)
    // console.log(arrayBmiRecord)

    recordList.innerHTML = text;
  }

  function textDelete() {
    //超級重要的停止事件
    event.preventDefault();
    recordList.innerHTML = '';
  }

  function bmiAvargeCount() {
    var bmiCountTime = arrayBmiRecord.length;
    var Num = 0;
    var bmiAvargeNum; // console.log(arrayBmiRecord)

    arrayBmiRecord.forEach(function (item) {
      // ArrayBmiNum.push(item.BMI)
      // console.log(ArrayBmiNum)
      Num += item.BMI; // alert(typeof(item.BMI))
      // alert(Num)
    }); // alert(Num)

    bmiAvargeNum = Num / bmiCountTime; // alert(bmiAvargeNum)

    bmiAvarge.textContent = '總共統計' + bmiCountTime + '次，平均BMI為' + bmiAvargeNum + '。';
  }

  function bmiCount() {
    //超級重要的停止事件
    event.preventDefault();
    var userRecord = {
      title: '',
      height: '',
      weight: '',
      BMI: ''
    };
    var heightNum = parseInt(bmiHeightNum.value);
    var weightNum = parseInt(bmiWeightNum.value);
    userRecord.height = heightNum;
    userRecord.weight = weightNum;
    var bmi = weightNum / (heightNum / 100 * heightNum / 100);
    userRecord.BMI = Math.round(bmi);

    if (bmi >= 35) {
      userRecord.title = BmiRecordData.overFat.title;
    } else if (30 <= bmi && bmi < 35) {
      userRecord.title = BmiRecordData.middleFat.title;
    } else if (27 <= bmi && bmi < 30) {
      userRecord.title = BmiRecordData.littleFat.title;
    } else if (24 <= bmi && bmi < 27) {
      userRecord.title = BmiRecordData.fat.title;
    } else if (18.5 <= bmi && bmi < 24) {
      userRecord.title = BmiRecordData.normal.title;
    } else {
      userRecord.title = BmiRecordData.tooThin.title;
    } //推送進去陣列


    arrayBmiRecord.push(userRecord); // 渲染到html

    render();
    bmiAvargeCount();
    bmiWeightNum.value = '';
    bmiHeightNum.value = '';
  } //監聽事件表


  btnBmiSubmit.addEventListener('click', bmiCount);
  btnBmiDelete.addEventListener('click', textDelete);
});
"use strict";

$(document).ready(function () {
  //請解讀 Vic 的(程式碼)，並在 Slack 上回報他以下邏輯是做了什麼事情：
  // arrayBMIrecord 的陣列用途是什麼？
  //用來儲存每次重新整理之前的BMI查詢記錄
  // 請描述 calculateBMI 函式做了什麼事情
  // 1. 先取值
  // 2. 把數值計算成BMI值
  // 3. 宣告一個空變數，內容包含[身高、體重、BMI、title]
  // 4. 把身高、體重、BMI值存在那個空變數，
  // 5. if判斷BMI屬於哪種title，知道之後賦值給status.title
  // 6. 把結果push去arrayBMIrecord
  // 7. 執行render()函式
  // 8. 把input清空
  // 請描述 render 函式做了什麼事情
  //render主要用來產生innerHtml，顯示結果
  // 重新命名: 元素名稱+客製化名稱
  var inputHeight = document.querySelector('.height');
  var inputKg = document.querySelector('.kg');
  var btnSend = document.querySelector('.send');
  var listRecord = document.querySelector('.list');
  var arrayBMIrecord = [];
  /* 定義物件資料，此為 BMIData物件之所有屬性 */

  var BMIData = {
    overThin: {
      "class": 'text-secondary',
      nameStatus: '體重過輕'
    },
    normal: {
      "class": 'text-primary',
      nameStatus: '正常'
    },
    warning: {
      "class": 'text-warning',
      nameStatus: '過重'
    },
    danger: {
      "class": 'text-danger',
      nameStatus: '危險'
    }
  };
  /* 渲染畫面 */
  // forEach()，取出陣列所有物件並做處理

  function render() {
    var str = '';
    arrayBMIrecord.forEach(function (item) {
      return str += '<li>BMI指數為 :' + item.BMI + ' 狀態是 <span class="' + BMIData[item.status]["class"] + '">' + BMIData[item.status].nameStatus + '</span></li>';
    });
    listRecord.innerHTML = str;
  }
  /* 處理/加入資料， */


  function calculateBMI() {
    var numberHeight = inputHeight.value;
    var numberKG = inputKg.value;
    var numberBMI = parseInt(numberKG / Math.pow(numberHeight / 100, 2)); // 定義紀錄資料

    var userRecord = {
      height: '',
      weight: '',
      BMI: '',
      status: ''
    }; // 增加資料到物件

    userRecord.height = Number(numberHeight);
    userRecord.weight = Number(numberKG);
    userRecord.BMI = numberBMI;

    if (numberBMI < 18.5) {
      userRecord.status = 'overThin';
    } else if (numberBMI >= 18.5 && numberBMI <= 23) {
      userRecord.status = 'normal';
    } else if (numberBMI > 23 && numberBMI <= 35) {
      userRecord.status = 'warning';
    } else {
      userRecord.status = 'danger';
    } // 增加物件到陣列


    arrayBMIrecord.push(userRecord); //渲染畫面

    render();
    inputHeight.value = '';
    inputKg.value = "";
  }

  btnSend.addEventListener('click', calculateBMI);
});
//# sourceMappingURL=all.js.map
