import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
    JIRA_HOSTNAME: z.string().nonempty(),
    JIRA_AUTH_TOKEN: z.string().nonempty(),
  });
  
  const parsed = schema.safeParse(process.env);
  
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", JSON.stringify(parsed.error.format(), null, 2));
    process.exit(1);
  }
  
  export default parsed.data;