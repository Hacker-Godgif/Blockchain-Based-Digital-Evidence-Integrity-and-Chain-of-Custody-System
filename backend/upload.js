const axios = require("axios");
const FormData = require("form-data");
const crypto = require("crypto");
const fs = require("fs");

async function uploadToIPFS(filePath) {
  const fileBuffer = fs.readFileSync(filePath);

  const sha256 = crypto
    .createHash("sha256")
    .update(fileBuffer)
    .digest("hex");

  const data = new FormData();
  data.append("file", fs.createReadStream(filePath));

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data,
    {
      headers: {
        ...data.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
      },
    }
  )

  return {
    hash: sha256,
    cid: res.data.IpfsHash,
  };
}

module.exports = uploadToIPFS;
