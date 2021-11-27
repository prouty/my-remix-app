import { LoaderFunction } from "remix";
import { Link, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = {
	postListItems:  Array<{ id: string; slug: string, title: string }>;
};

export let loader: LoaderFunction = async () => {
	let data: LoaderData = {
		postListItems: await db.post.findMany()
	};
	return data;
}

export default function PostsRoute() {
	let data = useLoaderData<LoaderData>();

	return(
		<div>
			<ul>
				{data.postListItems.map(post => (
					<li key={post.id}>
						<Link to={post.slug}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
