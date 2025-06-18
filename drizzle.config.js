import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://accounts:npg_S8Ptgk5dewAp@ep-young-hall-a51gqz31-pooler.us-east-2.aws.neon.tech/AI-Study-Material-Gen?sslmode=require'
  }
});
