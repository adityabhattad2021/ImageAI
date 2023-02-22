import { surpriseMePrompt } from "../constants";
import FileSaver from "file-saver";

export function getRandomPrompt(prompt) {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompt.length);
	const randomPrompt = surpriseMePrompt[randomIndex];
	if (randomPrompt === prompt) {
		return getRandomPrompt(prompt);
	}
	return randomPrompt;
}

export async function downloadImage(_id, photo) {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
