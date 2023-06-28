function sendBtn() {
    var input_content = document.querySelector("#ta_input");
    var msg = input_content.value;
    var textSection = document.getElementById("text-padel");
    if (!msg) {
        alert("输入为空");
        return;
    }
    textSection.innerHTML += `<div class="my-content">
    <div class="my-text">${msg}</div>
    <label>泷晴</label>
  </div>`
    textSection.scrollTop = textSection.scrollHeight; // 自动显示最新消息
    input_content.value = '';
}

function clean() {
    var ta = document.getElementById("ta_input");
    ta.value = "";
}

function chatToWangji() {
    
}