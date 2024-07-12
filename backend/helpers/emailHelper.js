const fs = require("fs");
const path = require("path");

async function convertHtmlFileToString(filePath) {
  try {
    const readStream = fs.createReadStream(filePath, "utf-8");
    let htmlString = "";

    const readPromise = new Promise((resolve, reject) => {
      readStream.on("data", (chunk) => {
        htmlString += chunk;
      });

      readStream.on("end", () => {
        resolve(htmlString);
      });

      readStream.on("error", (err) => {
        reject(err);
      });
    });

    const result = await readPromise;
    return result;
  } catch (err) {
    throw err;
  } finally {
    readStream.close();
  }
}

async function getHtml(fileName) {
  const htmlFilePath = path.join(__dirname, fileName);
  try {
    const htmlString = await convertHtmlFileToString(htmlFilePath);
    return htmlString;
  } catch (error) {
    console.error("Error reading the file:", error);
    throw new Error("Error reading the file");
  }
}

module.exports = { getHtml };
