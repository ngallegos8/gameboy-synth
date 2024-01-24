import React from "react";
import PresetCard from "./PresetCard.js";

function PresetList({ presets }) { 
  // console.log(presets)

  const presetList = presets.map(preset => {
    return <PresetCard key={preset.id} preset={preset} />  
  })

  return (
    <table>
            <tbody>
                <tr>
                    <th className="row-name">
                        #
                    </th>
                    <th>
                        Type
                    </th>
                    <th>
                        Preset
                    </th>
                </tr>
                {presetList}
            </tbody>
        
        </table>
  )
}

export default PresetList;
