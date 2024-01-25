import React from 'react';

const PresetTable = ({ presets, onPresetClick }) => {
    // console.log(presets)

  return (
    <div>
      <h2>Preset List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Name</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {presets.map((preset) => (
            <tr key={preset.name} onClick={() => onPresetClick(preset.name)}>
              <td>{preset.id}</td>
              <td>{preset.type}</td>
              <td>{preset.name}</td>
              {/* Add more cells as needed */}
              <td>
                <button onClick={() => onPresetClick(preset.name)}>Load</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PresetTable;