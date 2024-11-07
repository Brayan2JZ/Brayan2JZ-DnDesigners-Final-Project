import React, { useRef, useState, useContext, useEffect } from 'react';
import html2canvas from 'html2canvas';
import cardBG from "../../img/blank_bg.png";
import '../../styles/makeImage.css'
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";




const StatForm = () =>{
   const { store, actions } = useContext(Context);
  let {formInput} = store;

const statAdd = () => {
  if(store.choice=="weapon" )
    { console.log("catr")}
    else if(store.choice=="spell")
      {actions.setFormInput({...formInput, spell: [...spell, store.statToAdd]})}
    else if(store.choice=="skill")  
      {actions.setFormInput({...formInput, skill: [...skill, store.statToAdd]})}
    else if(store.choice=="stat") 
      {actions.setFormInput({...formInput, stat: [...stat, store.statToAdd]})}
    else {}
  
}

  return(
  <div className='form'>

    <div className="input-group">
      <span className="input-group-text">Class</span>
      <input type="text" aria-label="classInput" className="form-control" onChange={(e)=>actions.setFormInput(  {...formInput, class:e.target.value})}/>
    </div>

    <div className="input-group">
      <span className="input-group-text">Race</span>
      <input type="text" aria-label="raceInput" className="form-control" onChange={(e)=>actions.setFormInput(  {...formInput, race:e.target.value})}/>
    </div>

    <div className="input-group mb-3">
      <label className="input-group-text" for="inputGroupSelect01">Alignment</label>
      <select className="form-select" id="inputGroupSelect01" onChange={(e)=>actions.setFormInput(  {...formInput, alignment: [e.target.value, formInput.alignment[1]]})}>
        <option value=" ">Pick Alignment</option>
        <option value="chaotic ">Chaotic</option>
        <option value="neutral ">Neutral</option>
        <option value="lawful ">Lawful</option>
      </select>

      <select className="form-select" id="inputGroupSelect01" onChange={(e)=>actions.setFormInput(  {...formInput, alignment: [formInput.alignment[0], e.target.value ]})}>
        <option value=" ">Pick Alignment</option>
        <option value="good">Good</option>
        <option value="neutral">Neutral</option>
        <option value="evil">Evil</option>
      </select>
    </div>

    <div className="input-group mb-3">
      <label className="input-group-text" for="inputGroupFile01">Upload</label>
      <input type="file" className="form-control" id="inputGroupFile01"/>
    </div>

    <div className= "input-group statToAdd d-flex">
      <div className="mb-3">
        <label className="input-group-text" for="inputGroupSelect01">Pick Category to Add</label>
            <select className="form-select" id="inputGroupSelect01" onChange={(e)=>actions.setFormInput(  {...formInput, choice: [e.target.value ]})}>
              <option value=" "></option>
              <option value="spell">Spell</option>
              <option value="skill">Skill</option>
              <option value="stat">Stat</option>
              <option value="weapon">Weapon</option>
          </select>
        <div className="mb-3">
          <label for="itemNameInput" className="form-label"></label>
          <input type="text" className="form-control" id="itemNameInput" placeholder="Item Name" 
            onChange={(e)=>actions.setFormInput({...formInput, statToAdd: [e.target.value, formInput.statToAdd[1], formInput.statToAdd[2]]})}></input>
          
          <input type="text" className="form-control" id="itemDamageInput" placeholder="Damage" 
            onChange={(e)=>actions.setFormInput({...formInput, statToAdd: [formInput.statToAdd[0], e.target.value, formInput.statToAdd[2]]})}></input>
          
          <textarea  type="text" className="form-control" id="itemDescriptionInput" placeholder="Description" 
            onChange={(e)=>actions.setFormInput({...formInput, statToAdd: [formInput.statToAdd[0], formInput.statToAdd[1], e.target.value]})}></textarea>
          
          <button type="submit" className="btn btn-primary mb-3" onClick={statAdd()}>Add Stat</button>

        </div>
    </div>
  </div>
  </div>
)};


const ComponentToPrint = React.forwardRef((props, ref) => {
  const { store, actions } = useContext(Context);
  return(
	<div ref={ref} className='position-relative' style={{
        height: '500px',
        width: '354.5px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        clipPath: 'inset(0 0 0 0)'
      }}>
    <img className='cardFrameBackground'src={cardBG}></img>
    <img className='cardImage'  src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg'></img>
    <h2 id='cardTitle'> Monkey</h2>
	  <div className='mainBody'>
			<div className='statContainer container'>
				<div className='row mb-3'>
					<div className='col leftStats'>	
						<h4 id='stat1' >10</h4>
					</div>
					<div className='col-3 middleEmptyStats'></div>	
					<div className='col rightStats' >
						<h4 id='stat2'>10</h4>
					</div>
				</div>
				<div className='row mb-3'>
					<div className='col leftStats'>	
						<h4 id='stat3' >10</h4>
					</div>
					<div className='col-5 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4 id='stat4'>10</h4>
					</div>
				</div>
				<div className='row mb-3'>
					<div className='col leftStats'>	
						<h4 id='stat5' >10</h4>
					</div>
					<div className='col-5 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4 id='stat6'>10</h4>
					</div>
				</div>
				<div className='row'>
					<div className='col leftStats'>	
						<h4 id='stat7' >10</h4>
					</div>
					<div className='col-3 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4 id='stat8'>10</h4>
					</div>
				</div>
			</div>	


			<div className='rightStatInfo'>
				<p id='className' className='titled'>{store.formInput.class}</p>
				<p id='raceName' className='titled'>{store.formInput.race}</p>
        <p id='alignmentName' className='titled'>{store.formInput.alignment}</p>
				

				<p className='text-decoration-underline titled'>Stats</p>
				
        {store.formInput.stat.map((aStat,index) =>
            <p id='stat1' className='statDetails'>{aStat[index]}</p>
        )}

				<p className='text-decoration-underline titled'>Spells</p>
				<p id='spell1' className='statDetails'>spell1</p>
				<p id='spell2' className='statDetails'>spell2</p>

				<p className='text-decoration-underline titled'>Skills</p>
				<p id='skill1' className='statDetails'>skill1</p>
				<p id='skill2' className='statDetails'>skill2</p>

			</div>
		</div>

    <div className='footer'>
      <div className='originStory'>
        <p className='titled text-center'>Backstory/Origin</p>
        <p className='statDetails text-center px-3'> {store.formInput.backstory}</p>
          
      </div>

      {/* <span>   ///for details page not card D:
        <div className='d-flex justify-content-between mx-3'>
          <i className="fas fa-times mx-1"></i>
          {<i class="fas fa-heart"></i> }
          <div>
            <i className="fas fa-bookmark mx-1"></i>
            <i className="fas fa-share mx-1"></i>
          </div> 
        </div>
      </span> */}


    </div>
  </div>
)});







export const MyComponent = () => {
  const componentRef = useRef();
  const [imageUri, setImageUri] = useState("");
  const [fileName,setFileName]=useState('')
  const [tagList,setTagList]=useState(['Space Monkey','Cowboy Monkey','Zebronkey','Monkey Kong','Simian','Party Monkey'])

  const saveAs = (uri) => {
    if(fileName!=''){
      const link = document.createElement('a');
      if (typeof link.download === 'string') {
          link.href = imageUri;
          link.download = fileName +'.jpeg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } else {
          window.open(uri);
      }
    }
    else{
      alert("Please enter a name for the card")
      return
    }
};

  const handleExportAsURI = async () => {
    try {
      const element = componentRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
          scale: window.devicePixelRatio || 1,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          useCORS: true,
          backgroundColor: 'transparent',
      });
      const uri = canvas.toDataURL("image/jpeg");
      console.log(canvas.width)
      console.log(canvas.height)
      console.log(uri);
      setImageUri(uri);
    } catch (error) {
      console.error("Error generating URI:", error);
    }
  };

  useEffect(()=>{
    if(imageUri != ""){
      insertImage();
    }
  },[imageUri])

  const insertImage=()=>{
    if(fileName==''){
      alert("Please enter a name for the card")
      return
    }
    fetch('https://laughing-space-winner-69vqxv9qrjj934rw-3001.app.github.dev/api/card',{
      method:'POST',
      body:JSON.stringify({
        'filename':fileName,
        'uri':imageUri,
        'tags':tagList
      }),
      headers: {'Content-Type':'application/json', 'Authorization':'Bearer '+ localStorage.getItem('token')}
    }).then((response)=>{
      console.log(response)
      return response.json()
    }).then((jsonRes)=>{
      console.log(jsonRes)
      return
    })
  }

  const getImageURLs=()=>{
    fetch('https://laughing-space-winner-69vqxv9qrjj934rw-3001.app.github.dev/api/cards',{
    method:'GET',
    headers: {'Content-Type':'application/json', 'Authorization':'Bearer '+ localStorage.getItem('token')}
    }).then((response)=>{
    console.log(response)
    return response.json()
    }).then((jsonRes)=>{
    console.log(jsonRes)
    })
  }

  return (
    <div> 
      <div className='d-flex mx-5'>
        <div className='d-flex mx-5'>
            <div ref={componentRef}>
                <ComponentToPrint/>
            </div>
            <img src={imageUri} alt="Generated Image" />
        </div>
        <div>
          <StatForm/>
        </div>
      </div>
      <label>filename</label>
      <input value={fileName} onChange={(e)=>{setFileName(e.target.value)}}></input>
      <button onClick={handleExportAsURI}>Export as URI</button>
      <button onClick={()=>{saveAs(imageUri)}}>Save to device</button>
      <button onClick={getImageURLs}>Get all Cards</button>
    </div>
  );
};
  