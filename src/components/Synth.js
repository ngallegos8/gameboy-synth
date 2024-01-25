// Synth.js
import React, { useState } from 'react';
import * as Tone from 'tone';

const Synth = () => {
  const [synthType, setSynthType] = useState('AMSynth');
  const [waveform, setWaveform] = useState('sine');
  const [pitchAmount, setPitchAmount] = useState(0);
  const [distortionAmount, setDistortionAmount] = useState(0);
  const [delayAmount, setDelayAmount] = useState(0);
  const [reverbAmount, setReverbAmount] = useState(0);

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
    // Implement logic to save preset to db.json or a database
    const preset = {
      synthType,
      waveform,
      pitchAmount,
      distortionAmount,
      delayAmount,
      reverbAmount,
    };
    // Save preset logic (e.g., using fetch to send data to a server)
    console.log('Preset saved:', preset);
  };

  const loadPreset = async () => {
    try {
      const response = await fetch('http://localhost:4000/presets'); // Update the path accordingly
      const data = await response.json();

      // Assuming 'presets' is an array in your db.json
      if (data.presets && data.presets.length > 0) {
        const loadedPreset = data.presets[0]; // You can choose a specific preset or implement logic to select one
        setSynthType(loadedPreset.synthType);
        setWaveform(loadedPreset.waveform);
        setPitchAmount(loadedPreset.pitchAmount);
        setDistortionAmount(loadedPreset.distortionAmount);
        setDelayAmount(loadedPreset.delayAmount);
        setReverbAmount(loadedPreset.reverbAmount);
      } else {
        console.error('No presets found in db.json');
      }
    } catch (error) {
      console.error('Error loading preset:', error);
    }
  };

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
        <button onClick={handlePlayNote}>Play Note</button>
        <button onClick={savePreset}>Save Preset</button>
        <button onClick={loadPreset}>Load Preset</button>
      </div>
      
    </div>
  );
};

export default Synth;
