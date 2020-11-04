socket.on("chat-message", (msg) => {
    appendMessage(msg);
})

function appendMessage(msg){
    html = `<p>${msg}</p>`;
    $("#chat-message").append(html);
}

function toBottomScroll(){
    $("#chat-message").scrollTop($("#chat-message")[0].scrollHeight);
}

function sendMessage(msg){
    if(msg === ""){ return }
    socket.emit("chat" , msg);
    appendMessage(msg);
    toBottomScroll();
}

function onSendClick(){
    const input = document.getElementById("msg-input");
    sendMessage(input.value);
    input.value = "";
}

const msgInput = document.getElementById("msg-input");
msgInput.addEventListener("keydown", e => {
    
    if(e.keyCode === 13){
        e.preventDefault();
        document.getElementById("send-btn").click();
    }
})