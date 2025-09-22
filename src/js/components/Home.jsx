import React, { useState, useEffect } from "react";

//URL del endpoint (API): https://playground.4geeks.com/todo/docs#/User%20operations/read_user_users__user_name__get

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const userName = "cenicerolleno";
	//Podemos crear una constante que contenga la URL del endpoint para usarla despues en el fetch
	const apiTodosURL = "https://playground.4geeks.com/todo";
	/*//useEfect recibe 2 parametros
	//			1er-> funcion 
	//			2o (opcional)-> demarca cual es de los primeros 3 casos
	//					no hay 2 parametros -> ejecuta la funcion cada vez que
	//											se rerenderiza el componente
	//								[] -> ejecuta la funcion una sola vez
	//								[var1, var2, ..] -> ejecuta la funcion cada vez
	//									que cambia una de las variables listadas
	//    **Sepueden declarar todos los useEffect() que quieras pero solo uno de ellos
	//			podra declararse sin el array de dependencias				
	//useEffect()*/
	useEffect(() => {
		//console.log("Funcion useEfefect llamada");
		fetch(`${apiTodosURL}/users/${userName}`)
			.then(response => {
				if (response.status === 404 || response.status === 400) {
					return fetch(`${apiTodosURL}/users/${userName}`, {
						method: "POST",
						headers: { "Content-Type": "application/json" }
					})
						.then(() => fetch(`${apiTodosURL}/users/${userName}`))
				}
				return response;
			})

		return getTodos();

		//return
	}, []);



	function getTodos() {


		//fetch() -> url del endpoint, enviar el body
		fetch(`${apiTodosURL}/users/${userName}`)
			//method: "GET" //Por defecto si solo se envia el fetch sin un metodo,
			//  siempre se asignará el método GET 
			// status code , recibe la informacion en JSON, convertimos a JS y l aenviamos 
			//al siguiente .then()
			.then((response) => {
				console.log(response);
				return response.json() // .json() convertir de json a JS y enviarlo al siguiente
			})
			//2o .then() -> recibe la informacion en JS
			.then((data) => {
				//console.log(data);
				setTodos(data.todos || [])
			})
			//si ocurre algun error aqui se maneja
			.catch((err) => {
				console.log(err);

			})
	}
	function addTodo() {
		if (newTodo.trim() === "") return;

		const data = {
			label: newTodo,
			is_done: false,
			//user_id: "cenicerolleno"
		};
		//fetch -> url del endpoint, metodo, enviar al body
		fetch(`${apiTodosURL}/todos/${userName}`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		})
			//1er .then() status code, recibe la informacion en JSON, convertimos a JS
			// y la enviamos al siguiente .then() 
			.then((response) =>
				response.json() // .json() convertir de JSON a JS y enviarlo al siguiente .then()
			)
			//2o .then() -> recibe la informacion en JS
			.then(() => {
				//console.log(data);
				setNewTodo("");
				getTodos();

			})
			.catch((err) => console.log(err)
			);
	}
	function deleteTodo(id) {

		fetch(`${apiTodosURL}/todos/${id}`, {
			method: "DELETE"
		})
			
			.then(() =>
				getTodos()
			)
			.catch((err) => console.log(err));


	}


	return (
		<div className="container text-center mt-5">


			<div className="principal card ">
				<div className="card-header"><h1>To Do List</h1></div>
				<div className="card-body">
					<form >
						<label className="mb-2 me-2">El usuario es "{userName}"</label>
						<p><a href={apiTodosURL+'/docs#/'} target="_blanck">Link al Endpoint</a></p>
						<input
							className="form-control"
							placeholder="Añade a la lista..."
							value={newTodo}
							onChange={(event) => setNewTodo(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									addTodo();
								}

							}} />
						<div className="card mt-2">
							{todos.map((todo) => (
								<div
									key={todo.id}
									className="card-text d-flex justify-content-between p-2 mb-2 ms-3"
								>
									{todo.label}
									<button
										type="button"
										className="btn-close"
										aria-label="Close"
										onClick={() => deleteTodo(todo.id)}
									/>
								</div>
							))}
						</div>




					</form>
				</div>
				<div class="card-footer d-flex justify-content-start">
					<label className="counter ms-">{todos.length} items</label>
				</div>
			</div>


		</div>
	);
};

export default Home;