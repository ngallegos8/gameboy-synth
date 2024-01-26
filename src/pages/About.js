import React from 'react';

function About() {
  return (
    <div className="about">
      <h2>About</h2>
      <p>
        <span class="header">Idea:</span>
        <span class="description"> Synthesizer/Sampler that is able to create/load sounds and manupulate with effects to create "retro" 8-bit like sounds.<br></br>
              Created as a Single Page Application (SPA) using React</span>  
      </p>
      <p>
      <span class="header">Version 1.1</span><br></br>
      <span class="build">Created using React & Tone.js</span><br></br>
      <span class="description"><br></br>
        -Routes between Synth, About and Manual all work<br></br><br></br>
        -Effects are Pitch, Distortion, Delay & Reverb<br></br> <br></br>
        -The only working buttons are 'A', 'Preset' & 'Save Preset'<br></br> <br></br>
        -On clicking the 'preset' button, presets from "inside" the GameBoy are presented, and upon clicking anywhere on the row of the preset, <br></br> the synth will be re-presented and the selected presets parameters will be loaded into the synth<br></br><br></br>
        -GET, POST & DELETE requests are handled correctly and function with persistance to backend of 'db.json'<br></br><br></br>
        -Search function enables to search for any preset(id#, name, type, waveform, synthtype)<br></br>
      </span>
      </p>
      <p>
        <span class="header"> UPCOMING FEATURES (Working in Development)</span><br></br>
        <span class="description"><br></br>
        -Implement all button functionality for 'B' and the D-pad.
        -D-pad can be used (in addition to mouse) in place of click to navigate menus<br></br>
        -Menus for Select SynthType and/or Waveform, Modulation menu & Preset Menu<br></br>
        -Scroll effects with left/right, select effect with 'A', remove effect from chain with 'B' and apply wet/dry value with up/down<br></br>
        -Implement sucessful PATCH request to update a presets parameter values without the need to remove current and add a new preset.<br></br>
        -When adding a new preset it will be added to bottom of it's type and increment it's id# by type instead of adding to end of preset list<br></br>
        -CSS for About/Manual/Etc pages<br></br>
        -Allow user to choose their own effect chain rather than the current static chain<br></br>
        -Allow user to adjust parameters of each effect beyond wet/dry signal

        <br></br>
        -SAMPLER page that will have same functionality as Synth but from loading samples<br></br>
        -SAMPLER allows user to import their own custom samples to run through effect chain<br></br>



        </span>
      </p>
    </div>
  );
}

export default About; 