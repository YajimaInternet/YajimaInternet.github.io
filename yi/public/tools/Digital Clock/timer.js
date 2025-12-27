  // 入力された時間を秒に変換する関数
function convertToSeconds(hour, minute, second) {
  return hour * 3600 + minute * 60 + second;
}

// 秒を時間、分、秒に変換する関数
function convertToHMS(seconds) {
  let hour = Math.floor(seconds / 3600);
  let minute = Math.floor((seconds % 3600) / 60);
  let second = seconds % 60;
  return [hour, minute, second];
}

// タイマーの要素を取得する
let hourInput = document.getElementById("hour");
let minuteInput = document.getElementById("minute");
let secondInput = document.getElementById("second");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");

// タイマーの状態を管理する変数
let timerId; // タイマーのID
let remainingTime; // 残り時間（秒）
let isRunning = false; // タイマーが動いているかどうか

// スタートボタンが押されたときの処理
startButton.addEventListener("click", function () {
  // タイマーが動いていないときだけ処理する
  if (!isRunning) {
    // 入力された時間を取得する
    let hour = parseInt(hourInput.value);
    let minute = parseInt(minuteInput.value);
    let second = parseInt(secondInput.value);

    // 入力された時間が正しいかチェックする
    if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
      alert("時間を正しく入力してください");
      return;
    }
    
    if (hour === 0 && minute === 0 && second === 0) {
      alert("時間を設定してください");
      return;
    }

    // 入力された時間を秒に変換する
    remainingTime = convertToSeconds(hour, minute, second);

    // タイマーを開始する
    timerId = setInterval(function () {
      // 残り時間を減らす
      remainingTime--;

      // 残り時間を時間、分、秒に変換する
      let [hour, minute, second] = convertToHMS(remainingTime);

      // 残り時間を表示する
      hourInput.value = hour;
      minuteInput.value = minute;
      secondInput.value = second;

      // 残り時間が0になったらタイマーを停止する
      if (remainingTime === 0) {
        clearInterval(timerId);
        isRunning = false;
		  const audio = new Audio('winxp-start.mp3');
		  audio.volume = 0.4;
        audio.play();


      }
    }, 1000);

    // タイマーの状態を更新する
    isRunning = true;
  }
});

// ストップボタンが押されたときの処理
stopButton.addEventListener("click", function () {
  // タイマーが動いているときだけ処理する
  if (isRunning) {
    // タイマーを停止する
    clearInterval(timerId);

    // タイマーの状態を更新する
    isRunning = false;
  }
});

// リセットボタンが押されたときの処理
resetButton.addEventListener("click", function () {
  // タイマーが動いているときは停止する
  if (isRunning) {
    clearInterval(timerId);
    isRunning = false;
  }

  // 時間を初期値に戻す
  hourInput.value = 0;
  minuteInput.value = 0;
  secondInput.value = 0;
});
