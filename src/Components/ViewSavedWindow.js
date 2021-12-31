import React from 'react'
import ObjAssetTile from './ObjAssetTile'


function ViewSavedWindow(props) {
    var i = 0;
    return (
        <div className='viewSavedWindow'>    
            <div className='closeButton' onClick={props.closeFunction}>x</div>
            <div className='menuTitleDiv'>
                Click to load an asset            
            </div>
            <div id="abc" className='savedAssetTiles'  >
                {           
                    props.savedAssets != null &&                                                  
                    props.savedAssets.map(asset=>(                            
                        <ObjAssetTile key={"savedAsset"+i++} onClick={()=>props.loadSavedAssetFunction(asset.name, asset.objUrl, asset.textureUrl)} name={asset.name}></ObjAssetTile>
                    ))
                }
            </div>
        </div>
    )
}
ViewSavedWindow.defaultProps = {
    savedAssets:[{name:"name", url:"url one"}, {name:"name two", url:"url two"}],
}
export default ViewSavedWindow
