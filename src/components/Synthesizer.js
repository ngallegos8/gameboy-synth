import React, { useState, useEffect, useRef } from 'react';
import { Synth, AMSynth, FMSynth, MonoSynth, Reverb, Delay, Distortion } from 'tone';
import PresetTable from './PresetTable';



const Synthesizer = () => {
  const [volume, setVolume] = useState(50);
  const [pitch, setPitch] = useState(440);
  const [reverb, setReverb] = useState(0.01);
  const [delay, setDelay] = useState(0.01);
  const [distortion, setDistortion] = useState(0.01);
  const [reverbEffect, setReverbEffect] = useState(new Reverb(reverb).toDestination());
  const [delayEffect, setDelayEffect] = useState(new Delay(delay).toDestination());
  const [distortionEffect, setDistortionEffect] = useState(new Distortion(distortion).toDestination());
  const [synthType, setSynthType] = useState('AMSynth');
  const [waveform, setWaveform] = useState('sine');

  const [presets, setPresets] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState('Default');

  // console.log(presets)
  
  const synthRef = useRef(createSynth());
  // let synth = useRef(createSynth()).current;

  const connectEffects = () => {
    synthRef.current.connect(reverbEffect);
    synthRef.current.connect(delayEffect);
    synthRef.current.connect(distortionEffect);
  };

  const disconnectEffects = () => {
    synthRef.current.disconnect(reverbEffect);
    synthRef.current.disconnect(delayEffect);
    synthRef.current.disconnect(distortionEffect);
  };

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      reverbEffect.dispose();
      delayEffect.dispose();
      distortionEffect.dispose();
    };
  }, [reverbEffect, delayEffect, distortionEffect]);

  useEffect(() => {
    // Update the Reverb effect when reverb state changes
    reverbEffect.dispose();
    const newReverbEffect = new Reverb(reverb).toDestination();
    setReverbEffect(newReverbEffect);

    // Connect the updated effect
    connectEffects();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reverb]);

  useEffect(() => {
    // Update the Delay effect when delay state changes
    delayEffect.dispose();
    const newDelayEffect = new Delay(delay).toDestination();
    setDelayEffect(newDelayEffect);

    // Connect the updated effect
    connectEffects();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  useEffect(() => {
    // Update the Distortion effect when distortion state changes
    distortionEffect.dispose();
    const newDistortionEffect = new Distortion(distortion).toDestination();
    setDistortionEffect(newDistortionEffect);

    // Connect the updated effect
    connectEffects();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distortion]);


 


  const loadPreset = (presetName) => {
    const loadedPreset = presets.find((preset) => preset.name === presetName);

    if (loadedPreset) {
      setVolume(loadedPreset.volume);
      setPitch(loadedPreset.pitch || 440);
      setReverb(loadedPreset.reverb || 0.01);
      setDelay(loadedPreset.delay || 0.01);
      setDistortion(loadedPreset.distortion || 0.01);
      setSynthType(loadedPreset.synthType || 'AMSynth');
      setWaveform(loadedPreset.waveform || 'sine');

      synthRef.current.disconnect();
      synthRef.current = createSynth();
      synthRef.current.volume.value = loadedPreset.volume;
      synthRef.current.triggerAttack(loadedPreset.pitch || 440);
    }
  };

  const fetchPresets = () => {
    fetch('http://localhost:4000/presets')
      .then((response) => response.json())
      .then((data) => setPresets(data))
      .catch((error) => console.error('Error fetching presets:', error));
  };
  

  useEffect(() => {
    fetchPresets();
  }, []); // Fetch presets on component mount

  const handlePresetClick = (presetName) => {
    setSelectedPreset(presetName);
    loadPreset(presetName);
  };




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

    newSynth.disconnect();
  
    // Connect effects directly to the synthesizer
    const reverbEffect = new Reverb(reverb).toDestination();
    const delayEffect = new Delay(delay).toDestination();
    const distortionEffect = new Distortion(distortion).toDestination();
  
    newSynth.connect(reverbEffect);
    newSynth.connect(delayEffect);
    newSynth.connect(distortionEffect);
  
    return newSynth;
  }




  useEffect(() => {
    synthRef.current.disconnect();
    synthRef.current = createSynth();
    loadPreset(selectedPreset);
  }, [synthType, reverb, delay, distortion, selectedPreset]);



  useEffect(() => {
    // synth = createSynth(); // Update synth with the newly created synthesizer

    fetch('http://localhost:4000/presets')
      .then((response) => response.json())
      .then((data) => {
        const defaultPreset = data.find((preset) => preset.name === 'Default');
        const loadedPreset = data.find((preset) => preset.name === selectedPreset);

        const presetToLoad = loadedPreset || defaultPreset;

        if (presetToLoad) {
          setVolume(presetToLoad.volume);
          setPitch(presetToLoad.pitch || 440);
          setReverb(presetToLoad.reverb || 0.01);
          setDelay(presetToLoad.delay || 0.01);
          setDistortion(presetToLoad.distortion || 0.01);
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
    setVolume((prevVolume) => {
      synthRef.current.volume.value = newVolume;
      return newVolume;
    });
  };

  const handlePitchChange = (e) => {
    const newPitch = parseFloat(e.target.value);
    if (!isNaN(newPitch)) {
      setPitch(newPitch);
      synthRef.current.triggerRelease();
      synthRef.current.triggerAttack(newPitch);
    }
  };

  const handleReverbChangeStart = () => {
    // Trigger sound when the user starts changing the Reverb input
    if (synthRef.current) {
      synthRef.current.triggerAttack(synthRef.current?.get()?.frequency?.value);
    }
  };
  
  const handleReverbChangeEnd = () => {
    // Stop the sound when the user stops changing the Reverb input
    if (synthRef.current) {
      synthRef.current.triggerRelease();
    }
  };

  const handleReverbChange = (e) => {
    const newReverb = parseFloat(e.target.value);
    if (!isNaN(newReverb) && newReverb >= 0.01) {
      setReverb(newReverb);
      reverbEffect.disconnect(); // disconnect the old effect
      const newReverbEffect = new Reverb(newReverb).toDestination();
      setReverbEffect(newReverbEffect);
      synthRef.current.connect(newReverbEffect);
    }
  };



  const handleDelayChangeStart = () => {
    // Trigger sound when the user starts changing the Delay input
    if (synthRef.current) {
      synthRef.current.triggerAttack(synthRef.current?.get()?.frequency?.value);
    }
  };
  
  const handleDelayChangeEnd = () => {
    // Stop the sound when the user stops changing the Delay input
    if (synthRef.current) {
      synthRef.current.triggerRelease();
    }
  };

  const handleDelayChange = (e) => {
    const newDelay = parseFloat(e.target.value);
    if (!isNaN(newDelay) && newDelay >= 0.01) {
      setDelay(newDelay);
      delayEffect.disconnect(); // disconnect the old effect
      const newDelayEffect = new Delay(newDelay).toDestination();
      setDelayEffect(newDelayEffect);
      synthRef.current.connect(newDelayEffect);
    }
  };

  const handleDistortionChangeStart = () => {
    // Trigger sound when the user starts changing the Distortion input
    if (synthRef.current) {
      synthRef.current.triggerAttack(synthRef.current?.get()?.frequency?.value);
    }
  };
  
  const handleDistortionChangeEnd = () => {
    // Stop the sound when the user stops changing the Distortion input
    if (synthRef.current) {
      synthRef.current.triggerRelease();
    }
  };

  const handleDistortionChange = (e) => {
    const newDistortion = parseFloat(e.target.value);
    if (!isNaN(newDistortion) && newDistortion >= 0.01) {
      setDistortion(newDistortion);
      distortionEffect.disconnect(); // disconnect the old effect
      const newDistortionEffect = new Distortion(newDistortion).toDestination();
      setDistortionEffect(newDistortionEffect);
      synthRef.current.connect(newDistortionEffect);
    }
  };

//   const handleReverbChange = (e) => {
//     const newReverb = parseFloat(e.target.value);
//     if (!isNaN(newReverb) && newReverb > 0.01) {
//         setReverb(newReverb);
      
//         // Disconnect existing reverb effect
//         const existingReverb = synthRef.current.effects && synthRef.current.effects.find(effect => effect instanceof Reverb);
//         if (existingReverb) {
//             existingReverb.disconnect();
//         }
      
//         // Explicitly set timeConstant (e.g., 0.5 seconds)
//         synthRef.current.connect(new Reverb(newReverb).toDestination());
//     }
// };
  
//   const handleDelayChange = (e) => {
//     const newDelay = parseFloat(e.target.value);
//     if (!isNaN(newDelay) && newDelay > 0.01) {
//       setDelay(newDelay);
      
//       // Disconnect existing reverb effect
//       const existingDelay = synthRef.current.effects && synthRef.current.effects.find(effect => effect instanceof Delay);
//       if (existingDelay) {
//         existingDelay.disconnect();
//       }
      
//       synthRef.current.connect(new Delay(newDelay).toDestination());
//     }
//   };
  
//   const handleDistortionChange = (e) => {
//     const newDistortion = parseFloat(e.target.value);
//     if (!isNaN(newDistortion) && newDistortion > 0.01) {
//       setDistortion(newDistortion);
      
//       // Disconnect existing reverb effect
//       const existingDistortion = synthRef.current.effects && synthRef.current.effects.find(effect => effect instanceof Distortion);
//       if (existingDistortion) {
//         existingDistortion.disconnect();
//       }
      
//       synthRef.current.connect(new Distortion(newDistortion).toDestination());
//     }
//   };
  

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
    synthRef.current.disconnect();
    synthRef.current.oscillator.type = newWaveform;
  };

  const handlePlaySound = (e) => {
    e.preventDefault();
    if (synthRef.current) {
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
        type="range"
        min="20"
        max="2000"
        step="1"
        value={pitch}
        onChange={handlePitchChange}
      />
      <label>Reverb:</label>
      <input
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={reverb}
          onMouseDown={handleReverbChangeStart}
          onMouseUp={handleReverbChangeEnd}
          onChange={handleReverbChange}
      />
      <label>Delay:</label>
      <input
        type="range"
        min="0.01"
        max="1"
        step="0.01"
        value={delay}
        onMouseDown={handleDelayChangeStart}
        onMouseUp={handleDelayChangeEnd}
        onChange={handleDelayChange}
      />
      <label>Distortion:</label>
      <input
        type="range"
        min="0.01"
        max="1"
        step="0.01"
        value={distortion}
        onMouseDown={handleDistortionChangeStart}
        onMouseUp={handleDistortionChangeEnd}
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
      <button onClick={handlePlaySound}>Play/Pause Sound</button>
      <PresetTable presets={presets} onPresetClick={handlePresetClick} />
      {/* <button onClick={() => loadPreset(selectedPreset)}>Load Preset</button> */}
    </div>
    
  );
};

export default Synthesizer;