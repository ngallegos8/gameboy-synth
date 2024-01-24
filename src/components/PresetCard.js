import React from "react";

function PresetCard({ preset }) {


  return (
    <tr>
        <td className="row-name" >
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