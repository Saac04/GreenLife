<?php

/**
 * Clase para procesar los datos de una petición REST.
 */
class PeticionREST
{

	private $resource;

	private $method;

	private $path_params;

	private $query;

	private $formData;

	private $body;

	/**
	 * Crea un nuevo objeto PeticionREST
	 * @param $separador string Fragmento de la URL a partir del cual comienza
	 * el path de la petición a la API. Habitualmente es la versión de la API.
	 * Por defecto v1.0
	 */
	public function __construct($separador = 'v1.0')
	{
		$uri = explode('/' . $separador . '/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))[1];
		$this->path_params = explode('/', urldecode($uri));
		$this->resource = array_shift($this->path_params);
		$this->path_params = array_filter($this->path_params, 'strlen');
		$this->method = strtoupper($_SERVER['REQUEST_METHOD']);
		$this->query = $_GET;
		// TODO: cargar uno u otro según $_SERVER["CONTENT_TYPE"]
		// Content-Type: application/x-www-form-urlencoded
		$this->formData = $_POST;
		// Content-Type: application/json
		$this->body = json_decode(file_get_contents('php://input'));
	}

	/**
	 * Recurso solicitado en la petición.
	 * @return string
	 */
	public function recurso(): string
	{
		return $this->resource;
	}

	/**
	 * Método de la petición.
	 * Puede ser uno de los valores GET, POST, PUT o DELETE.
	 * @return string
	 */
	public function metodo(): string
	{
		return $this->method;
	}

	/**
	 * Array con los parámetros del path, a partir del recurso solicitado.
	 * Ejemplo: el path /v1.0/recurso/1/categoria/ se forma como ["1", "categoria"]
	 * @return string[]
	 */
	public function parametrosPath(): array
	{
		return $this->path_params;
	}

	/**
	 * Array asociativo con los parámetros de la query.
	 * Toma sus valores del array $_GET de PHP.
	 * @return array
	 */
	public function parametrosQuery(): array
	{
		return $this->query;
	}

	/**
	 * Array asociativo con los parámetros del body de la petición con formato de formulario.
	 * Toma sus valores del array $_POST de PHP.
	 * @return array
	 */
	public function parametrosPost(): array
	{
		return $this->formData;
	}

	/**
	 * Parámetros del body.
	 * El tipo concreto de datos dependerá de como estén formados al enviarse la petición.
	 * @return mixed
	 */
	public function parametrosBody()
	{
		return $this->body;
	}
}