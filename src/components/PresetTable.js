import React, {useState} from 'react';
import Search from "./Search"
import Preset from "./Preset"

const PresetTable = ({ presets, removePreset }) => {
    // console.log(presets)

    const [search, setSearch] = useState("")


    const presetRow = presets.map((preset) => {
      return <Preset key={preset.id} preset={preset} removePreset={removePreset}/>
    })


    const filteredPresets = presets.filter((preset) => {
      return (
        preset.id.toString().includes(search.toLowerCase()) ||
        preset.name.toLowerCase().includes(search.toLowerCase()) ||
        preset.type.toLowerCase().includes(search.toLowerCase()) ||
        preset.synthType.toLowerCase().includes(search.toLowerCase()) ||
        preset.waveform.toLowerCase().includes(search.toLowerCase())
      )
    })

    

  

    // function SomeDeleteRowFunction(event) {
    //   var td = event.target.parentNode;
    //   var tr = td.parentNode; // the row to be removed
    //   tr.parentNode.removeChild(tr);
    // }



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