import React, { useRef, useState, useContext, useEffect } from 'react';
import html2canvas from 'html2canvas';
import cardBG from "../../img/blank_bg.png";
import '../../styles/makeImage.css'
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";




const StatForm = () =>{
   const { store, actions } = useContext(Context);
  let {formInputSpell} = store;


  return(
  <div className='form'>

    <div className="input-group">
      <span className="input-group-text">Name</span>
      <input type="text" aria-label="classInput" class="form-control" onChange={(e)=>actions.setFormInputSpell(  {...formInputSpell, name:e.target.value})}/>
    </div>

    <div className="input-group">
      <span className="input-group-text">Classes</span>
      <input type="text" aria-label="classInput" class="form-control" onChange={(e)=>actions.setFormInputSpell(  {...formInputSpell, class:e.target.value})}/>
    </div>

    <div className="input-group">
      <span className="input-group-text">Casting time</span>
      <input type="text" aria-label="raceInput" className="form-control" onChange={(e)=>actions.setFormInputSpell(  {...formInputSpell, castingTime:e.target.value})}/>
    </div>

    <div className="input-group">
      <span className="input-group-text">Range</span>
      <input type="text" aria-label="raceInput" className="form-control" onChange={(e)=>actions.setFormInputSpell(  {...formInputSpell, range:e.target.value})}/>
    </div>

    <div className="input-group">
      <span className="input-group-text">Duration</span>
      <input type="text" aria-label="raceInput" className="form-control" onChange={(e)=>actions.setFormInputSpell(  {...formInputSpell, duration:e.target.value})}/>
    </div>

    <div className="form-check">
      <span className="form-check-text "><strong><u>Components required</u></strong></span>
      
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="flexCheckDefault" id="flexCheckDefault1" value="V "  onClick={ (e)=>actions.setFormInputSpell( {...formInputSpell, isVerbal: e.target.checked? e.target.value:""})}/>
        <label className="form-check-label" for="flexCheckDefault1">
            Verbal
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value="S " onClick={ (e)=>actions.setFormInputSpell( {...formInputSpell, isSomatic: e.target.checked? e.target.value:""})}/>
        <label className="form-check-label" for="flexRadioDefault2">
          Somatic 
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value="M" onClick={ (e)=>actions.setFormInputSpell( {...formInputSpell, isMaterial: e.target.checked? e.target.value:""})}/>
        <label className="form-check-label" for="flexRadioDefault2">
          Material 
        </label>
      </div>
    </div>

    <label for="bubbleRange" class="form-label">How many stat bubbles do you need? {store.bubbleRange}</label>
      <input type="range" class="form-range" min="0" max="8" id="bubbleRange" defaultValue={store.bubbleRange} onChange={(e)=>actions.setstatBubbleVis([e.target.value])}>
    </input>




    <div className= "input-group statToAdd d-flex">
      
        <div class="mb-3">
          <label for="itemNameInput" class="form-label"></label>
          <div class="btn-group" role="group" aria-label="Basic example" >
            <button type="button" class="btn btn-primary mx-1" onClick={()=>actions.setFormInputSpell(  {...formInputSpell, damage: formInputSpell.statToAdd})}>Damage</button>
            <button type="button" class="btn btn-primary mx-1" onClick={()=>actions.setFormInputSpell(  {...formInputSpell, spell: formInputSpell.statToAdd})}>Spell/Effect</button>
            <button type="button" class="btn btn-primary mx-1" onClick={()=>actions.setFormInputSpell(  {...formInputSpell, description: formInputSpell.statToAdd})}>Description</button>
          </div>
          <textarea  type="text" class="form-control" id="itemDescriptionInput" placeholder="Description" 
            onChange={(e)=>actions.setFormInputSpell({...formInputSpell, statToAdd: [e.target.value]})}>
          </textarea>
        </div>



    </div>
    <textarea  type="text" class="form-control" id="itemDescriptionInput" placeholder="Backstory" 
            onChange={(e)=>actions.setFormInputSpell({...formInputSpell, backstory: [e.target.value]})}>
    </textarea>


    <div className="input-group mb-3">
      <label className="input-group-text" for="inputGroupFile01">Upload</label>
      <input type="file" className="form-control" id="inputGroupFile01" onChange={(e)=>actions.setFormInputSpell({...formInputSpell, imageFile: [e.target.value]})}></input>/
    </div>

  </div>
  
)};


const ComponentToPrint = React.forwardRef((props, ref) => {
  const { store, actions } = useContext(Context);
  let {formInputSpell} = store;
  return(
	<div ref={ref} className='position-relative' style={{
        height: '700px',
        width: '500px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        clipPath: 'inset(0 0 0 0)'
      }}>
    <img className='cardFrameBackground'src={cardBG}></img>
    <img className='cardImage'  src={formInputSpell.imageFile}></img>
    <h2 id='cardTitle'>{ formInputSpell.name}</h2>
	  <div className='mainCardBody'>
    <div className='statContainer container'>
				<div className='row mb-3'>
					<div className='col leftStats d-flex justify-content-end'>	
						<h4  className='stat' id='stat1' style={{visibility:  store.statBubbleVis[0]}}></h4>
					</div>
					<div className='col-3 middleEmptyStats'></div>	
					<div className='col rightStats' >
						<h4  className='stat' id='stat2' style={{visibility:  store.statBubbleVis[1]}}></h4>
					</div>
				</div>
				<div className='row mb-3'>
					<div className='col leftStats d-flex justify-content-end'>	
						<h4  className='stat' id='stat3' style={{visibility:  store.statBubbleVis[2]}}></h4>
					</div>
					<div className='col-5 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4  className='stat' id='stat4'style={{visibility:  store.statBubbleVis[3]}}></h4>
					</div>
				</div>
				<div className='row mb-3'>
					<div className='col leftStats d-flex justify-content-end'>	
						<h4  className='stat' id='stat5' style={{visibility:  store.statBubbleVis[4]}}></h4>
					</div>
					<div className='col-5 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4  className='stat' id='stat6' style={{visibility:  store.statBubbleVis[5]}}></h4>
					</div>
				</div>
				<div className='row'>
					<div className='col leftStats d-flex justify-content-end'>	
						<h4  className='stat' id='stat7' style={{visibility:  store.statBubbleVis[6]}}></h4>
					</div>
					<div className='col-3 middleEmptyStats'></div>	
					<div className='col rightStats'>
						<h4  className='stat' id='stat8' style={{visibility:  store.statBubbleVis[7]}}></h4>
					</div>
				</div>
			</div>

			<div className='rightStatInfo'>
				<p id='className' className='titled'>{formInputSpell.class}</p>
				<p id='raceName' className='titled'>{formInputSpell.race}</p>
        <p id='alignmentName' className='titled'>{formInputSpell.castingTime}</p>
        <p id='alignmentName' className='titled'>{formInputSpell.range}</p>
        <p id='alignmentName' className='titled'>{formInputSpell.duration}</p>
        <p id='alignmentName' className='titled'>{formInputSpell.isVerbal}{formInputSpell.isSomatic}{formInputSpell.isMaterial}</p>


				<p className='text-decoration-underline titled'>Spells</p> 
        <p id='stat1' className='statDetails'>{formInputSpell.spell}</p>
        

				<p className='text-decoration-underline titled'>Damage</p>
				<p id='stat1' className='statDetails'>{formInputSpell.damage}</p>

				<p className='text-decoration-underline titled'>Description</p>
				<p id='stat1' className='statDetails'>{formInputSpell.description}</p>

			</div>
		</div>

    <div className='footer'>
      <div className='originStory'>
        <p className='titled text-center'>Backstory/Origin</p>
        <p className='statDetails text-center px-3'> {store.formInputSpell.backstory}</p>
          
      </div>

    


    </div>
  </div>
)});

export const SpellImageCreator = () => {
  const componentRef = useRef();
  const [imageUri, setImageUri] = useState("");
  const [fileName,setFileName]=useState('')
  const [tagList,setTagList]=useState(['Space Monkey','Cowboy Monkey','Zebronkey','Monkey Kong','Simian','Party Monkey'])
  const { store, actions } = useContext(Context);
  const [imageUrl, setImageUrl] = useState("");
  const rand=Math.floor(Math.random() * 1000)

  useEffect(()=>{
    if(imageUri != ""){
      console.log(imageUri)
      setImageUrl(actions.insertImage('fileName'+rand,imageUri,[tagList[rand%8]]));
    }
  },[imageUri])

  useEffect(()=>{
    if(imageUrl != ""){
      actions.saveAs(imageUri,'fileName'+rand);
    }
  },[imageUrl])

  return (
    <div> 
      <div className='d-flex mx-5 flex-row justify-content-center'>
        <div className='d-flex mx-5'>
            <div ref={componentRef}>
                <ComponentToPrint/>
            </div>
            <img src={imageUri} alt="" />
        </div>
        <div>
          <StatForm/>
        </div>
      </div>
      <div className='export d-flex justify-content-center my-3'>
      <button onClick={async ()=>{
          const element = componentRef.current;
          const uri=await actions.handleExportAsURI(element)
          console.log(uri)
          setImageUri(uri)}}>Export as URI</button>
        <button onClick={actions.getImageURLs}>Get all Cards</button>
      </div>
    </div>
  );
};