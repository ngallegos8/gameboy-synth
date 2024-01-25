import React from "react";

function PresetCard({ preset, onPresetClick }) {


  return (
    <tr>
        <td className="row-name" onClick={() => onPresetClick(preset.name)}>
            <span>{preset.id}</span>
        </td>
        <td>
            <span>{preset.type}</span>
        </td>
        <td>
            <span>{preset.name}</span>
        </td>
    </tr>
  );
}

export default PresetCard;