import express, { response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post",postRoutes);
app.use("/api/v1/dalle",dalleRoutes);

app.get("/", async (request, response) => {
	response.send("Hello from backend...");
});

async function startServer() {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(PORT, () =>
			console.log(`Server is live on port http://localhost:${PORT}`)
		);
	} catch (error) {
		console.log(error);
	}
}

startServer();
