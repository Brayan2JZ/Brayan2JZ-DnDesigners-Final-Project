import React, { useRef, useState, useContext, useEffect } from 'react';
import html2canvas from 'html2canvas';
import cardBG from "../../img/blank_bg.png";
import '../../styles/makeImage.css'
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";




const StatForm = () =>{
   const { store, actions } = useContext(Context);
  let {formInputItem} = store;


  return(
  <div className='form'>
    <div className="input-group">
      <span className="input-group-text">Name</span>
      <input type="text" aria-label="nameInput" class="form-control" onChange={(e)=>actions.setFormInputItem(  {...formInputItem, name:e.target.value})}/>
    </div>

    <div className="input-group">
      <span className="input-group-text">Number of uses</span>
      <input type="text" aria-label="usesInput" class="form-control" onChange={(e)=>actions.setFormInputItem(  {...formInputItem, uses:e.target.value})}/>
    </div>

    <div className="input-group">
      <span className="input-group-text">AC</span>
      <input type="text" aria-label="acInput" className="form-control" onChange={(e)=>actions.setFormInputItem(  {...formInputItem, ac:e.target.value})}/>
    </div>

    <div className="input-group">
      <span className="input-group-text">Does Item Require Attunement?</span>
      <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" value="true" onChange={(e)=>actions.setFormInputItem(  {...formInputItem, attune:e.target.value})}/>
    </div>

    </div>

    <div className="input-group mb-3">
      <label className="input-group-text" for="inputGroupSelect01">Alignment</label>
      <select className="form-select" id="inputGroupSelect01" onChange={(e)=>actions.setFormInputItem(  {...formInputItem, alignment: [e.target.value, formInputItem.alignment[1]]})}>
        <option value=" ">Pick Alignment</option>
        <option value="chaotic ">Chaotic</option>
        <option value="neutral ">Neutral</option>
        <option value="lawful ">Lawful</option>
      </select>

      <select className="form-select" id="inputGroupSelect01" onChange={(e)=>actions.setFormInputItem(  {...formInputItem, alignment: [formInputItem.alignment[0], e.target.value ]})}>
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
      
        <div class="mb-3">
          <label for="itemNameInput" class="form-label"></label>
          <div class="btn-group" role="group" aria-label="Basic example" >
            <button type="button" class="btn btn-primary mx-1" onClick={()=>actions.setFormInputItem(  {...formInputItem, rarity: formInputItem.statToAdd})}>Damage</button>
            <button type="button" class="btn btn-primary mx-1" onClick={()=>actions.setFormInputItem(  {...formInputItem, atribute1: formInputItem.statToAdd})}>Atribute 1</button>
            <button type="button" class="btn btn-primary mx-1" onClick={()=>actions.setFormInputItem(  {...formInputItem, atribute2: formInputItem.statToAdd})}>Atribute 2</button>
            <button type="button" class="btn btn-primary mx-1" onClick={()=>actions.setFormInputItem(  {...formInputItem, atribute3: formInputItem.statToAdd})}>Atribute 3</button>
          </div>
          <textarea  type="text" class="form-control" id="itemDescriptionInput" placeholder="Description" 
            onChange={(e)=>actions.setFormInputItem({...formInputItem, statToAdd: [e.target.value]})}>
          </textarea>
        </div>



    </div>
    <textarea  type="text" class="form-control" id="itemDescriptionInput" placeholder="Backstory" 
            onChange={(e)=>actions.setFormInputItem({...formInputItem, backstory: [e.target.value]})}>
    </textarea>

  </div>
  
)};


const ComponentToPrint = React.forwardRef((props, ref) => {
  const { store, actions } = useContext(Context);
  let {formInputItem} = store;
  return(
	<div ref={ref} className='position-relative' style={{
        height: '500px',
        width: '354.5px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        clipPath: 'inset(0 0 0 0)'
      }}>
    <img className='cardFrameBackground'src={cardBG}></img>
    <img className='cardImage'  src='https://images.nightcafe.studio/jobs/ZgSQlVUA31qvUFwzRJYH/ZgSQlVUA31qvUFwzRJYH--1--2zzil.jpg?tr=w-1600,c-at_max'></img>
    <h2 id='cardTitle'>{ formInputItem.name}</h2>
	  <div className='mainBody'>
    <div className='statContainer container'>
				<div className='row mb-1 '>
					<div className='col leftStats d-flex justify-content-end'>	
						<h4 id='stat' ></h4>
					</div>
					<div className='col-3 middleEmptyStats'></div>	
					<div className='col rightStats' >
						<h4 id='stat'></h4>
					</div>
				</div>
				<div className='row mb-1'>
					<div className='col leftStats d-flex justify-content-end '>	
						<h4 id='stat' ></h4>
					</div>
					<div className='col-5 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4 id='stat'></h4>
					</div>
				</div>
				<div className='row mb-1'>
					<div className='col leftStats d-flex justify-content-end'>	
						<h4 id='stat' ></h4>
					</div>
					<div className='col-5 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4 id='stat'></h4>
					</div>
				</div>
				<div className='row'>
					<div className='col leftStats d-flex justify-content-end'>	
						<h4 id='stat' ></h4>
					</div>
					<div className='col-3 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4 id='stat'></h4>
					</div>
				</div>
			</div>	


			<div className='rightStatInfo'>
				<p  className='titled'>Uses: {formInputItem.uses}</p>
				<p  className='titled'>AC: {formInputItem.ac}</p>
        <p  className='titled'>Requires Attunement? {formInputItem.attune}</p>
				

				<p className='text-decoration-underline titled'>Atributes</p> 
        <p id='stat1' className='statDetails'>{formInputItem.atribute1}</p>
        <p id='stat1' className='statDetails'>{formInputItem.atribute2}</p>
        <p id='stat1' className='statDetails'>{formInputItem.atribute3}</p>
        

			</div>
		</div>

    <div className='footer'>
      <div className='originStory'>
        <p className='titled text-center'>Backstory/Origin</p>
        <p className='statDetails text-center px-3'> {store.formInputItem.backstory}</p>
          
      </div>

    


    </div>
  </div>
)});







export const MyComponent = () => {
  const componentRef = useRef();
  const [imageUri, setImageUri] = useState("");

  const saveAs = (uri, filename) => {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
        link.href = imageUri;
        link.download = filename+'.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
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
    fetch('https://laughing-space-winner-69vqxv9qrjj934rw-3001.app.github.dev/api/addcard',{
      method:'POST',
      body:JSON.stringify({
        'filename':'Monkeyz2',
        'uri':imageUri
      }),
      headers: {'Content-Type':'application/json', 'Authorization':'Bearer '+ localStorage.getItem('token')}
    }).then((response)=>{
      console.log(response)
      return response.json()
    }).then((jsonRes)=>{
      console.log(jsonRes)
      return jsonRes
    })
  }

  const getImageURLs=()=>{
    fetch('https://laughing-space-winner-69vqxv9qrjj934rw-3001.app.github.dev/api/getcards',{
      method:'GET',
      headers: {'Content-Type':'application/json', 'Authorization':'Bearer '+ localStorage.getItem('token')}
    }).then((response)=>{
      console.log(response)
      return response.json()
    }).then((jsonRes)=>{
      console.log(jsonRes)
      return jsonRes
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
      <button onClick={handleExportAsURI}>Export as URI</button>
      <button onClick={()=>{saveAs(imageUri,"test")}}>Save to device</button>
      <button onClick={getImageURLs}>Get all Cards</button>
    </div>
  );
};
  