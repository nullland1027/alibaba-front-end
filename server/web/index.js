// 快捷选择方法
function $(query) {
  return document.querySelector(query)
}

// 登录模块
var login = $('#login');
// 聊天室模块
var chatroom = $('#chatroom');

var socket = null;
var name = null;

// 登录方法
function onLoginFunction() {
  var inputNameValue = $('#inputName').value;
  var inputPwdValue = $('#inputPwd').value;

  if (!inputNameValue) {
    alert('请输入用户名');
    return;
  }
  if (!inputPwdValue) {
    alert('请输入密码');
    return;
  }

  socket = io({
    query: {
      name: inputNameValue,
      password: inputPwdValue
    },
    reconnection: false,
    transports: ['websocket']
  });

  socket.on('connect_error', (e) => {
    console.log('connect_error', e);
    if (e && e.message === 'conflict') {
      alert('昵称已经存在了，请换一个昵称');
      return;
    }
    alert('链接失败，请检查服务器地址');
  });

  socket.on('disconnect', (e) => {
    console.log('disconnect', e);
    alert('服务器链接断开，请重新登录');
    location.reload();
  });

  socket.on('connect', () => {
    name = inputNameValue;
    $('.my-profile').innerHTML = name;
    login.setAttribute("class", "login disappear");
    setTimeout(() => {
      chatroom.setAttribute("style", "display: flex");
    }, 1500);

    socket.on('online', (onlines) => {
      console.log('onlines', onlines);
      var friendSection = $('.friend-box');
      friendSection.innerHTML = onlines.map(name => {
        return `<p class="friend-profile">${name}</p>`;
      }).join('');
    });

    socket.on('receiveMessage', (message) => {
      var textSection = $('.text-section');
      textSection.innerHTML += (
        `<div class="other-content">
          <label>${message.sender}</label>
          <div class="my-text">${message.content}</div>
        </div>`
      );
      textSection.scrollTop = textSection.scrollHeight;
    });

    socket.emit('getHistory', (data) => {
      console.log('history', data);
      var textSection = $('.text-section');
      textSection.innerHTML = data.map((value) => {
        if (value.sender == name) {
          return (
            `<div class="my-content">
              <div class="my-text">${value.content}</div>
              <label>${value.sender}</label>
            </div>`
          );
        }
        return (
          `<div class="other-content">
            <label>${value.sender}</label>
            <div class="my-text">${value.content}</div>
          </div>`
        );
      }).join('');
    });
  });

}
var loginBtn = $('#loginBtn');
loginBtn.addEventListener('click', onLoginFunction);

// 发送
function onSendFunction() {
  var textSection = $('.text-section');
  var msg = $('.input-area').value;
  if (!msg) {
    alert('请输入内容');
    return;
  }
  $('.input-area').value = '';
  textSection.innerHTML += `<div class="my-content">
    <div class="my-text">${msg}</div>
    <label>${name}</label>
  </div>`;
  socket.emit('sendMessage', msg);
  textSection.scrollTop = textSection.scrollHeight;

}
var sendBtn = $('.send-button');
sendBtn.addEventListener('click', onSendFunction);

var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("myBtn").click();
    }
});

var pwdEdit = document.getElementById("inputPwd");
pwdEdit.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("loginBtn").click();
    }
});