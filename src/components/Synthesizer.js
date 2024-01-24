// import React, { useState, useEffect } from 'react'
// import * as Tone from 'tone';



// // import { Donut } from 'react-dial-knob'

// import Search from "./Search";
// import PresetList from "./PresetList";


// function Synthesizer() {
//     const [presets, setPresets] = useState([])
//     const [search, setSearch] = useState("")

//     const [volume, setVolume] = useState(50);


    



//     const synth = new Tone.Synth().toDestination();
//     const now = Tone.now()
//     synth.triggerAttack("C4", now)
//     synth.triggerRelease(now + 1)

//     useEffect(() => {
//         fetch("http://localhost:3000/presets")
//           .then(response => response.json())
//           .then(setPresets)
//       }, [])
  
//     const displayedPresets = presets.filter((presets) => presets.name.toLowerCase().includes(search.toLowerCase()))

//     const handleVolumeChange = (e) => {
//       const newVolume = e.target.value;
//       setVolume(newVolume);
//       synth.volume.value = newVolume;
//     };





//   return (
//     <div className="synth-body">
//         <div>
//             <Search search={search} setSearch={setSearch}/>
//             <PresetList presets={displayedPresets} />
//         </div>
//         <label>Volume:</label>
//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={volume}
//           onChange={handleVolumeChange}
//         />
//         <button onClick = {async() => await Tone.start()}>Play Sound</button>

        
//     </div>
//   );
// }

// export default Synthesizer;



// src/components/Synthesizer.js
import React, { useState, useEffect, useRef } from 'react';
import { Synth, AMSynth, FMSynth, MonoSynth, Reverb, Delay, Distortion } from 'tone';



const Synthesizer = () => {
  const [volume, setVolume] = useState(50);
  const [pitch, setPitch] = useState(440);
  const [reverb, setReverb] = useState(0);
  const [delay, setDelay] = useState(0);
  const [distortion, setDistortion] = useState(0);
  const [synthType, setSynthType] = useState('AMSynth');
  const [waveform, setWaveform] = useState('sine');
  const [selectedPreset, setSelectedPreset] = useState('Default');
  
  const synthRef = useRef(createSynth());
  // let synth = useRef(createSynth()).current;

  function createSynth() {
    let newSynth;

    switch (synthType) {
      case 'AMSynth':
        newSynth = new AMSynth().toDestination();
        break;
      case 'FMSynth':
        newSynth = new FMSynth().toDestination();
        break;
      case 'MonoSynth':
        newSynth = new MonoSynth().toDestination();
        break;
      default:
        newSynth = new Synth().toDestination();
    }

    // Connect effects
    if (reverb > 0) {
      const reverbEffect = new Reverb(reverb).toDestination();
      newSynth.connect(reverbEffect);
    }

    if (delay > 0) {
      const delayEffect = new Delay(delay).toDestination();
      newSynth.connect(delayEffect);
    }

    if (distortion > 0) {
      const distortionEffect = new Distortion(distortion).toDestination();
      newSynth.connect(distortionEffect);
    }

    return newSynth;
  }

  useEffect(() => {
    synthRef.current.disconnect();
    synthRef.current = createSynth();
  }, [synthType, reverb, delay, distortion]);

  useEffect(() => {
  
    // synth = createSynth(); // Update synth with the newly created synthesizer

    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        const defaultPreset = data.presets.find((preset) => preset.name === 'Default');
        const loadedPreset = data.presets.find((preset) => preset.name === selectedPreset);

        const presetToLoad = loadedPreset || defaultPreset;

        if (presetToLoad) {
          setVolume(presetToLoad.volume);
          setPitch(presetToLoad.pitch || 440);
          setReverb(presetToLoad.reverb || 0);
          setDelay(presetToLoad.delay || 0);
          setDistortion(presetToLoad.distortion || 0);
          setSynthType(presetToLoad.synthType || 'AMSynth');
          setWaveform(presetToLoad.waveform || 'sine');

          synthRef.current.disconnect();
          synthRef.current = createSynth();
          synthRef.current.volume.value = presetToLoad.volume;
          synthRef.current.triggerAttack(presetToLoad.pitch || 440);
        }
      });
  }, [selectedPreset]);


  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    synthRef.volume.value = volume;
  };

  const handlePitchChange = (e) => {
    const newPitch = parseFloat(e.target.value);
    setPitch(newPitch);
    synthRef.triggerAttack(newPitch);
  };

  const handleReverbChange = (e) => {
    const newReverb = parseFloat(e.target.value);
    setReverb(newReverb);
    synthRef.current.disconnect();
    synthRef.current = createSynth();
    synthRef.current.connect(new Reverb(newReverb));
  };

  const handleDelayChange = (e) => {
    const newDelay = parseFloat(e.target.value);
    setDelay(newDelay);
    synthRef.current.disconnect();
    synthRef.current = createSynth();
    synthRef.current.connect(new Delay(newDelay));
  };

  const handleDistortionChange = (e) => {
    const newDistortion = parseFloat(e.target.value);
    setDistortion(newDistortion);
    synthRef.current.disconnect();
    synthRef.current = createSynth();
    synthRef.current.connect(new Distortion(newDistortion));
  };

  const handleSynthTypeChange = (e) => {
    const newSynthType = e.target.value;
    setSynthType(newSynthType);
    synthRef.current.disconnect();
    synthRef.current = createSynth();
    // Connect new synthesizer to effects
    if (reverb > 0) {
      synthRef.current.connect(new Reverb(reverb));
    }
    if (delay > 0) {
      synthRef.current.connect(new Delay(delay));
    }
    if (distortion > 0) {
      synthRef.current.connect(new Distortion(distortion));
    }
  };

  const handleWaveformChange = (e) => {
    const newWaveform = e.target.value;
    setWaveform(newWaveform);
    synthRef.current.oscillator.type = newWaveform;
  };

  const handlePlaySound = () => {
    if (synthRef) {
      synthRef.current.triggerAttackRelease(pitch, '8n');
    }
  }

  
  return (
    <div>
      <h1>Synthesizer</h1>
      <label>Volume:</label>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
      <label>Pitch:</label>
      <input
        type="number"
        min="20"
        max="2000"
        step="0.1"
        value={pitch}
        onChange={handlePitchChange}
      />
      <label>Reverb:</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={reverb}
        onChange={handleReverbChange}
      />
      <label>Delay:</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={delay}
        onChange={handleDelayChange}
      />
      <label>Distortion:</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={distortion}
        onChange={handleDistortionChange}
      />
      <label>Synth Type:</label>
      <select value={synthType} onChange={handleSynthTypeChange}>
        <option value="AMSynth">AMSynth</option>
        <option value="FMSynth">FMSynth</option>
        <option value="MonoSynth">MonoSynth</option>
        <option value="Synth">Synth</option>
      </select>
      <label>Waveform:</label>
      <select value={waveform} onChange={handleWaveformChange}>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
      </select>
      <button onClick={handlePlaySound}>Play Sound</button>
    </div>
    
  );
};

export default Synthesizer;


