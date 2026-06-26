import fs from "fs";
import path from "path";
import { Buffer } from "buffer";

export default function localCmsPlugin() {
  return {
    name: "vite-plugin-local-cms",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/data" && req.method === "GET") {
          const type = req.headers["x-data-type"];
          let filePath = "";
          if (type === "projects") {
            filePath = path.resolve(process.cwd(), "src/data/projects.json");
          } else if (type === "en-translation") {
            filePath = path.resolve(process.cwd(), "src/translation/en-translation.json");
          } else if (type === "ar-translation") {
            filePath = path.resolve(process.cwd(), "src/translation/ar-translation.json");
          }

          if (filePath && fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8");
            res.setHeader("Content-Type", "application/json");
            res.end(data);
            return;
          }
          res.statusCode = 404;
          res.end("Not found");
          return;
        }

        if (req.url === "/api/data" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const { type, content } = JSON.parse(body);
              let filePath = "";
              if (type === "projects") {
                filePath = path.resolve(process.cwd(), "src/data/projects.json");
              } else if (type === "en-translation") {
                filePath = path.resolve(process.cwd(), "src/translation/en-translation.json");
              } else if (type === "ar-translation") {
                filePath = path.resolve(process.cwd(), "src/translation/ar-translation.json");
              }

              if (filePath) {
                // Ensure directory exists
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }
                
                fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: true }));
                return;
              }
              res.statusCode = 400;
              res.end("Invalid type");
            } catch (err) {
              res.statusCode = 500;
              res.end(err.message);
            }
          });
          return;
        }

        if (req.url === "/api/upload" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const { filename, base64 } = JSON.parse(body);
              const buffer = Buffer.from(base64.split(",")[1] || base64, "base64");
              const filePath = path.resolve(process.cwd(), "public/projects", filename);
              
              fs.writeFileSync(filePath, buffer);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, path: `/projects/${filename}` }));
            } catch (err) {
              res.statusCode = 500;
              res.end(err.message);
            }
          });
          return;
        }

        next();
      });
    },
  };
}
