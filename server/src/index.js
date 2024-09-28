import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// ROUTES IMPORTS
import dashboardRoutes from "../routes/dashboardRoutes.js"
import productRoutes from "../routes/productRoutes.js"
import userRoutes from "../routes/userRoutes.js";
import expensesRoutes from "../routes/expensesRoutes.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/dashboard",dashboardRoutes)
app.use("/products",productRoutes)
app.use("/users", userRoutes);
app.use("/expenses", expensesRoutes);


// SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT,"0.0.0.0", () => console.log(`Server running on port ${PORT}`));
