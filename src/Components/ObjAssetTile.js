import React from 'react'
import objIcon from './objImage.png'

function ObjAssetTile(props) {
    return (
        <div className='objAssetTile' onClick={props.onClick}>
            <img src={objIcon}></img>
            <div style={{fontSize: props.name.length > 10 ? "12px" : "16px"}}>{props.name}</div>            
        </div>
    )
}

export default ObjAssetTile 
