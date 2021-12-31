import React from 'react'

function LoadAssetWindow(props) {
    function objFileSelected(event){
        
        // Get the file
        var file = event.target.files[0]

        // Save the file into app state
        props.saveObjFileFunction(file);
        
        // User feedback
        document.getElementById("objFileName").innerHTML = file.name        
    }
    function textureFileSelected(event){
        
        // Get the file
        var file = event.target.files[0]
        
        // Save the file into app state
        props.saveTextureFunction(file)

        // User feedback
        document.getElementById("textureFileName").innerHTML = file.name
    }
    function importAsset(){
        if(props.newAssetFunction())        
            document.getElementById("importedNotification").innerHTML = "Complete"      
        else  
            document.getElementById("importedNotification").innerHTML = "Error"      
    }
    return (
        <div className='loadAssetWindow'>
            <button className='closeButton' onClick={props.closeWindow}>x</button>
            <span className='menuTitle'>Load asset menu</span> 
            <br></br>
            <div className='buttonHolder'>
                <div className='buttonLabel'>
                    1: OBJ
                </div>
                <div className='buttonLabel'>
                    2: Texture
                </div>
                <div className='buttonLabel'>
                    3: Import
                </div>
            </div>
            <div className='buttonHolder'>
                <div>                    
                    <input type="file" id='objInput' style={{display:"none"}} onChange={objFileSelected}></input>
                    <label htmlFor="objInput" className='button'>Load OBJ</label>
                                        
                    <input type="file" id='textureInput' style={{display:"none"}} onChange={textureFileSelected}></input>
                    <label htmlFor="textureInput" className='button'>Load Texture</label>
                    {/*<input className='input' id='newAssetNameInput' autoComplete="off"></input>                    */}
                    
                    <button className='button' onClick={importAsset}>Import</button>                    
                </div>
            </div>
            <div className='buttonHolder'>
                <div id='objFileName' className='fileNameLabel'>
                    
                </div>
                <div id='textureFileName' className='fileNameLabel'>
                    
                </div>
                <div id='importedNotification' className='fileNameLabel'>
                    
                </div>
            </div>
            
        </div>
    )
}

export default LoadAssetWindow
