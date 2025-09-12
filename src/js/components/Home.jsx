import React, { useState } from "react";

//URL de la API: https://playground.4geeks.com/todo/docs#/User%20operations/read_user_users__user_name__get

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([])
	function getTodos(){

	
	//fetch() -> url del endpoint, enviar el body
	fetch("https://playground.4geeks.com/todo/users/cenicerolleno",{
		method:"GET"
	})
	// status code , recibe la informacion en JSON, convertimos a JS y l aenviamos 
	//al siguiente .then()
	.then((response)=>{
		console.log(response);
		return response.json() // .json() convertir de json a JS y enviarlo al siguiente
	})
	//2o .then() -> recibe la informacion en JS
	.then((data)=>{
		console.log(data);
		setTodos(data.todos)
	})
	//si ocurre algun error aqui se maneja
	.catch((err)=>{
		console.log(err);
		
	})
	}
	function addTodos(){
		let data = {
			label: "Ir al peluquero",
			is_done: false
		}
		//fetch -> url del endpoint, metodo, enviar al body
		fetch("https://playground.4geeks.com/todo/todos/cenicerolleno", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		//1er .then() status code, recibe la informacion en JSON, convertimos a JS
		// y la enviamos al siguiente .then() 
		.then((response) => { 
			return response.json( ) // .json() convertir de JSON a JS y enviarlo al siguiente .then()
		})
		//2o .then() -> recibe la informacion en JS
		.then((data)=>{
			console.log(data);
			
		})
		.catch((err)=>{ err })
	}
	return (
		<div className="text-center">
            <h1>Holi</h1>
			<button className="btn btn-success" onClick={()=>{
				getTodos();
			}}>Get Todos</button>
			<button className="btn btn-primary" onClick={()=>{
				addTodos();
			}}>Add Todos</button>
			{todos.map((value)=>{
				return <h4>{value.label}</h4>

			})}
			
		</div>
	);
};

export default Home;