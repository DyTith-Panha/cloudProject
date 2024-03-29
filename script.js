let voiceSelect = document.querySelector('select');
let speech = new SpeechSynthesisUtterance();
let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();

    // Clear existing options
    voiceSelect.innerHTML = '';

    voices.forEach(voice => {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });

    // Set the default voice for the speech
    speech.voice = voices[0];
};

// Update the selected voice when the user changes the dropdown selection
voiceSelect.addEventListener('change', () => {
    let selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    speech.voice = voices.find(voice => voice.name === selectedVoice);
});

document.querySelector('button').addEventListener('click', () => {
    speech.text = document.querySelector('textarea').value;
    window.speechSynthesis.speak(speech);
});
