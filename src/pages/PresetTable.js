import React, {useState} from 'react';
import Search from "../components/Search"
import Preset from "../components/Preset"

const PresetTable = ({ presets, onPresetClick, removePreset }) => {
    console.log(presets)

    const [search, setSearch] = useState("")
    // console.log("searching..." + search)


    
    
    const filteredPresets = presets.filter((preset) => {
      return (
        preset.id.toString().includes(search.toLowerCase()) ||
        preset.name.toLowerCase().includes(search.toLowerCase()) ||
        preset.type.toLowerCase().includes(search.toLowerCase()) ||
        preset.synthType.toLowerCase().includes(search.toLowerCase()) ||
        preset.waveform.toLowerCase().includes(search.toLowerCase())
        )
      })

      const presetRow = filteredPresets.map((preset) => {
        return <Preset key={preset.id} preset={preset} onPresetClick={onPresetClick} removePreset={removePreset}/>
      })
      

    
  return (
    <div className="preset-list">
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
          {/* {filteredPresets.map((preset) => (
            <tr key={preset.id}>
              <td>{preset.id}</td>
              <td>{preset.type}</td>
              <td>{preset.name}</td>
              <td><input type="button" value="Delete Row" onClick={SomeDeleteRowFunction && handleDelete}/></td>
            </tr>
          ))} */}
          {presetRow}
        </tbody>
      </table>
    </div>
  );
};

export default PresetTable;