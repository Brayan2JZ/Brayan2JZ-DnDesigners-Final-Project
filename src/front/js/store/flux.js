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

			formInput: {class:"", race:"", alignment:['',''], spell:[], skill:[], stat:[], weapon:[], backstory:"", statToAdd:['','',''],choice:''}
		},
		actions: {

			setFormInput: (newObj) => {
				setStore({ formInput: newObj });
			},

			statAdd: () => {
				const actions = getStore();
				const store = getStore();
				store.choice=="weapon" ? actions.setFormInput({...formInput, weapon: [...weapon, store.statToAdd]})
				: store.choice=="spell" ? actions.setFormInput({...formInput, spell: [...spell, store.statToAdd]})
				: store.choice=="skill" ? actions.setFormInput({...formInput, skill: [...skill, store.statToAdd]})
				: store.choice=="stat" ? actions.setFormInput({...formInput, stat: [...stat, store.statToAdd]})
				: null;
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
