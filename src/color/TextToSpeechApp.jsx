import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Settings, Volume2 } from 'lucide-react';

const TextToSpeechApp = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      const englishVoice =
        availableVoices.find((voice) => voice.lang.startsWith('en') && voice.default) ||
        availableVoices.find((voice) => voice.lang.startsWith('en'));

      if (englishVoice) {
        setSelectedVoice(englishVoice);
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = () => {
    if (!text.trim()) {
      alert('Please enter some text to speak');
      return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
      alert('An error occurred during speech synthesis');
    };

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentUtterance(null);
  };

  const sampleTexts = [
    'Hello! This is a sample text to test the text-to-speech functionality.',
    'The quick brown fox jumps over the lazy dog.',
    'Technology has transformed the way we communicate and interact with the world around us.',
    'Welcome to our text-to-speech application. Feel free to enter your own text and customize the voice settings.',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <Volume2 className="text-blue-600" size={40} />
              Text to Speech
            </h1>
            <p className="text-gray-600">Enter text below and convert it to speech</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="textInput" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your text
              </label>
              <textarea
                id="textInput"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isPlaying && !isPaused}
              />
              <div className="text-right text-sm text-gray-500 mt-1">{text.length} characters</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Quick samples:</h3>
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setText(sample)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                    disabled={isPlaying && !isPaused}
                  >
                    Sample {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {!isPlaying ? (
                <button
                  onClick={speak}
                  disabled={!text.trim()}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Play size={20} />
                  Speak
                </button>
              ) : (
                <div className="flex gap-2">
                  {!isPaused ? (
                    <button
                      onClick={pause}
                      className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <Pause size={20} />
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={resume}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <Play size={20} />
                      Resume
                    </button>
                  )}
                  <button
                    onClick={stop}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Square size={20} />
                    Stop
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Settings size={20} />
                Settings
              </button>
            </div>

            {showSettings && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Voice Settings</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice ({voices.length} available)
                  </label>
                  <select
                    value={selectedVoice ? voices.indexOf(selectedVoice) : ''}
                    onChange={(e) => setSelectedVoice(voices[parseInt(e.target.value)])}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    {voices.map((voice, index) => (
                      <option key={index} value={index}>
                        {voice.name} ({voice.lang}) {voice.default ? '(Default)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speed: {rate.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pitch: {pitch.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume: {Math.round(volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => {
                    setRate(1);
                    setPitch(1);
                    setVolume(1);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset to defaults
                </button>
              </div>
            )}

            {isPlaying && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  {isPaused ? 'Paused' : 'Speaking...'}
                </div>
              </div>
            )}

            <div className="text-center text-sm text-gray-500 border-t pt-4">
              <p>This application uses the Web Speech API. Make sure your browser supports speech synthesis.</p>
              <p className="mt-1">Works best in Chrome, Safari, and Edge browsers.</p>
              <div className="mt-2">Made with ❤️ by VisionFlex</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeechApp;
