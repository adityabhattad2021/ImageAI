import { useEffect, useState } from "react";
import { FormField, Loader, Card } from "../components";

function RenderCard({ data, title }) {
	if (data?.length > 0) {
		return data.map((post) => <Card key={post._id} {...post} />);
	}
	return (
		<h2 className="mt-5 font-bold text-[#25359c] text-xl uppercase">
			{title}
		</h2>
	);
}

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState(null);
	const [searchText, setSearchText] = useState("");
	const [searchItems, setSearchItem] = useState(null);
	const [searchTimeout, setSearchTimeout] = useState(null);

	async function fetchPosts() {
		setLoading(true);
		console.log(import.meta.env.VITE_BACKEND_URL);
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const result = await response.json();
				setAllPosts(result.data.reverse());
			}
		} catch (error) {
			alert(error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function handleSearchChange(e) {
        clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchResults = allPosts.filter((item) =>
					item.name
						.toLowerCase()
						.includes(
							searchText.toLowerCase() ||
								item.prompt
									.toLowerCase()
									.includes(searchText.toLowerCase())
						)
				);
				setSearchItem(searchResults);
			}, 500)
		);
        console.log(searchItems);
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<section className="max-w-7xl mx-auto">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px] dark:text-white">
					The Community Showcase
				</h1>
				<p className="mt-2 text-[#666e75] text-[16px] max-w-[500px] dark:text-white">
					Browse through a collection of coummnity created images.
				</p>
			</div>
			<div className="mt-16">
				<FormField 
                    labelName={"Search Post"}
                    type={"text"}
                    name={"text"}
                    placeholder={"Type any keyword..."}
                    value={searchText}
                    handleChange={handleSearchChange}
                />
			</div>
			<div className="mt-10">
				{loading ? (
					<div className="flex justify-center items-center">
						<Loader />
					</div>
				) : (
					searchText && (
						<h2
							className="font-mediu
                             text-[#222328]"
						>
							Showing results for{" "}
							<span className="text-[#222328]">{searchText}</span>
						</h2>
					)
				)}
				<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
					{searchText ? (
						<RenderCard data={searchItems} title="No search results found" />
					) : (
						<RenderCard data={allPosts} title="No posts found" />
					)}
				</div>
			</div>
		</section>
	);
}
