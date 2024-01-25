// Synth.js
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import PresetTable from './PresetTable';

const Synth = () => {
  const [synthType, setSynthType] = useState('AMSynth');
  const [waveform, setWaveform] = useState('sine');
  const [pitchAmount, setPitchAmount] = useState(0);
  const [distortionAmount, setDistortionAmount] = useState(0);
  const [delayAmount, setDelayAmount] = useState(0);
  const [reverbAmount, setReverbAmount] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [presets, setPresets] = useState([]);
  const [showPresets, setShowPresets] = useState(false);

  const togglePresets = () => {
    setShowPresets(!showPresets)
  }

  const synth = new Tone[synthType]().toDestination();

  const pitchEffect = new Tone.PitchShift(pitchAmount).toDestination();
  const distortionEffect = new Tone.Distortion(distortionAmount).toDestination();
  const delayEffect = new Tone.FeedbackDelay(delayAmount).toDestination();
  const reverbEffect = new Tone.Reverb(reverbAmount > 0 ? reverbAmount : 0.01).toDestination();

  synth.chain(pitchEffect, distortionEffect, delayEffect, reverbEffect);



  const handlePlayNote = () => {
    // Play a note with the selected parameters
    synth.triggerAttackRelease('C4', '4n');
  };

  const savePreset = () => {
    const preset = {
      id: presets.length + 1,
      name,
      type,
      synthType,
      waveform,
      pitchAmount,
      distortionAmount,
      delayAmount,
      reverbAmount,
    };

    fetch('http://localhost:4000/presets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preset),
    })
      .then((response) => response.json())
      .then((newPreset) => {
        console.log('Preset saved:', newPreset);
        // Optionally update the local state with the new preset
        setPresets((prevPresets) => [...prevPresets, newPreset]);
      })
      .catch((error) => console.error('Error saving preset:', error));
  };

  function removePreset(id) {
    const newPresets = presets.filter((preset) => preset.id !== id)
    setPresets(newPresets)
  }

  const seePresets = () => {
    fetch('http://localhost:4000/presets')
      .then((response) => response.json())
      .then(setPresets)
      .catch((error) => console.error('Error fetching presets:', error));
  };
  console.log(presets)

  // Fetch presets when the component mounts
  useEffect(() => {
    seePresets();
  }, []); // Empty dependency array means this effect runs once when the component mounts




  return (
    <div>
      <div>
        <label>Synth Type:</label>
        <select value={synthType} onChange={(e) => setSynthType(e.target.value)}>
          <option value="AMSynth">AMSynth</option>
          <option value="FMSynth">FMSynth</option>
          <option value="MonoSynth">MonoSynth</option>
        </select>
      </div>
      <div>
        <label>Waveform:</label>
        <select value={waveform} onChange={(e) => setWaveform(e.target.value)}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>
      <div>
        <label>Pitch Amount:</label>
        <input type="range" min="-12" max="12" value={pitchAmount} onChange={(e) => setPitchAmount(Number(e.target.value))} />
      </div>
      <div>
        <label>Distortion Amount:</label>
        <input type="range" min="0.01" max="1" step="0.01" value={distortionAmount} onChange={(e) => setDistortionAmount(Number(e.target.value))} />
      </div>
      <div>
        <label>Delay Amount:</label>
        <input type="range" min="0.01" max="1" step="0.01" value={delayAmount} onChange={(e) => setDelayAmount(Number(e.target.value))} />
      </div>
      <div>
        <label>Reverb Amount:</label>
        <input type="range" min="0.01" max="1" step="0.01" value={reverbAmount} onChange={(e) => setReverbAmount(Number(e.target.value))} />
      </div>
      <div>
        <label>Preset Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Preset Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <div>
        <button onClick={handlePlayNote}>Play Note</button>
        <button onClick={savePreset}>Save Preset</button>
        <button onClick={togglePresets}>Presets</button>
  
        {showPresets && <PresetTable presets={presets} removePreset={removePreset}/>}
      </div>

    </div>
  );
};

export default Synth;
