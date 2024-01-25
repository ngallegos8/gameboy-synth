import React from "react";

function PresetCard({ preset, removePreset }) {


  function handleDelete() {
    fetch(`http://localhost:4000/presets/${preset.id}`, {
      method: "DELETE"
    })
    removePreset(preset.id)
  }

  return (
    
    <tr>
        <td className="row-name" key={preset.id}>
            <span>{preset.id}</span>
        </td>
        <td>
            <span>{preset.type}</span>
        </td>
        <td>
            <span>{preset.name}</span>
        </td>
        <button onClick={handleDelete}>🗑️</button>
    </tr>
  );
}

export default PresetCard;