import "dotenv/config";
import app from "./app.js";
import connectDb from "./utils/db.js";

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(PORT, () =>
    console.log(`🚀 API running on http://localhost:${PORT}`)
  );
};

bootstrap();
