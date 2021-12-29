import logo from './logo.svg';
import './App.css';
import Unity, { UnityContext } from 'react-unity-webgl';
import SidePanel from './Components/SidePanel';
import LoadAssetWindow from './Components/LoadAssetWindow';
import { useState } from 'react';
import { useEffect } from 'react';
import ViewSavedWindow from './Components/ViewSavedWindow.js'
import {initializeApp} from 'firebase/app'
import {getDatabase, set as setDatabaseValue, ref as dbRef, push as dbPush, onValue, remove} from 'firebase/database'
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage'

// This is for the unity webGL loader
const unityContext = new UnityContext({
  loaderUrl: "Build/web-editor-build.loader.js",
  dataUrl: "Build/web-editor-build.data",
  frameworkUrl: "Build/web-editor-build.framework.js",
  codeUrl: "Build/web-editor-build.wasm",
});

function App() {
  
  useEffect(() => {
    loadSavedAssets()    
    return () => {
      
    }
  }, [])

  // File state
  const [file, setFile] = useState(null)  

  // Saved assets
  const [savedAssets, setsavedAssets] = useState(null)  

  // View state
  const [loadingAsset, setloadingAsset] = useState(false)
  const [viewingSaved, setviewingSaved] = useState(false)

  // Firebase init
  var app = initializeApp({
    apiKey: "AIzaSyAPUeHjqSPt66YUEFbO0Vn3AUV0iRBhk5I",
    authDomain: "web-editor-61030.firebaseapp.com",
    projectId: "web-editor-61030",
    storageBucket: "web-editor-61030.appspot.com",
    messagingSenderId: "254373549989",
    appId: "1:254373549989:web:e6c6ac401976d1c06d3a4c",
    measurementId: "G-TTGRHW7CGQ"
  })
  var db = getDatabase(app)
  var storage = getStorage(app)

  // Put a file into state (called from load asset window component)
  function saveFile(file){
    setFile(file)
  }

  // Call a Unity function that adds an asset button with data
  function addAssetWithData() {
    
    // Get the input values
    var name = document.getElementById("newAssetNameInput").value
    name = name.split('.')[0]
    var localURL = URL.createObjectURL(file) //     document.getElementById("newAssetNameInput").value
    
    // Call the unity function
    unityContext.send("Assets", "LoadAsset", name+"@"+localURL);        

    // Save the asset to database
    SaveAssetToDatabase(name, file)        

    // Show feedback "Asset " + name + "Imported"


  }
  // Loads an asset from the previously saved window
  function loadSavedAsset(name, url){
    
    console.log("load saved asset "+name)

    // Download file from url

    // Then get local url and call loadAssetWithData    
    
    // Display uer feedback message

  }

  // Firebase functions

  function deleteAllSavedAssets(){
    remove(dbRef(db, "objs"))
  }

  function SaveStringToDB(name, urlString){
    // This structure prevents duplicates and invalid urls on file overwrite
    setDatabaseValue(dbRef(db, "objs/"+name), urlString)   
  }
  
  // Puts the file in storage, then the name and download URL into a database
  function SaveAssetToDatabase(name, file){
    
    // Place to store the file (saving under name prevents duplicates in the demo)
    var storageRef = ref(storage, "objFiles/"+name)
    
    // Upload it then save the name and download url into the database
    uploadBytes(storageRef, file).then(uploadSnapshot => {
      
      // Show confirmation in console
      console.log("uploaded "+name+" to storage")      
      
      // This is where the file can now be accessed
      getDownloadURL(storageRef).then(downloadURL => {
        SaveStringToDB(name, downloadURL)
      })
    })    
  }

  // Loads the saved assets from the database
  function loadSavedAssets(){
    var assetArray = []
    onValue(dbRef(db, "objs"), snapshot=>{
      snapshot.forEach(obj => {
        assetArray.push({name:obj.key, url:obj.value})
      });
    })
    setsavedAssets(assetArray)
    //setsavedAssets([{name:"array name", url:"url one"}, {name:"array name two", url:"url two"}])
  }
  
  
  // View functions
  function openLoadAssetWindow(){
    setloadingAsset(true)
  }
  function closeLoadAssetWindow(){
    setloadingAsset(false)
  }
  function openViewSavedWindow(){
    setviewingSaved(true)
  }
  function closeViewSavedWindow(){
    setviewingSaved(false)
  }  

  // JSX
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
          <button className='sideButton' onClick={openViewSavedWindow} style={{marginTop:"30px"}}>View Saved</button>          
          <div>

          </div>
        </SidePanel>
        {loadingAsset && 
          <LoadAssetWindow 
            closeWindow={closeLoadAssetWindow}              
            newAssetFunction={addAssetWithData}   
            saveFileFunction= {saveFile}         
          >
          </LoadAssetWindow>}
        {viewingSaved && <ViewSavedWindow
          closeFunction = {closeViewSavedWindow}
          loadSavedAssetFunction = {loadSavedAsset}
          savedAssets = {savedAssets}
        ></ViewSavedWindow>}
      </header>
    </div>
  );
}

export default App;
