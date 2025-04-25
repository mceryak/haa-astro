import express, { json } from 'express';
import { exec, spawn } from "child_process";
// import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

const app = express();
const PAGES_NAME = 'haa-astro';
const PAGES_PREVIEW_NAME = 'haa-astro-preview';
const PORT = 8888; // The port your local listener will run on

const setWranglerName = (isPreview=false) => {
  const wranglerConfig = JSON.parse(readFileSync('./wrangler.json', 'utf8'));
  wranglerConfig.name = isPreview ? PAGES_PREVIEW_NAME : PAGES_NAME;
  writeFileSync('./wrangler.json', JSON.stringify(wranglerConfig, null, 2));
}

// Middleware to parse JSON bodies (if needed)
app.use(json());

// let previewProcess;
app.get("/preview", (req, res) => {
  console.log('preview request received');
  setWranglerName(true);
  console.log('wrangler.json updated');

  exec("./preview.sh", (err, stdout, stderr) => { // mac
  // exec("preview.cmd", (err, stdout, stderr) => { // windows
      if (err) {
        console.error("Preview Deployment failed:", stderr);
        return res.status(500).json({ success: false, output: stdout, error: stderr }) //.send(`Error: ${stderr}`);
      }
      console.log("Deployment successful:", stdout);
      return res.redirect('https://preview.michaelceryak.com');
    });
  
});


app.get("/deploy", (req, res) => {
  console.log("Deployment request received!");
  setWranglerName(false);
  console.log('wrangler.json updated');
  // return res.json({ success: true });

  // exec("./deploy.sh", (err, stdout, stderr) => { // mac
  exec("deploy.cmd", (err, stdout, stderr) => { // windows
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
