// Add compatibility with Google Chrome browser among others

let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
let SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// Speech Recognition initial settings
// These settings will probably not be used
let grammar = '#JSGF V1.0; grammar colors; public <color> = red | green;';
let recognition = new SpeechRecognition();
let speech_recognition_list = new SpeechGrammarList();
speech_recognition_list.addFromString(grammar);

// Speech Recognition final settings

recognition.grammars = speech_recognition_list;
recognition.continuos = true;
recognition.lang = 'en-US';
recognition.interimResult = true;
recognition.maxAlternatives = 1;

// Function to handle the speech recognition result

function treatString(result) {
    result = result.replace(/\./, '')
    result_final = result.toLowerCase()
    return result_final
}

// Function to display the counter

function countNumber() {
    let count = 0;
    while (count <= 10) {
        count++
        console.log(`Is ${count}`)
    }
}

// Function to start Speech Recognition, then write counter to browser console

function startRecognition(recognition) {
    recognition.start()
    recognition.onresult = function(event)  {
        let result_recognition = event.results[0][0].transcript

        // Treat the result string
        let result_final = treatString(result_recognition)

        // Checks if the result is equal to the word "start", and thus starts the counter
        if (result_final == 'start') {
            console.log('It worked')
            countNumber()       
        }
    }
}

// Start Speech Recognition

let btn_speak = document.getElementById('button-speech')
btn_speak.addEventListener('click', () => {
    startRecognition(recognition)
})