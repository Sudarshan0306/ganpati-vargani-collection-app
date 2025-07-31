import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import donorRoutes from "./routes/donors.js";
import contributionRoutes from "./routes/contributions.js";
import statsRoutes from "./routes/stats.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get("/health", (req, res) =>
  res.json({ ok: true, ts: new Date().toISOString() })
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/donors", donorRoutes);
app.use("/contributions", contributionRoutes);
app.use("/stats", statsRoutes);

// Fallback 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

export default app;
