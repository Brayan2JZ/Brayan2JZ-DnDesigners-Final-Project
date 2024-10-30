import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import "../../styles/home.css";
import cardBG from "../../img/blank_bg.png";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref} className='position-relative mx-5' style={{height:'500px',width:'354.5px'}}>
	<img className='cardFrameBackground' src={cardBG}></img>
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

    const handleExportAsURI = async () => {
        try {
            const element = componentRef.current;
            console.log("Export function called, element:", element);

            if (!element) {
                console.error("No element found for exporting.");
                return;
            }

            const canvas = await html2canvas(element, {
                scrollY: -window.scrollY,
                useCORS: true,
            });

            console.log("Canvas object:", canvas);
            const uri = canvas.toDataURL("image/png", 1.0);
            console.log("URI generated:", uri);
            return uri;

        } catch (error) {
            console.error("Error generating URI:", error);
        }
    };

    return (
        <div>
            <div className='position-relative d-flex' ref={componentRef}>
                <ComponentToPrint/>
            </div>
            <button onClick={handleExportAsURI}>Export as URI</button>
        </div>
    );
};