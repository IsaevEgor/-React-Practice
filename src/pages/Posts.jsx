import React, { useEffect, useMemo, useRef, useState } from "react";
import PostService from "../API/PostServer";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loager/Loader";
import MyModal from "../components/UI/myModal/MyModal";
import { UseFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePost";
import { getPageCount, getPagesArray} from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination'
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
	const [posts, setPosts] = useState ([])
	const [filter, setFilter] = useState({sort: '', query: ''})
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
	const lastElement = useRef()

	const [fetchPosts, isPostsLoading, postError] = UseFetching( async (limit, page) => {
		const responce = await PostService.getAll(limit, page);
		setPosts([...posts, ...responce.data])
		const totalCount = responce.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit))
	}, [])

	useObserver(lastElement, page < totalPages, isPostsLoading, () =>{
		setPage(page + 1);
	})

	useEffect(() => {
		fetchPosts(limit, page)
	}, [page, limit])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	const changePage = (page) => {
		setPage(page)
	}

  return (
    <div className="App">
		<MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
			Создать форму
		</MyButton>
		<MyModal visible={modal} setModal={setModal}>
			<PostForm create={createPost}/>
		</MyModal>
		<hr style={{margin: '15px 0'}} />
		<PostFilter 
			filter={filter}
			setFilter={setFilter}
		/>
		<MySelect 
			value={limit}
			onChange={value => setLimit(value)}
			defaultValue="Кол-во элементов нв странице"
			options={[
				{value: 5, name: "5"},
				{value: 10, name: "10"},
				{value: 25, name: "25"},
				{value: -1, name: "Показать Все"},
			]}
		/>
		{postError &&
			<h1>Произошла ошибка ${postError}</h1>
		}
		<PostList remove={removePost} posts={sortedAndSearchPosts} title={'Посты про JS'}/>
		<div ref={lastElement} style={{height:'20px', background: 'red'}} />
		{isPostsLoading &&
			 <div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems:'center',
				marginTop: '50px'
			}}
				><Loader /></div>
		}
		<Pagination 
			page={page} 
			changePage={changePage} 
			totalPages={totalPages} 
		/>
	</div>
  );
}

export default Posts;
