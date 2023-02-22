import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import PostSchema from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CREATE A POST ROUTE
router.route("/").post(async (request, response) => {
	try {
		const { name, prompt, photo } = request.body;

		const photoURL = await cloudinary.uploader.upload(photo);

		const newPost = await PostSchema.create({
			name: name,
			prompt: prompt,
			photo: photoURL.url,
		});

		response.status(200).json({ success: true, data: newPost });
	} catch (error) {
		response.status(500).json({ success: false, message: error });
	}
});

// GET A POST ROUTE
router.route("/").get(async (request, response) => {
	try {
		const posts = await PostSchema.find({});

		response.status(200).json({ success: true, data: posts });
	} catch (error) {
		response.status(500).json({ success: false, message: error });
	}
});

export default router;
