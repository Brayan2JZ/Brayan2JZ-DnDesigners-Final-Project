import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import cardBG from "../../img/blank_bg.png";
import '../../styles/home.css'


const ComponentToPrint = React.forwardRef((props, ref) => (
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


			<div className='rightStatInfo bg-primary'>
				<p id='className'>Class</p>
				<p id='alignmentName'>Alignment</p>
				<p id='raceName'>Race</p>

				<p className='text-decoration-underline'>Stats</p>
				<p id='stat1'>stat1</p>
				<p id='stat2'>stat2</p>

				<p className='text-decoration-underline'>Spells</p>
				<p id='spell1'>spell1</p>
				<p id='spell2'>spell2</p>

				<p className='text-decoration-underline'>Skills</p>
				<p id='skill1'>skill1</p>
				<p id='skill2'>skill2</p>

			</div>
		</div>
  </div>
));

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
      console.log(uri)
      setImageUri(uri);
    } catch (error) {
      console.error("Error generating URI:", error);
    }
  };
  const insertImage=()=>{
    fetch('https://laughing-space-winner-69vqxv9qrjj934rw-3001.app.github.dev/addCard',{
      method:'POST',
      body:{
        'filename':'Monkeyz',
        'uri':imageUri
      },
      headers:''
    })
  }
  return (
    <div>
      <div className='d-flex mx-5'>
          <div ref={componentRef}>
              <ComponentToPrint/>
          </div>
          <img src={imageUri} alt="Generated Image" />
      </div>
      <button onClick={handleExportAsURI}>Export as URI</button>
      <button onClick={()=>{saveAs(imageUri,"test")}}>Save to device</button>
    </div>
  );
};
  