import React from 'react'

function LoadAssetWindow(props) {
    function fileSelected(event){
        console.log("image added")        
        var file = event.target.files[0]
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
                    2: Name
                </div>
                <div className='buttonLabel'>
                    3: Import
                </div>
            </div>
            <div className='buttonHolder'>
                <div>                    
                    <input type="file" id='objInput' style={{display:"none"}} onChange={fileSelected}></input>
                    <label htmlFor="objInput" className='button'>Load OBJ</label>
                    <input className='input' id='newAssetNameInput'></input>                    
                    <button className='button' onClick={props.newAssetFunction}>Import</button>                    
                </div>
            </div>
            
        </div>
    )
}

export default LoadAssetWindow
