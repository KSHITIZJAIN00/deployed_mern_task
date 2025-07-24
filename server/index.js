import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();
dbConnection();

const port = process.env.PORT || 8800;

const app = express();

// ✅ Only allow localhost and *.render.com domains
app.use(
  cors({
    origin: (origin, callback) => {
      const isLocalhost =
        origin === "http://localhost:3000" || origin === "http://localhost:3001";
      const isRenderDomain = origin?.match(/\.render\.com$/);

      if (!origin || isLocalhost || isRenderDomain) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api", routes);

// Error Handling
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
