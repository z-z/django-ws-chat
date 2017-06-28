var socket;
window.onload = function () {
    socket = new WebSocket("ws://127.0.0.1:5678/");
    socket.onopen = function() {
        console.log("Соединение установлено.");
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log(event);
    };

    socket.onmessage = function(event) {
        console.log(event.data);
    };

    socket.onerror = function(error) {
        console.log("Ошибка " + error.message);
    };


};