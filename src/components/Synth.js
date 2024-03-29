import React, { useState, useEffect } from 'react'
// import { Donut } from 'react-dial-knob'

import Search from "./Search";
import PresetList from "./PresetList";

let audioCtx

function Synth() {
    const [presets, setPresets] = useState([])
    const [search, setSearch] = useState("")

    const [gain, setGain] = useState(.3)


    useEffect(() => {
        fetch("http://localhost:3000/presets")
          .then(response => response.json())
          .then(setPresets)
      }, [])
  
      const displayedPresets = presets.filter((presets) => presets.name.toLowerCase().includes(search.toLowerCase()))

    
    
     // Create web audio api context
     audioCtx = new AudioContext();

     // Create an Oscillator and a Gain node
     const oscillator = new OscillatorNode(audioCtx, {
       type: "square",
       frequency: 300, // Value in Herz
     });
     
     const gainNode = audioCtx.createGain()

     // Connect both nodes to the speakers 

     oscillator.connect(gainNode);
     gainNode.connect(audioCtx.destination);

     // Now that everything is connected, starts the sound
     oscillator.start(0);

     // Report the state of the audio context to the
     // console, when it changes

     audioCtx.onstatechange = function () {
       console.log(audioCtx.state);
     };



  return (
    <div className="synth-body">
        <div>
            <Search search={search} setSearch={setSearch}/>
            <PresetList presets={displayedPresets} />
        </div>
        <section class="master-controls">
            <input type="range" id="gain" class="control-gain" min="0" max="2" step="0.01" value={gain} list="gain-vals" data-action="gain" onChange={(e) => setGain(e.target.value)} />
            <datalist id="gain-vals">
                <option value="0" label="min" />
                <option value="2" label="max" />
            </datalist>
            <label for="gain">Gain</label>
        </section>

        
      



    </div>
  );
}

export default Synth;