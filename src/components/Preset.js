import React from "react";

function PresetCard({ preset, onPresetClick, removePreset }) {


  function handleDelete() {
    fetch(`http://localhost:4000/presets/${preset.id}`, {
      method: "DELETE"
    })
    removePreset(preset.id)
  }

  return (
    
    <tr key={preset.id} onClick={() => onPresetClick(preset)}>
        <td>
            {preset.id}
        </td>
        <td>
            {preset.type}
        </td>
        <td>
            {preset.name}
        </td>
        <button onClick={handleDelete}>DEL</button>
    </tr>
  );
}

export default PresetCard;