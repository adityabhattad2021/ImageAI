import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost } from "./pages";
import { logo, logoWhite } from "./assets";

export default function App() {
	const [darkMode, setDarkMode] = useState(true);

	return (
		<div className={darkMode ? 'dark': ''}>
			<header className="w-full flex justify-between items-center bg-white dark:bg-gray-700 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] dark:border-gray-700 border-gray-200">
				<Link to="/">
					<img
						src={darkMode ? logoWhite : logo}
						alt="logo"
						className="w-28 object-contain"
					/>
				</Link>
				<div className=" flex gap-5 justify-between">
					<Link
						to="/create"
						className="font-inter font-medium dark:bg-blue-400 bg-[#2c32df] text-white px-4 py-2 rounded-md"
					>
						Create
					</Link>
					<button
						type="button"
						onClick={() => setDarkMode(!darkMode)}
						className="text-xl font-bold dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-lg px-2 py-1 hover:shadow-lg"
					>
						{!darkMode ? "Dark 🌑" : "Light 💡"}
					</button>
				</div>
			</header>
			<main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px) dark:bg-black">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<CreatePost />} />
				</Routes>
			</main>
		</div>
	);
}
