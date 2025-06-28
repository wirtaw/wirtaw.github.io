"use strict";

let dropdowns;
let voices = [];
let langs = [];
const synth = window.speechSynthesis;
let voiceSelect = null;
let langSelect = null;
let canSpeech2Text = false;
let paused = false;
const defaultLanguage = 'en-GB';
const defaultVoice = 'English (Great Britain)+Mr_Serious (en-GB)';

(function () {
  voiceSelect = document.getElementById("voice-select");
  langSelect = document.getElementById("lang-select");
  const speechSection = document.getElementById("speech-section");
  const notificationSection = document.getElementById("notification-section");
  const playButton = document.getElementById("play-button");
  const pauseButton = document.getElementById("pause-button");
  const loadingMessage = document.getElementById("loading-message");

  if (playButton) {
    playButton.addEventListener("click", playText2Speach);
  }
  if (pauseButton) {
    pauseButton.addEventListener("click", pauseText2Speach);
  }

  if (!("speechSynthesis" in window)) {
    speechSection.classList.replace("is-block", "is-hidden");
    notificationSection.classList.replace("is-hidden", "is-block");
    notificationSection.querySelector('p').innerHTML = `
      <span class="icon is-large"><i class="fa fa-exclamation-triangle"></i></span>
      <br>
      Unfortunately, your browser doesn't fully support the
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" target="_blank" rel="noopener noreferrer">Web Speech API's Speech Synthesis</a>
      feature. Please try a modern browser like Chrome, Firefox, or Edge.
    `;
  } else {
    synth.onvoiceschanged = initSpeechSynthesis;

    if (synth.getVoices().length > 0) {
      initSpeechSynthesis();
    } else {
      speechSection.classList.replace("is-block", "is-hidden");
      notificationSection.classList.replace("is-hidden", "is-block");
      if (loadingMessage) {
        loadingMessage.classList.replace("is-hidden", "is-block");
      }
    }
  }
})();

function initSpeechSynthesis() {
  const speechSection = document.getElementById("speech-section");
  const notificationSection = document.getElementById("notification-section");
  const loadingMessage = document.getElementById("loading-message");

  voices = synth.getVoices();
  if (voices.length > 0) {
    canSpeech2Text = true;
    populateLangList();
    populateVoiceList();
    speechSection.classList.replace("is-hidden", "is-block");
    notificationSection.classList.replace("is-block", "is-hidden");
  } else {
    speechSection.classList.replace("is-block", "is-hidden");
    notificationSection.classList.replace("is-hidden", "is-block");
    notificationSection.querySelector('p').innerHTML = `
      <span class="icon is-large"><i class="fa fa-exclamation-triangle"></i></span>
      <br>
      Speech synthesis voices could not be loaded. Please ensure your browser has voices available.
    `;
  }
  if (loadingMessage) {
    loadingMessage.classList.replace("is-block", "is-hidden");
  }
}

function playText2Speach() {
  if (!canSpeech2Text) {
    console.warn("Speech synthesis not ready or not supported.");
    return;
  }

  if (paused) {
    paused = false;
    synth.resume();
  } else {
    const textArea = document.getElementById("text2speech");
    const pitch = document.getElementById("pitch");
    const rate = document.getElementById("rate");

    const text = textArea.value;

    if (text) {
      const utterThis = new SpeechSynthesisUtterance(text);

      utterThis.onstart = function () {
        console.log("SpeechSynthesisUtterance.onstart");
        paused = false;
      };

      utterThis.onpause = function () {
        console.log("SpeechSynthesisUtterance.onpause");
        paused = true;
      };

      utterThis.onend = function () {
        console.log("SpeechSynthesisUtterance.onend");
        paused = false;
      };

      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror:", event.error);
      };

      const selectedOption =
        voiceSelect.selectedOptions[0].getAttribute("data-name");

      const selectedVoice = voices.find(voice => voice.name === selectedOption);
      if (selectedVoice) {
          utterThis.voice = selectedVoice;
      } else {
          console.warn("Selected voice not found, using default.");
      }

      utterThis.pitch = pitch?.value ? parseFloat(pitch.value) : 1;
      utterThis.rate = rate?.value ? parseFloat(rate.value) : 1;
      synth.speak(utterThis);
    }
  }
}

function pauseText2Speach() {
  synth.pause();
}

function populateLangList() {
  if (canSpeech2Text && langSelect) {
    langs = [...new Set(synth.getVoices().map(({ lang }) => lang))].sort(
      function (a, b) {
        const aname = a.toUpperCase();
        const bname = b.toUpperCase();

        if (aname < bname) {
          return -1;
        } else if (aname === bname) {
          return 0;
        } else {
          return +1;
        }
      }
    );

    const selectedLangIndex =
      langSelect.selectedIndex < 0 ? 0 : langSelect.selectedIndex;
    langSelect.innerHTML = "";

    for (let i = 0; i < langs.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${langs[i]}`;

      option.setAttribute("data-name", langs[i]);
      option.value = langs[i];
      langSelect.appendChild(option);
    }
    langSelect.selectedIndex = selectedLangIndex;
  }
}

function populateVoiceList() {
  if (canSpeech2Text && voiceSelect) {
    const selectedLang = langs[langSelect.selectedIndex] || 0;

    voices = synth
      .getVoices()
      .filter(({ lang }) => lang === selectedLang)
      .sort(function (a, b) {
        const aname = a.name.toUpperCase();
        const bname = b.name.toUpperCase();

        if (aname < bname) {
          return -1;
        } else if (aname === bname) {
          return 0;
        } else {
          return +1;
        }
      });
    const selectedIndex =
      voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = "";

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " -- DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      option.value = voices[i].name;
      voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
  }
}

if (langSelect) {
  langSelect.addEventListener("change", () => populateVoiceList());
}