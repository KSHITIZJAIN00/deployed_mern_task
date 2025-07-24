import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import dbConnection from "./utils/connectDB.js";
import userRoutes from "./routes/userRoute.js";
import routes from "./routes/index.js";

dotenv.config();
dbConnection();

const app = express();
const port = process.env.PORT || 8800;

// ✅ CORS: Allow all origins (reflect origin) with credentials
app.use(
  cors({
    origin: true, // Dynamically reflect request origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Allow preflight across all routes
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api", routes);

// Error Handling
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
