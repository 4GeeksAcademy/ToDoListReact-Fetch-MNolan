import React, { useState } from "react";


//include images into your bundle


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
	function addTodo(){
		fetch("https://playground.4geeks.com/todo/todos/cenicerolleno", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((response) => { return response.json( )})
		.then()
		.catch()
	}
	return (
		<div className="text-center">
            <p>holi</p>
			{todos.map((value)=>{
				return <h1>{value.label}</h1>

			})}
			
		</div>
	);
};

export default Home;