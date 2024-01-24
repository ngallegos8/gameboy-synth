import React from "react";

function PresetCard({ preset }) {


  return (
    <li className="card">
      <h4>{preset.id}</h4>
      <h4>{preset.name}</h4>
      <h4>{preset.type}</h4>
    </li>
  );
}

export default PresetCard;