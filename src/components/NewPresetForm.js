import React, {useState } from 'react'

    function NewPresetForm( { onNewPresetFormSubmit }) {
        const [name, setName] = useState("")
        const [type, setType] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        const newPreset = {
            name: name,
            type: type
        }
        fetch('http://localhost:4000/presets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPreset)
        })
        .then(response => response.json())
        .then(onNewPresetFormSubmit)
            setName("")
            setType("")
    }
    
      return (
        <div className="new-preset-form" onSubmit={handleSubmit}>
          <h2>New Plant</h2>
          <form>
            <input type="text" name="name" placeholder="Preset name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" name="type" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)}/>
            <button type="submit">Add Preset</button>
          </form>
        </div>
      );
}


export default NewPresetForm