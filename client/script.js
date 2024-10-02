const fs = require("fs");
const path = require("path");

const folderPath = "C:/Users/Ali Jalloul/Desktop/HireMeV3"; // Path to your project folder
const importStatement = "import { Colors } from '@/constants/Colors'"; // The import statement to add

// Function to add import to each file
const addImportToFile = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");

  // Check if the import already exists
  if (!data.includes(importStatement)) {
    // Add the import statement to the top of the file
    const updatedData = `${importStatement}\n${data}`;
    fs.writeFileSync(filePath, updatedData, "utf8");
    console.log(`Added import to: ${filePath}`);
  } else {
    console.log(`Import already exists in: ${filePath}`);
  }
};

// Function to recursively read directories
const readDirectory = (dirPath) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      // If it's a directory, recurse into it
      if (stat.isDirectory()) {
        readDirectory(filePath);
      }
      // If it's a file and ends with x, add the import
      else if (stat.isFile() && file.endsWith("x")) {
        addImportToFile(filePath);
      }
    });
  });
};

// Start reading from the root folder
readDirectory(folderPath);
