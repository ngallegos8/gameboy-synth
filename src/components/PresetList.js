import React from "react";
import PresetCard from "./PresetCard.js";

function PresetList({ presets }) { 
  // console.log(presets)

  const presetList = presets.map(preset => {
    return <PresetCard key={preset.id} preset={preset} />  
  })

  return (
    <ul className="cards">{presetList}</ul>
  )
}

export default PresetList;
