const startBtn = document.getElementById("start-btn");
        const stopBtn = document.getElementById("stop-btn");
        const transcriptionDiv = document.getElementById("transcription");
        const langEnBtn = document.getElementById("lang-en");
        const langPlBtn = document.getElementById("lang-pl");
        const canvas = document.getElementById("audio-visualizer");
        const audioStartBtn = document.getElementById("audio-start");
        const canvasContext = canvas.getContext("2d");

        let recognition;
        let language = "pl-PL";
        let fullTranscription = "";

        function changeLanguage(lang) {
            if (recognition) recognition.stop();
            language = lang === 'en' ? "en-US" : "pl-PL";
            recognition.lang = language;

            if (lang === 'en') {
                langEnBtn.classList.add("active");
                langPlBtn.classList.remove("active");
            } else {
                langPlBtn.classList.add("active");
                langEnBtn.classList.remove("active");
            }
            console.log("Język zmieniony na " + (lang === 'en' ? "angielski" : "polski"));
        }

        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.lang = language;
            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.onresult = (event) => {
                let interimTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if(event.results[i].isFinal){
                        fullTranscription+= event.results[i][0].transcript + " ";
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                transcriptionDiv.innerText = fullTranscription + interimTranscript;
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
        
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save text";
        document.body.appendChild(saveBtn);

        saveBtn.addEventListener("click", () => {
            const blob = new Blob([fullTranscription], { type: 'text/plain'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "transcription.txt";
            a.click();
            URL.revokeObjectURL(url);
        });

        langEnBtn.addEventListener("click", () => changeLanguage('en'));
        langPlBtn.addEventListener("click", () => changeLanguage('pl'));

        let audioContext, analyser, microphone;
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                audioContext = new AudioContext();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
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

                audioStartBtn.addEventListener("click", () => {
                    audioContext.resume().then(() => {
                        console.log("AudioContext uruchomiony.");
                        visualize();
                    });
                });
            });