import { PrismaClient } from "@prisma/client";

let db = new PrismaClient();

async function seed() {
	await Promise.all(
		getPosts().map(post => {
			return db.post.create({data: post});
		})
	);
}

seed();

function getPosts() {
	return [
		{
			slug: "brand-new-post",
			title: "Brand New Post",
			content: "Brand new content"
		}
	]
}