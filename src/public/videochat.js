const socket = io("ws://localhost:3002");
const peer = new Peer();
const peers = [];

peer.on("open", (userId) => {
    socket.emit("join-room", ROOM_ID, userId);
});

socket.on("user-disconnected", userId => {
   if(peers[userId]) {
        peers[userId].close();
    }
})

// stream my video
const constraint = {
    video: true,
    audio: false,
};

navigator.mediaDevices.getUserMedia(constraint).then((stream) => {
    
    addVideoStream(stream);
    
    // answer call
    answerCall(stream);

    // on new user connect
    socket.on("new-user-join", (userId) => {
        // everybody call new user
        callNewUser(userId , stream);
    });
    
});

function answerCall(stream){
    peer.on("call", (call) => {
        const video = document.createElement("video");
        call.answer(stream);
        call.on("stream", (remoteStream) => {
            appendVideo(video, remoteStream);
        });
        call.on("close", () => {
            video.remove();
        })
        peers[call.peer] = call;
    })
}

function callNewUser(userId, stream){

    const video = document.createElement("video");
    const call = peer.call(userId , stream);
    call.on("stream", (remoteStream) => {
        appendVideo(video, remoteStream);
    });
    call.on("close", () => {
        video.remove();
    })

    peers[userId] = call;
  
}

function appendVideo(video, stream){
    video.autoplay = true;
    video.srcObject = stream;
    const videoGrid = document.getElementById("video-grid");
    videoGrid.append(video);
}

function addVideoStream(stream) {
    const video = document.createElement("video");
    appendVideo(video, stream);
}
// ---

