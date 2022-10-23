function testScroll(ev) {
    if (window.pageYOffset < 400) {
        document.getElementsByClassName("main-header")[0].style.display = "flex";
    } else {
        document.getElementsByClassName("main-header")[0].style.display = "none";
    }
}
var Request = new XMLHttpRequest();

window.onscroll = testScroll
