const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.port || 5432;

// Use body-parser middleware to parse JSON body
app.use(bodyParser.json());

app.post("/compile", (req, res) => {
  const code = req.body.code;

  // Save the code to a file
  fs.writeFile("./code.rs", code, (err) => {
    if (err) {
      console.error(`File write error: ${err}`);
      res.status(500).send("Error writing code to file");
      return;
    }

    // Build the Docker image
    exec("docker build -t my-app .", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send("Error building Docker image");
        return;
      }

      // Run the Docker container
      exec("docker run -it --rm my-app", (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          res.status(500).send("Error running Docker container");
          return;
        }

        // Handle the output of the Docker container
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        res.send("Code compiled successfully");
      });
    });
  });
});

app.post("/deploy", (req, res) => {
  const { seed, url, constructor, args } = req.body;

  // Run the command to deploy the contract
  exec(
    `cargo contract instantiate --suri "${seed}" --url "${url}" --constructor "${constructor}" --args "${args}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send("Error deploying contract");
        return;
      }

      // Handle the output of the command
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      // Check if there are any error messages in stderr
      if (stderr) {
        res.status(500).json({ error: stderr });
        return;
      }

      const contractAddress = parseContractAddress(stdout);

      res.json({ message: "Contract deployed successfully", contractAddress });
    }
  );
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
