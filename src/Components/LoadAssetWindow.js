import React from 'react'

function LoadAssetWindow(props) {
    function fileSelected(event){
        
        // Get the file
        var file = event.target.files[0]

        // Save the file into app state
        props.saveFileFunction(file);
        
        // Set the name input from the file name
        document.getElementById("newAssetNameInput").value = file.name
    }
    return (
        <div className='loadAssetWindow'>
            <button className='closeButton' onClick={props.closeWindow}>x</button>
            <span className='menuTitle'>Load asset menu</span> 
            <br></br>
            <div className='buttonHolder'>
                <div className='buttonLabel'>
                    1: Load
                </div>
                <div className='buttonLabel'>
                    2: Verify
                </div>
                <div className='buttonLabel'>
                    3: Import
                </div>
            </div>
            <div className='buttonHolder'>
                <div>                    
                    <input type="file" id='objInput' style={{display:"none"}} onChange={fileSelected}></input>
                    <label htmlFor="objInput" className='button'>Load OBJ</label>
                    <input className='input' id='newAssetNameInput' autoComplete="off"></input>                    
                    <button className='button' onClick={props.newAssetFunction}>Import</button>                    
                </div>
            </div>
            
        </div>
    )
}

export default LoadAssetWindow
