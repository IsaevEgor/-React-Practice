import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import PostService from '../API/PostServer';
import Loader from '../components/UI/loager/Loader';
import { UseFetching } from '../hooks/useFetching';

const PostIdPages = () => {
	const params = useParams()
	const [post, setPost] = useState({})
	const [comments, setComments] = useState([])
	const [fetchingPostById, isLoading, error] = UseFetching( async (id) => {
		const response = await PostService.getById(id)
		setPost(response.data)
	})
	const [fetchingComments, isComLoading, comError] = UseFetching( async (id) => {
		const response = await PostService.getCommentsById(id)
		setComments(response.data)
	})
	
	useEffect(() => {
		fetchingPostById(params.id)
		fetchingComments(params.id)
	}, [])

	return (
		<div>
			<h1>
				Вы попали на страницу поста c ID: {params.id}!
			</h1>
			{isLoading
				? <Loader />
				:<div>{post.id}. {post.title}</div>
			}
			<h1>
				Комментарии
			</h1>
			{isComLoading
				? <Loader/>
				: <div>
					{comments.map(comm => 
						<div key={comm.id}>
							<h5>{comm.email}</h5>
							<div>{comm.body}</div>
						</div>
					)}
					</div>
			}
		</div>
	);
};

export default PostIdPages;