let myFunction;
document.body.addEventListener("focusin", () => {
    //键盘弹起 (获取焦点)

    clearTimeout(myFunction);
});
document.body.addEventListener("focusout", () => {
    //失去焦点 键盘收起
    clearTimeout(myFunction);

    myFunction = setTimeout(function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, 200);
});