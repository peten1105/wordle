const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;
let first = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:30vw; background-color:white; width:300px; height:100px; font-size:20px";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    //정답확인
    let 맞은_개수 = 0;
    console.log("enter");
    for (let i = 0; i < 5; i++) {
      const curBlock = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력_글자 = curBlock.innerText;
      const 정답_글자 = 정답[i];

      console.log(입력_글자, "= ", 정답_글자);

      if (입력_글자 === 정답_글자) {
        맞은_개수++;
        curBlock.style.background = "#6AAA64";
      } else if (정답.includes(입력_글자)) {
        curBlock.style.background = "#C9B458";
      } else {
        curBlock.style.background = "#787c7E";
      }
      curBlock.style.color = "white";
    }

    if (맞은_개수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const curBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );

      curBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const startTimer = () => {
    const 시작_시간 = new Date();
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector("#timer");
      timeH1.innerHTML = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerHTML = key.toUpperCase();
      index++;
      if (first === 0) {
        startTimer();
        first++;
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
}

appStart();
