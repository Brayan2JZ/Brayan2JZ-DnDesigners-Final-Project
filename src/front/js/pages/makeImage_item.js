import React, { useRef, useState, useContext, useEffect } from 'react';
import html2canvas from 'html2canvas';
import cardBG from "../../img/blank_bg.png";
import cardFG from "../../img/ItemCard.png";
import '../../styles/makeImage.css'
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import UploadImage from "../component/avatarUpload";





const StatForm = () => {
  const { store, actions } = useContext(Context);
  let { formInputItem } = store;
  const [url, setURL] = useState("https://images.nightcafe.studio/jobs/ZgSQlVUA31qvUFwzRJYH/ZgSQlVUA31qvUFwzRJYH--1--2zzil.jpg?tr=w-1600,c-at_max");
  useEffect(() => actions.setCardImageFile(url), [url]);

  const attuneSwitch = (e) => {
    if (e == "true") {
      console.log(false);
      return false;
    } else return true;
  }

  return (
    <div className='form'>
      <div className="input-group">
        <span className="input-group-text formTitle">Name</span>
        <input type="text" aria-label="nameInput" class="form-control" onChange={(e) => actions.setFormInputItem({ ...formInputItem, name: e.target.value })} />
      </div>

      <div className="input-group">
        <span className="input-group-text formTitle">Number of uses</span>
        <input type="text" aria-label="usesInput" class="form-control" onChange={(e) => actions.setFormInputItem({ ...formInputItem, uses: "Uses: " + e.target.value })} />
      </div>

      <div className="input-group">
        <span className="input-group-text formTitle">AC</span>
        <input type="text" aria-label="acInput" className="form-control" onChange={(e) => actions.setFormInputItem({ ...formInputItem, ac: "AC: " + e.target.value })} />
      </div>

      <div className="form-check  text-light">
        <span className="form-check-text  formTitle"><strong><u>Does Item Require Attunement?</u></strong></span>

        <div className="form-check ">
          <input className="form-check-input formTitle" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="true" onClick={(e) => actions.setFormInputItem({ ...formInputItem, attune: "Needs Attunement" })} />
          <label className="form-check-label formTitle" for="flexRadioDefault1">
            Needs Attunement
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input formTitle" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="false" onClick={(e) => actions.setFormInputItem({ ...formInputItem, attune: "" })} />
          <label className="form-check-label formTitle" for="flexRadioDefault2">
            No Attunement
          </label>
        </div>
      </div>


      <select class="form-select formTitle" aria-label="Select Rarity of Item" onChange={(e) => actions.setFormInputItem({ ...formInputItem, rarity: e.target.value })}>
        <option value="" selected>Select Rarity of Item</option>
        <option value="Rarity: Common">Common</option>
        <option value="Rarity: Uncommon">Uncommon</option>
        <option value="Rarity: Rare">Rare</option>
        <option value="Rarity: Very Rare">Very Rare</option>
        <option value="Rarity: Legendary">Legendary</option>
      </select>

      <label for="bubbleRange" class="form-label formTitle text-light">How many stat bubbles do you need? {store.bubbleRange}</label>
      <input type="range" class="form-range  text-light" min="0" max="11" id="bubbleRange" defaultValue={store.bubbleRange} onChange={(e) => actions.setstatBubbleVis([e.target.value])}>
      </input>


      <div className="input-group statToAdd d-flex">

        <div class="mb-3">
          <label for="itemNameInput" class="form-label formTitle"></label>
          <div class="btn-group" role="group" aria-label="Basic example" >

            <button type="button" class="btn btn-primary mx-1 formTitle" onClick={() => actions.setFormInputItem({ ...formInputItem, damage: "Damage: " + formInputItem.statToAdd })}>Damage</button>
            <button type="button" class="btn btn-primary mx-1 formTitle" onClick={() => actions.setFormInputItem({ ...formInputItem, atribute1: formInputItem.statToAdd })}>Atribute 1</button>
            <button type="button" class="btn btn-primary mx-1 formTitle" onClick={() => actions.setFormInputItem({ ...formInputItem, atribute2: formInputItem.statToAdd })}>Atribute 2</button>
            <button type="button" class="btn btn-primary mx-1 formTitle" onClick={() => actions.setFormInputItem({ ...formInputItem, atribute3: formInputItem.statToAdd })}>Atribute 3</button>
          </div>
          <textarea type="text" class="form-control formTitle" id="itemDescriptionInput" placeholder="Description"
            onChange={(e) => actions.setFormInputItem({ ...formInputItem, statToAdd: [e.target.value] })}>
          </textarea>
        </div>



      </div>
      <textarea type="text" class="form-control formTitle" id="itemDescriptionInput" placeholder="Backstory"
        onChange={(e) => actions.setFormInputItem({ ...formInputItem, backstory: [e.target.value] })}>
      </textarea>


      <div className="input-group mb-3 formTitle">
        <UploadImage setURL={setURL} />
      </div>


    </div>





  )
};


const ComponentToPrint = React.forwardRef((props, ref) => {
  const { store, actions } = useContext(Context);
  let { formInputItem } = store;
  return (
    <div ref={ref} className='position-relative' style={{
      height: '700px',
      width: '500px',
      overflow: 'hidden',
      boxSizing: 'border-box',
      clipPath: 'inset(0 0 0 0)'
    }}>
      <img className='cardFrameBackground' src={cardBG}></img>
      <img className='cardImage' src={store.cardImageFile}></img>
      <img className='cardFrameForeground' src={cardFG}></img>

      <div className='mainCardBody'>
        <div className='statContainer container bubblesContainer cardText'>
          <div className='row bubblesRow mb-3 gx-0'>
            <div className='col align-self-end'>
              <h4 className='stat' id='stat1' style={{ visibility: store.statBubbleVis[0] }}></h4>
            </div>

            <div className='col align-self-start colBlend' >
              <h4 className='stat' id='stat2' style={{ visibility: store.statBubbleVis[1] }}></h4>
            </div>

            <div className='col align-self-end colBlend'>
              <h4 className='stat' id='stat3' style={{ visibility: store.statBubbleVis[2] }}></h4>
            </div>

            <div className='col align-self-start colBlend'>
              <h4 className='stat' id='stat4' style={{ visibility: store.statBubbleVis[3] }}></h4>
            </div>

            <div className='col align-self-end colBlend'>
              <h4 className='stat' id='stat5' style={{ visibility: store.statBubbleVis[4] }}></h4>
            </div>

            <div className='col align-self-start colBlend'>
              <h4 className='stat' id='stat6' style={{ visibility: store.statBubbleVis[5] }}></h4>
            </div>


          </div>
          <div className='row bubblesRow2 gx-0 mb-3'>
            <div className='col align-self-start'>
              <h4 className='stat' id='stat7' style={{ visibility: store.statBubbleVis[6] }}></h4>
            </div>

            <div className='col align-self-end colBlend'>
              <h4 className='stat' id='stat8' style={{ visibility: store.statBubbleVis[7] }}></h4>
            </div>

            <div className='col align-self-start colBlend'>
              <h4 className='stat' id='stat9' style={{ visibility: store.statBubbleVis[8] }}></h4>
            </div>

            <div className='col align-self-end colBlend'>
              <h4 className='stat' id='stat10' style={{ visibility: store.statBubbleVis[9] }}></h4>
            </div>

            <div className='col align-self-start colBlend'>
              <h4 className='stat' id='stat11' style={{ visibility: store.statBubbleVis[10] }}></h4>
            </div>


          </div>
        </div>


        <div className='rightStatInfo cardText'>
          <h2 id='cardTitle'>{formInputItem.name}</h2>
          <p className='titled cardText'> {formInputItem.uses}</p>
          <p className='titled cardText'>{formInputItem.ac}</p>
          <p className='titled cardText'> {formInputItem.attune}</p>
          <p className='titled cardText'> {formInputItem.rarity}</p>

          <p className='statDetails'>{formInputItem.damage}</p>

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
  )
});


export const ItemImageCreator = () => {
  const componentRef = useRef();
  const [imageUri, setImageUri] = useState("");
  const [fileName, setFileName] = useState('')
  const [tagList, setTagList] = useState([])
  const { store, actions } = useContext(Context);
  const [imageUrl, setImageUrl] = useState("");
  const rand = Math.floor(Math.random() * 1000)

  useEffect(() => {
    if (imageUri != "") {
      console.log(imageUri)
      setImageUrl(actions.insertImage('fileName' + rand, imageUri, [tagList[rand % 8]]));
    }
  }, [imageUri])

  useEffect(() => {
    if (imageUrl != "") {
      actions.saveAs(imageUri, 'fileName' + rand);
    }
  }, [imageUrl])

  return (
    <div>
      <div className='d-flex mx-5 flex-row justify-content-center'>
        <div className='d-flex mx-5'>
          <div ref={componentRef}>
            <ComponentToPrint />
          </div>
          {/* <img src={imageUri} alt="" /> */}
        </div>
        <div>
          <StatForm />
        </div>
      </div>
      <div className='export d-flex justify-content-center my-3'>
        <button onClick={async () => {
          const element = componentRef.current;
          const uri = await actions.handleExportAsURI(element)
          console.log(uri)
          setImageUri(uri)
        }}>Upload and Download</button>
      </div>
    </div>
  );
};
