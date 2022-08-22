import axios from "axios";

export default class PostService {
	static async getAll(Limit = 10, page = 1) {
		const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
			params: {
				_limit: Limit,
				_page: page
			}
		})
		return responce;
	}
	static async getById(id) {
		const responce = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
		return responce;
	}
	static async getCommentsById(id) {
		const responce = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
		return responce;
	}
}