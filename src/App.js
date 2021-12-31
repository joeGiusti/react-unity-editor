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
  const [objFile, setObjFile] = useState(null)  
  const [textureFile, setTextureFile] = useState(null)  

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

  // Put files into state (called from load asset window component)
  function saveObjFile(file){
    setObjFile(file)
  }
  function saveTextureFile(file){
    setTextureFile(file)
  }

  // Call a Unity function that adds an asset button with data
  function addAssetWithData() {
    
    //var name = document.getElementById("newAssetNameInput").value
    //name = name.split('.')[0]
    var name = objFile.name.split('.')[0]
    var localObjURL = URL.createObjectURL(objFile)
    var localTextureURL = URL.createObjectURL(textureFile)

    // Load the asset into the editor
    loadIntoWebGL(name, localObjURL, localTextureURL)
    //loadIntoWebGL(name, localObjURL, localTextureURL)

    // Save the asset to database
    SaveAssetToDatabase(name, objFile, textureFile)        
    
  }
  function loadIntoWebGL(name, localObjURL, localTextureURL){    
    // Call the unity function    
    unityContext.send("Assets", "LoadAsset", name+"@"+localObjURL+"@"+localTextureURL);   
  }
  // Loads an asset from the previously saved window
  function loadSavedAsset(name, objUrl, textureURL){
    
    // This work only if CORS is enabled with the storage location
    loadIntoWebGL(name, objUrl, textureURL)
    
    console.log("load saved asset "+name+" obj from: "+objUrl+" texture from: "+textureURL)          

  }

  // Firebase functions

  function deleteAllSavedAssets(){
    remove(dbRef(db, "objs"))
  }

  function SaveStringToDB(name, type, urlString){
    // This structure prevents duplicates and invalid urls on file overwrite
    setDatabaseValue(dbRef(db, "assets/"+name+"/"+type), urlString)   
  }
  
  // Puts the file in storage, then the name and download URL into a database
  function SaveAssetToDatabase(name, objFile, textureFile){
    
    // Place to store the file (saving under name prevents duplicates in the demo)
    var storageRefObj = ref(storage, "objFiles/"+name)
    var storageRefTexture = ref(storage, "textureFiles/"+name)
    
    // Upload obj then save the name and download url into the database
    uploadBytes(storageRefObj, objFile).then(uploadSnapshot => {
      
      // Show confirmation in console
      console.log("uploaded "+name+" to storage")      
      
      // This is where the file can now be accessed
      getDownloadURL(storageRefObj).then(downloadURL => {
        SaveStringToDB(name, "obj",downloadURL)
      })
    }) 
    
    // Upload texture then save the name and download url into the database
    uploadBytes(storageRefTexture, textureFile).then(uploadSnapshot => {
      
      // Show confirmation in console
      console.log("uploaded "+name+" to storage")      
      
      // This is where the file can now be accessed
      getDownloadURL(storageRefTexture).then(downloadURL => {
        SaveStringToDB(name, "texture", downloadURL)
      })
    }) 
  }

  var abc
  // Loads the saved assets from the database
  function loadSavedAssets(){
    // Load the asset data from the database
    onValue(dbRef(db, "assets"), snapshot=>{    
      // This must be declaired in the onValue call, otherwise it will save like state
      var newAssetArray = []      
      snapshot.forEach(asset => {                
        newAssetArray.push({name:asset.key, objUrl:asset.child("obj").val(), textureUrl:asset.child("texture").val()})                
        console.log("pushed "+asset.key+" obj from: "+asset.child("obj").val()+" texture from: "+asset.child("texture").val())
      });      
      setsavedAssets(newAssetArray)    
    })
  }
  
  // View functions
  function openLoadAssetWindow(){
    setloadingAsset(true)
    setviewingSaved(false)
  }
  function closeLoadAssetWindow(){
    setloadingAsset(false)
  }
  function openViewSavedWindow(){
    setviewingSaved(true)
    setloadingAsset(false)
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
            saveObjFileFunction= {saveObjFile}         
            saveTextureFunction= {saveTextureFile}         
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
