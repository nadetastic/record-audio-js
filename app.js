let chunks = []
const audio = new Audio()

// Start stream
navigator.mediaDevices.getUserMedia({ audio: true }).then(data => {

    // Initialize Media Recorder
    const mediaRecorder = new MediaRecorder(data)

    // Auto start recording, but can wrap in a function for control
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");

    // As data is available push to chunks array
    mediaRecorder.ondataavailable = function(e) {
        console.log('data available',e.data)
        console.log(typeof(e.data))
        chunks.push(e.data);
    }

    // Auto stop recording after 5 seconds
    setTimeout(() => {
        mediaRecorder.stop();
    }, 5000);

    // When MediaRecorder is stopped, create blob from chunks and auto play the audio
    mediaRecorder.onstop = function(e) {
        console.log("MediaRecorder.stop() called.");
        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        const audioURL = window.URL.createObjectURL(blob)
        audio.src = audioURL
        audio.play();
      }
    
})
.catch(e => {
    console.error('Some error',e)
})