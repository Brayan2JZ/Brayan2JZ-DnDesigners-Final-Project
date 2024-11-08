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

			formInput: {name:"", class:"", race:"", alignment:['',''], spell:[], description:[], damage:[], backstory:"", statToAdd:""},

			formInputItem: {name:"",uses:"", ac:"", attune:false, atribute1:"",atribute2:"",atribute3:"", rarity:"", description:[], damage:[],  backstory:"", statToAdd:""},

			formInputSpell: {name:"",uses:"", ac:"", attune:false, atribute1:"",atribute2:"",atribute3:"", rarity:"", description:[], damage:[],  backstory:"", statToAdd:""}

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
