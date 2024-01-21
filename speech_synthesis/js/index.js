'use strict';

let dropdowns;
let voices = [];
let langs = [];
const synth = window.speechSynthesis;
let voiceSelect = null;
let langSelect = null;
let canSpeech2Text = false;
let paused = false;

(function() {
  voiceSelect = document.getElementById('voice-select');
  langSelect = document.getElementById('lang-select');
  const speechSection = document.getElementById('speech-section');
  const notificationSection = document.getElementById('notification-section');

  if ( !isSupportSpeechSynthesis() ) {
    speechSection.classList.replace('is-block', 'is-hidden');
    notificationSection.classList.replace('is-hidden', 'is-block');
  } else {
    synth.onvoiceschanged = init();
  }
})();

window.speechSynthesis.onvoiceschanged = function(...args) {
  const voices = window.speechSynthesis.getVoices();
  console.log('Voices loaded:', voices);
}

function init() {
  const speechSection = document.getElementById('speech-section');
  const notificationSection = document.getElementById('notification-section');

  voices = synth.getVoices();
  canSpeech2Text = true;
  populateLangList();
  populateVoiceList();
  speechSection.classList.replace('is-hidden', 'is-block');
  notificationSection.classList.replace('is-block', 'is-hidden');
}

function isSupportSpeechSynthesis () {
  return 'speechSynthesis' in window && synth.getVoices().length > 0;
}

function playText2Speach() {
    if ( paused ) {
      paused = false;
      synth.resume();
    } else {
      const textArea = document.getElementById('text2speech');
      const pitch = document.getElementById('pitch');
      const rate = document.getElementById('rate');

      const text = textArea.value;

      if (text) {
        const utterThis = new SpeechSynthesisUtterance(text);

        utterThis.onstart = function() {
          console.log('SpeechSynthesisUtterance.onstart');
          paused = false;
        };

        utterThis.onpause = function() {
          console.log('SpeechSynthesisUtterance.onpause');
          paused = true;
        };

        utterThis.onend = function() {
          console.log('SpeechSynthesisUtterance.onend');
          paused = false;
        };

        utterThis.onerror = function() {
          console.error('SpeechSynthesisUtterance.onerror');
        };

        const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

        for (let i = 0; i < voices.length; i++) {
          if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
            break;
          }
        }

        utterThis.pitch = (pitch?.value) ? pitch.value : 1;
        utterThis.rate = (rate?.value) ? rate.value : 1;
        synth.speak(utterThis);
      }
    }
  }

  function pauseText2Speach() {
    synth.pause();
    window.speechSynthesis.pause();
  }

  function populateLangList() {
    if (langSelect && window.speechSynthesis.getVoices().length) {
      langs = [...new Set(synth.getVoices().map(({lang}) => lang))].sort(function(a, b) {
        const aname = a.toUpperCase();
        const bname = b.toUpperCase();

        if (aname < bname) {
          return -1;
        } else if (aname === bname) {
          return 0;
        } else {
          return +1;
        }
      });
      
      const selectedLangIndex = langSelect.selectedIndex < 0 ? 0 : langSelect.selectedIndex;
      langSelect.innerHTML = '';

      for (let i = 0; i < langs.length; i++) {
        const option = document.createElement('option');
        option.textContent = `${langs[i]}`;

        if (langs[i].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-name', langs[i]);
        langSelect.appendChild(option);
      }
      langSelect.selectedIndex = selectedLangIndex;
    }
  }

  function populateVoiceList(voicesCount = 5) {
    if (voiceSelect && window.speechSynthesis.getVoices().length) {
      voices = synth.getVoices().filter(({lang }) => lang === langs[langSelect.selectedIndex] || 0).sort(function(a, b) {
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
      const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
      voiceSelect.innerHTML = '';

      for (let i = 0; i < voicesCount; i++) {
        const option = document.createElement('option');
        option.textContent = `${voices[i].name} (${voices[i].lang})`;

        if (voices[i].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
      }
      voiceSelect.selectedIndex = selectedIndex;
    }
  }

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }