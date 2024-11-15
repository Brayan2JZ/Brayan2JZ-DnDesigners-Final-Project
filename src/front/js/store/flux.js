const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			formInput: {name:"", class:"", race:"", alignment:['',''], spell:"", description:"", damage:"", backstory:"", statToAdd:"", imageFile:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg"},

			formInputItem: {name:"",uses:"", ac:"", attune:false, atribute1:"",atribute2:"",atribute3:"", rarity:"", description:[], damage:[],  backstory:"", statToAdd:"", imageFile:"https://images.nightcafe.studio/jobs/ZgSQlVUA31qvUFwzRJYH/ZgSQlVUA31qvUFwzRJYH--1--2zzil.jpg?tr=w-1600,c-at_max"},

			formInputSpell: {name:"",class:"", castingTime:"Instantaneous", range:"", duration:"", atribute1:"",atribute2:"",atribute3:"", rarity:"", description:[], damage:"",  backstory:"", statToAdd:"", isVerbal:"", isSomatic:"", isMaterial:"", imageFile:"https://i.pinimg.com/1200x/59/15/8b/59158b3d3e0dc0c98954f3da89e14469.jpg"},

			bubbleRange: 2, 
			statBubbleVis: ['visible', 'visible','hidden','hidden','hidden','hidden','hidden','hidden'],

		},
		actions: {

			setFormInput: (newObj) => {
				setStore({ formInput: newObj });
			},

			setFormInputItem: (newObj) => {
				setStore({ formInputItem: newObj });
			},

			setFormInputSpell: (newObj) => {
				setStore({ formInputSpell: newObj });
			},

			setstatBubbleVis: (ind) => {
				const store = getStore();
				setStore({ bubbleRange: parseInt(ind) });
				if(store.bubbleRange>=8){setStore({ statBubbleVis: ['visible', 'visible','visible','visible','visible','visible','visible','visible'] });
					}else if(store.bubbleRange>=7){setStore({ statBubbleVis: ['visible', 'visible','visible','visible','visible','visible','visible','hidden'] });
						}else if(store.bubbleRange>=6){setStore({ statBubbleVis: ['visible', 'visible','visible','visible','visible','visible','hidden','hidden'] });
							}else if(store.bubbleRange>=5){setStore({ statBubbleVis: ['visible', 'visible','visible','visible','visible','hidden','hidden','hidden'] });
								}else if(store.bubbleRange>=4){setStore({ statBubbleVis: ['visible', 'visible','visible','visible','hidden','hidden','hidden','hidden'] });
									}else if(store.bubbleRange>=3){setStore({ statBubbleVis: ['visible', 'visible','visible','hidden','hidden','hidden','hidden','hidden'] });
										}else if(store.bubbleRange>=2){setStore({ statBubbleVis: ['visible', 'visible','hidden','hidden','hidden','hidden','hidden','hidden'] });
											}else if(store.bubbleRange>=1){setStore({ statBubbleVis: ['visible', 'hidden','hidden','hidden','hidden','hidden','hidden','hidden'] });
												}else {setStore({ statBubbleVis: ['hidden', 'hidden','hidden','hidden','hidden','hidden','hidden','hidden'] });}
				},

			

			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}


		}
	};
};

export default getState;
