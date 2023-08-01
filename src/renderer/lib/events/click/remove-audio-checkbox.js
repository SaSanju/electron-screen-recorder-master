const addAudioCheckbox = document.getElementById('addAudio');

addAudioCheckbox.addEventListener('change', () => {
    if (addAudioCheckbox.checked) {
        window.withOutAudio = true;
    } else {
        window.withOutAudio = false;
    }
});