import React, { useState } from "react";


const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?appid=apiiii&units=metric&lang=es&"


//create your first component
const Home = () => {

	const [searchWeather, setSearchWeather] = useState({
		city: "",
		country: ""
	})

	const [weather, setWeather] = useState(null)


	const handleChange = (event) => {
		setSearchWeather({
			...searchWeather,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			if (searchWeather.city.trim() === "" || searchWeather.country.trim() === "") {
				console.log("Campos vacios")
				return
			}

			const response = await fetch(`${URL_BASE}q=${searchWeather.city},${searchWeather.country}`)
			const data = await response.json()
			setWeather(data)


		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 my-md-3">
					<h1 className="text-center">Aplicación del clima</h1>
				</div>
				<div className="col-12 col-md-6 border border-danger p-3">
					<form
						onSubmit={handleSubmit}
					>
						<div className="form-group">
							<label htmlFor="city">Ciudad:</label>
							<input
								type="text"
								className="form-control"
								placeholder="Escribe el nombre de la ciudad"
								id="city"
								name="city"
								onChange={handleChange}
							/>
						</div>

						<div className="form-group mt-3">
							<label htmlFor="country">País:</label>
							<select
								className="form-control"
								id="country"
								name="country"
								onChange={handleChange}
							>
								<option value="">Selecciona un país</option>
								<option value="US">Estados Unidos</option>
								<option value="MX">México</option>
								<option value="AR">Argentina</option>
								<option value="CO">Colombia</option>
								<option value="CR">Costa Rica</option>
								<option value="ES">España</option>
								<option value="PE">Perú</option>
								<option value="VE">Venezuela</option>
							</select>
						</div>

						<button
							className="btn btn-primary w-100 mt-3"
						>Consultar clima</button>
					</form>
				</div>
				<div
					className="col-12 col-md-6 d-flex align-items-center border border-danger p-3">
					{
						!weather ? "Aún no se consulta el clima" :
							weather.cod === "404" ? "Valida la ciudad y el país" :
								<>
									<div>
										<p className="p-2 display-5">
											{Math.ceil(weather?.main?.temp)}c°
										</p>
									</div>
									<div>
										<p>
											<span>Temp-max:</span> {Math.ceil(weather?.main?.temp_max)}c°
										</p>
										<p>
											<span>Temp-min:</span> {Math.ceil(weather?.main?.temp_min)}c°
										</p>
									</div>
								</>
					}

				</div>
			</div>
		</div>
	);
};

export default Home;
