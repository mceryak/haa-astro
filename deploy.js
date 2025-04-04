import express, { json } from 'express';
import { exec } from "child_process";

const app = express();
const PORT = 8888; // The port your local listener will run on

// Middleware to parse JSON bodies (if needed)
app.use(json());

app.get("/deploy", (req, res) => {
  console.log("Deployment request received!");
  console.log(typeof exec);
  // return res.json({ success: true });
  // Run the deploy script
  exec("./deploy.sh", (err, stdout, stderr) => {
  // exec.exec("ls", (err, stdout, stderr) => {
    if (err) {
      console.error("Deployment failed:", stderr);
      return res.status(500).json({ success: false, output: stdout, error: stderr }) //.send(`Error: ${stderr}`);
    }
    console.log("Deployment successful:", stdout);
    res.json({ success: true, output: stdout, error: null }) //.send("Deployment completed!");
  });
});

app.listen(PORT, () => {
  console.log(`Deployment listener running on port ${PORT}...`);
});
