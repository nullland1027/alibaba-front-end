function login() {
    var inputName = document.getElementById("input_name").value;
    var inputPwd = document.getElementById("input_pwd").value;

    if (inputName == '' && inputPwd == '') {
        onLoginFunction();
        return;
    }
    alert("密码错误");
}

function onLoginFunction() {
    document.getElementById('login').setAttribute("class", "login disappear");
    setTimeout(() => {
      document.getElementById('chatroom').setAttribute("style", "display: flex");
    }, 1500);
  }