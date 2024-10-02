const fs = require("fs");
const path = require("path");

const directoryPath = "C:/Users/Ali Jalloul/Desktop/HireMe/client";

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified; // To track if changes were made

  do {
    modified = false; // Reset modified status for each loop

    // Perform all replacements in a single pass
    const newContent = content
      .replace(
        /\{\s*translateText\(\s*([^"]+)\s*,\s*([^"]+)\s*\)\s*\}/g,
        (match, p1) => {
          modified = true; // Changes were made
          return `{${p1}}`;
        }
      )
      .replace(
        /=\{\s*translateText\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)\s*\}/g,
        (match, p1) => {
          modified = true; // Changes were made
          return `="${p1}"`;
        }
      )
      .replace(
        /\{\s*translateText\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)\s*\}/g,
        (match, p1) => {
          modified = true; // Changes were made
          return `${p1}`;
        }
      )
      .replace(
        /\{\s*translateText\(\s*([^"]+)\s*,\s*"([^"]+)"\s*\)\s*\}/g,
        (match, p1) => {
          modified = true; // Changes were made
          return `{${p1}}`;
        }
      )
      .replace(
        /\{\s*translateText\(\s*"([^"]+)"\s*,\s*([^"]+)\s*\)\s*\}/g,
        (match, p1) => {
          modified = true; // Changes were made
          return `${p1}`;
        }
      )
      .replace(
        /\s*translateText\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)\s*,/g,
        (match, p1) => {
          modified = true; // Changes were made
          return `"${p1}",`;
        }
      )

      .replace(
        /\s*translateText\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)\s*/g,
        (match, p1) => {
          modified = true; // Changes were made
          return `"${p1}"`;
        }
      )
      .replace(
        /\?\s*translateText\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)\s*/g,
        (match, p1) => {
          modified = true; // Changes were made
          return `${p1}`;
        }
      );

    // Update content for the next iteration
    content = newContent;
  } while (modified); // Continue looping until no changes are made

  // Write the modified content back to the file only if changes were made
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Modified: ${filePath}`);
};

const traverseDirectory = (dirPath) => {
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath); // Recur for nested directories
    } else if (path.extname(fullPath) === ".jsx") {
      replaceInFile(fullPath); // Process .jsx files
    }
  });
};

// Start processing from the specified directory
traverseDirectory(directoryPath);
