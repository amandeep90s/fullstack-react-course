import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = (newPersonObject) => {
	const request = axios.post(baseUrl, newPersonObject);
	return request.then((response) => response.data);
};

const update = (id, newPersonObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newPersonObject);
	return request.then((response) => response.data);
};

const destroy = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	update,
	destroy,
};
