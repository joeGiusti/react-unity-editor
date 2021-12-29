import React from 'react'
import ObjAssetTile from './ObjAssetTile'


function ViewSavedWindow(props) {
    var array = [{name:"name one", url:"url one"}, {name:"name two", url:"url two"}]
    var i = 0;
    return (
        <div className='viewSavedWindow'>    
            <div className='menuTitleDiv'>
                Click to load an asset            
            </div>
            <div className='savedAssetTiles'>
                <div className='closeButton' onClick={props.closeFunction}>x</div>
                {           
                    props.savedAssets != null &&                                                  
                    props.savedAssets.map(asset=>(                            
                        <ObjAssetTile onClick={()=>props.loadSavedAssetFunction(asset.name, asset.url)} name={asset.name}></ObjAssetTile>
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
