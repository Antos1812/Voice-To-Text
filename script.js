<<<<<<< HEAD
// Comments
const startBtn = document.getElementById("start-btn");
        const stopBtn = document.getElementById("stop-btn");
        const transcriptionDiv = document.getElementById("transcription");
        const langEnBtn = document.getElementById("lang-en");
        const langPlBtn = document.getElementById("lang-pl");

        let recognition;
        let language = "pl-PL";

        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.lang = language;
            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.onresult = (event) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                transcriptionDiv.innerText = transcript;
            };

            recognition.onerror = (event) => {
                console.error("Błąd rozpoznawania mowy:", event.error);
            };

            recognition.onend = () => {
                startBtn.disabled = false;
                stopBtn.disabled = true;
                console.log("Rozpoznawanie mowy zakończone.");
            };
        } else {
            alert("Web Speech API nie jest obsługiwane w tej przeglądarce.");
        }

        startBtn.addEventListener("click", () => {
            if (recognition) {
                recognition.start();
                startBtn.disabled = true;
                stopBtn.disabled = false;
                console.log("Rozpoczęto rozpoznawanie mowy.");
            }
        });

        stopBtn.addEventListener("click", () => {
            if (recognition) {
                recognition.stop();
            }
        });

        langEnBtn.addEventListener("click", () => {
            language = "en-US";
            recognition.lang = language;
            console.log("Język zmieniony na angielski");
        });

        langPlBtn.addEventListener("click", () => {
            language = "pl-PL";
            recognition.lang = language;
            console.log("Język zmieniony na polski");
        });

        const canvas = document.getElementById("audio-visualizer");
        const canvasContext = canvas.getContext("2d");

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.fftSize = 256;
                microphone.connect(analyser);

                function visualize() {
                    analyser.getByteFrequencyData(dataArray);
                    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

                    const barWidth = canvas.width / dataArray.length;
                    let barHeight;
                    let x = 0;

                    for (let i = 0; i < dataArray.length; i++) {
                        barHeight = dataArray[i] / 2;
                        canvasContext.fillStyle = "rgb(" + (barHeight + 100) + ", 50, 50)";
                        canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                        x += barWidth + 1;
                    }

                    requestAnimationFrame(visualize);
                }

                visualize();
            })
            .catch((err) => {
                console.error("Błąd dostępu do mikrofonu:", err);
                alert("Nie udało się uzyskać dostępu do mikrofonu.");
=======
const startBtn = document.getElementById("start-btn");
        const stopBtn = document.getElementById("stop-btn");
        const transcriptionDiv = document.getElementById("transcription");
        const langEnBtn = document.getElementById("lang-en");
        const langPlBtn = document.getElementById("lang-pl");

        let recognition;
        let language = "pl-PL";

        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.lang = language;
            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.onresult = (event) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                transcriptionDiv.innerText = transcript;
            };

            recognition.onerror = (event) => {
                console.error("Błąd rozpoznawania mowy:", event.error);
            };

            recognition.onend = () => {
                startBtn.disabled = false;
                stopBtn.disabled = true;
                console.log("Rozpoznawanie mowy zakończone.");
            };
        } else {
            alert("Web Speech API nie jest obsługiwane w tej przeglądarce.");
        }

        startBtn.addEventListener("click", () => {
            if (recognition) {
                recognition.start();
                startBtn.disabled = true;
                stopBtn.disabled = false;
                console.log("Rozpoczęto rozpoznawanie mowy.");
            }
        });

        stopBtn.addEventListener("click", () => {
            if (recognition) {
                recognition.stop();
            }
        });

        langEnBtn.addEventListener("click", () => {
            language = "en-US";
            recognition.lang = language;
            console.log("Język zmieniony na angielski");
        });

        langPlBtn.addEventListener("click", () => {
            language = "pl-PL";
            recognition.lang = language;
            console.log("Język zmieniony na polski");
        });

        const canvas = document.getElementById("audio-visualizer");
        const canvasContext = canvas.getContext("2d");

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.fftSize = 256;
                microphone.connect(analyser);

                function visualize() {
                    analyser.getByteFrequencyData(dataArray);
                    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

                    const barWidth = canvas.width / dataArray.length;
                    let barHeight;
                    let x = 0;

                    for (let i = 0; i < dataArray.length; i++) {
                        barHeight = dataArray[i] / 2;
                        canvasContext.fillStyle = "rgb(" + (barHeight + 100) + ", 50, 50)";
                        canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                        x += barWidth + 1;
                    }

                    requestAnimationFrame(visualize);
                }

                visualize();
            })
            .catch((err) => {
                console.error("Błąd dostępu do mikrofonu:", err);
                alert("Nie udało się uzyskać dostępu do mikrofonu.");
>>>>>>> 6b782bb525511b1963d8ce010a55780c45ab88d6
            });