import About from "../pages/About";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import PostIdPages from "../pages/PostsIdPages";

export const privateRouts = [
	{path: '/about', element: About, exact: true},
	{path: '/posts', element: Posts, exact: true},
	{path: '/posts/:id', element: PostIdPages, exact: true},
]
export const publickRouts = [
	{path: '/login', element: Login, exact: true},
]
