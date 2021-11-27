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
			slug: "hello-world",
			title: "Hello World",
			content: "Here is some content"
		},
		{
			slug: "goodbye-world",
			title: "Goodbye World",
			content: "Here is some more content"
		}
	]
}