import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const ComponentToPrint = React.forwardRef((props, ref) => (
	<div ref={ref} className='position-relative' style={{
        height: '500px',
        width: '500px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
        clipPath: 'inset(0 0 0 0)'
      }}>
	  <img className='position-absolute' style={{zIndex:1,height:'100%',width:'500px'}} src='https://www.pbs.org/wnet/nature/files/2024/01/GoldenHeadedLionTamarin.jpg'></img>
	  <img className='position-absolute top-0 start-0 rounded-circle' style={{zIndex:2,height:'25%',width:'25%'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg'></img>
	  <img className="position-absolute top-0 end-0 rounded-circle" style={{zIndex:2,height:'25%',width:'25%'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg'></img>
	  <img className="position-absolute top-50 start-50 rounded-circle" style={{zIndex:2,height:'25%',width:'25%'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg'></img>
	  <img className="position-absolute bottom-50 end-50 rounded-circle" style={{zIndex:3,height:'25%',width:'25%'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg'></img>
	  <img className="position-absolute bottom-0 start-0 rounded-circle" style={{zIndex:4,height:'25%',width:'25%'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg'></img>
	  <img className="position-absolute bottom-0 end-0 rounded-circle" style={{zIndex:4,height:'25%',width:'25%'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg'></img>
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
      <div className='d-flex'>
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
  