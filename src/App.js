import logo from './logo.svg';
import './App.css';
import Unity, { UnityContext } from 'react-unity-webgl';
import SidePanel from './Components/SidePanel';
import LoadAssetWindow from './Components/LoadAssetWindow';
import { useState } from 'react';


const unityContext = new UnityContext({
  loaderUrl: "Build/web-editor-build.loader.js",
  dataUrl: "Build/web-editor-build.data",
  frameworkUrl: "Build/web-editor-build.framework.js",
  codeUrl: "Build/web-editor-build.wasm",
});
function App() {
  
  const [loadingAsset, setloadingAsset] = useState(false)
  
  function addAsset() {
    unityContext.send("Assets", "AddAsset");    
  }
  function addAssetWithName() {
    console.log(document.getElementById("newAssetNameInput").value)
    unityContext.send("Assets", "AddAssetWithName", document.getElementById("newAssetNameInput").value);        
  }
  function fileChosen(){
    console.log("file was chosen")
  }
  function imageLoaded(event){
    console.log("image added")        
    var file = event.target.files[0]
    console.log(file.name)
}
  function openLoadAssetWindow(){
    setloadingAsset(true)
  }
  function closeLoadAssetWindow(){
    setloadingAsset(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{height:"80px"}}/>            
        <Unity unityContext={unityContext} className='unityWindow'></Unity>
        <div className='infoDiv'>See left pannel for controls and dynamic asset loader</div>
        <SidePanel>
          <div>
            Editor controls:
            <div className='panelText'>
              <br/>
              Pan: 
              <br/>left mouse
              <br/><br/>
              Zoom: 
              <br/>
              scroll wheel
              <br/><br/>
              Rotate: 
              <br/>right mouse              
              <br/><br/>
              Focus Rotate: 
              <br/>Shift + left mouse              
              <br/>
            </div>              
              <br/>
              Hotkeys:

            <div className='panelText'>
              <br/>
              Move Object: w
              <br/><br/>
              Rotate Object: e
              <br/><br/>
              Duplicate: Shift + d
              <br/><br/>
              Delete: delete
            </div>
          </div>
          <button className='sideButton' onClick={openLoadAssetWindow}>Load Asset</button>          
          <div>

          </div>
        </SidePanel>
        {loadingAsset && 
          <LoadAssetWindow 
            closeWindow={closeLoadAssetWindow}  
            newAssetFunction1={addAsset} 
            newAssetFunction={addAssetWithName}            
          >
          </LoadAssetWindow>}
      </header>
    </div>
  );
}

export default App;
