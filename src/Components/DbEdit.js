import React from 'react'
import {useState, useEffect} from 'react'
import {onValue, set, ref} from 'firebase/database'
import DbObj from './DbObj'

function DbEdit(props) {       

    const [dbArray, setdbArray] = useState([]) 

    useEffect(() => {
        loadDb()
        return () => {
            
        }
    }, [])
    function loadDb(){
                
        // Get the assets from the db
        onValue(ref(props.db, "assets"), objSnap =>{

            // An array to hold the assets
            var assets = []

            // Put them in the array
            objSnap.forEach(obj =>{

                // Push each one onto the array
                assets.push({
                    name:obj.key,
                    objURL:obj.child("obj").val(),
                    textureURL:obj.child("texture").val()
                })

            })

            // Put the array in state
            setdbArray(assets)
        })
    }
    function deleteAsset(name){
        // Remove asset
        set(ref(props.db, "assets/"+name), null)
    }
    function modifyAsset(originalName, name, objURL, textureURL){                

        
        // Remove asset from db if the name is different
        //if(originalName !== name)
        set(ref(props.db, "assets/"+originalName), null)

        // Set asset values or add a new asset with the modified name and values
        set(ref(props.db, "assets/"+name), {obj:objURL, texture:textureURL})
    }
    var keyCount = 0;
    return (
        <div className='viewSavedWindow'>
            <button className='closeButton' onClick={props.closeFunction}>x</button>
            <div className='dbScroll'>
                {dbArray.map(asset=>(
                <DbObj 
                    key={"dbLine"+keyCount++}
                    name={asset.name} 
                    objURL={asset.objURL} 
                    textureURL={asset.textureURL}
                    deleteFunction={deleteAsset}
                    modifyFunction={modifyAsset}
                >
                </DbObj>))}
            </div>
        </div>
    )
}
export default DbEdit
