//回调函数:上传成功之后做什么、上传进度
export default (file, callback1, callback2, url) => {
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    fd.append("file", file);
    //上传的进度
    xhr.upload.onprogress = callback2;  //代理
    //回调函数
    xhr.onload = function () {
        callback1(xhr.responseText);
    }

    //发出请求
    xhr.open("POST", url, true);
    xhr.send(fd);
}