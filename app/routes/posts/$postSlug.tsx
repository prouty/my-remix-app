import type { LoaderFunction } from "remix";
import { Link, useLoaderData } from "remix";
import type { Post } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { post: Post };

export let loader: LoaderFunction = async ({ params }) => {
	let post = await db.post.findFirst ({
		where: { slug: params.postSlug }
	});

	if (!post) throw new Error("Post not found");

	let data: LoaderData = { post };
	
	return data;
}

export default function PostRoute() {
	let data = useLoaderData<LoaderData>();

	return (
		<div>
			<h1>{data.post.title}</h1>
			<p>{data.post.content}</p>
			<Link to=".">{data.post.slug} Permalink</Link>
		</div>
	);
}