import express from "express";
import dotenv from "dotenv";
import path from "path";
import { publicRouter } from "./routes/public";
import { privateRouter } from "./routes/private";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();
app.use(express.json());

// ROUTES
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use("/api", publicRouter);
app.use("/api", privateRouter);

// ERROR HANDLER (PALING BAWAH)
app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
