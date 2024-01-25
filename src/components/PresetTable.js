import React, {useState} from 'react';
import Search from "./Search"

const PresetTable = ({ presets }) => {
    // console.log(presets)

    const [search, setSearch] = useState("")

    const filteredPresets = presets.filter((preset) => {
      return (
        preset.id.toString().includes(search.toLowerCase()) ||
        preset.name.toLowerCase().includes(search.toLowerCase()) ||
        preset.type.toLowerCase().includes(search.toLowerCase()) ||
        preset.synthType.toLowerCase().includes(search.toLowerCase()) ||
        preset.waveform.toLowerCase().includes(search.toLowerCase())
      )
    })

    

  return (
    <div>
      <h2>Preset List</h2>
      <Search search={search} setSearch={setSearch}/>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredPresets.map((preset) => (
            <tr key={preset.name}>
              <td>{preset.id}</td>
              <td>{preset.type}</td>
              <td>{preset.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PresetTable;