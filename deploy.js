import express, { json } from 'express';
import { exec, spawn } from "child_process";

const app = express();
const PORT = 8888; // The port your local listener will run on

// Middleware to parse JSON bodies (if needed)
app.use(json());

let previewProcess;
app.get("/preview", (req, res) => {
  console.log('Preview Request Received.');

  exec("./preview.sh", (err, stdout, stderr) => {
  // exec("preview.cmd", (err, stdout, stderr) => {
      if (err) {
        console.error("Preview failed:", stderr);
        return res.status(500).json({ success: false, output: stdout, error: stderr }) //.send(`Error: ${stderr}`);
      }
      console.log("Ready to start preview. ", stdout);
      previewProcess = spawn('npm', ['run', 'preview'], {
        stdio: 'pipe',
        shell: true,
      });
      previewProcess.stderr.on('data', (data) => {
        console.error('Error loading preview: ' + data.toString());
      });
      previewProcess.stdout.on('data', (data) => {
        const text = data.toString();
        console.log('[stdout]', text);

        // Example: look for "Local" URL
        if (text.includes('localhost:')) {
          const errorMatch = text.match(/Address already in use \(.*\)/);
          const match = text.match(/http:\/\/localhost:\d+/);
          if (errorMatch) {
            console.log(errorMatch[0])
          }
          if (match) {
            console.log('Server started at:', match[0]);
            // res.json({ success: true, serverRunningAtUrl: match[0] });
            res.redirect(match[0]);
          }
        }
      });
    });
});

function shutdown() {
  console.log('\n🛑 Shutting down Express and preview server...');
  if (previewProcess) {
    previewProcess.kill('SIGTERM'); // or 'SIGINT'
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);


app.get("/deploy", (req, res) => {
  console.log("Deployment request received!");
  console.log(typeof exec);
  // return res.json({ success: true });
  // Run the deploy script
  // exec("./deploy.sh", (err, stdout, stderr) => {
  exec("deploy.cmd", (err, stdout, stderr) => {
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
