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

// ✅ CORS: Allow localhost and *.render.com domains with credentials
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow Postman / non-browser requests

      const isLocalhost =
        origin === "http://localhost:3000" || origin === "http://localhost:3001";
      const isRenderDomain = /\.render\.com$/.test(origin);

      if (isLocalhost || isRenderDomain) {
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

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
