import React from 'react'

function DbObj(props) {
    function modifyAsset(){
        
        // Get the values
        var name = document.getElementById("nameField"+props.name).value
        var objURL = document.getElementById("objField"+props.name).value
        var textureURL = document.getElementById("textureField"+props.name).value
        
        console.log("attempting to set "+props.name+" to "+name+" with "+objURL+" and "+textureURL)

        // Call the function with the values
        props.modifyFunction(props.name, name, objURL, textureURL)
    }
    return (
        <div className='dbObj'>
            <div>
                <div>
                    <input id={"nameField"+props.name} defaultValue={props.name} style={{textAlign:"center"}}></input>                    
                </div>
                <div>
                <input id={"objField"+props.name} defaultValue={props.objURL}></input>
                </div>
                <div>
                <input id={"textureField"+props.name} defaultValue={props.textureURL}></input>                  
                </div>
                <div className='buttonHolder'>
                    <button className='smallButton' onClick={()=>props.deleteFunction(props.name)}>Delete</button>
                    <button className='smallButton' onClick={modifyAsset}>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default DbObj
