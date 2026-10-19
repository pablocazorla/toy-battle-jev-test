
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (env.TYPESAFE_API_KEY) {
    process.env.TYPESAFE_API_KEY = env.TYPESAFE_API_KEY;
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "api-jev-endpoint",
        configureServer(server) {
          // Middleware para https://api.typesafe.ai/v1/systemone
          server.middlewares.use("/api/jev", async (req, res) => {
            const typesafeApiKey =
              env.TYPESAFE_API_KEY || process.env.TYPESAFE_API_KEY || "";

            const executeCall = async (payload: unknown) => {
              try {
                const response = await fetch(
                  "https://api.typesafe.ai/v1/systemone",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${typesafeApiKey}`,
                    },
                    body: JSON.stringify(payload),
                  },
                );

                const text = await response.text();
                res.statusCode = response.status;
                res.setHeader("Content-Type", "application/json");
                res.end(text);
              } catch (error) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: (error as Error).message }));
              }
            };

            if (req.method === "POST") {
              let body = "";
              req.on("data", (chunk) => {
                body += chunk;
              });
              req.on("end", async () => {
                try {
                  const data = body.trim() ? JSON.parse(body) : null;
                  if (data) {
                    await executeCall(data);
                  }
                } catch {
                  // await executeCall(defaultPayload);
                }
              });
            } else {
              // await executeCall(defaultPayload);
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": `${import.meta.dirname}/src`,
      },
    },
  };
});
