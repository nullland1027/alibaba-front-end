//alert("你好鸭");
/** */
var a = 5;
var b = 6;
var c = a < b && b >= a++;

document.write(`<p>c value is ${c}</p>`)

var aa = 4;
var bb = 6;
var sum = ((++aa + 3) / (8 - (--bb))) * 3;
document.write(sum)
document.write("\n")


document.write(Math.floor(Math.random() * 10));
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
document.write("$nbsp" + getRandomNumber(0, 40))
