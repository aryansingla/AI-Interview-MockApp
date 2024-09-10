/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:w6gh0zfDBomO@ep-yellow-hill-a544pfqx.us-east-2.aws.neon.tech/Ai-INterview-App2?sslmode=require",
    }
  };