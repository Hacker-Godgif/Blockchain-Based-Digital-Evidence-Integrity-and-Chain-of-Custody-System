require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { ethers } = require("ethers");

const uploadToIPFS = require("./upload");
const abi = require("./contractABI.json");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

const provider = new ethers.JsonRpcProvider(process.env.GANACHE_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);


app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const evidenceId = req.body.evidenceId;
    const filePath = req.file.path;

    const { hash, cid } = await uploadToIPFS(filePath);

    const tx = await contract.addEvidence(
      evidenceId,
      cid,
      hash
    );

    await tx.wait();
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      cid,
      hash,
      txHash: tx.hash
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});
// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     const evidenceId = req.body.evidenceId;
//     const filePath = req.file.path;
//     const { hash, cid } = await uploadToIPFS(filePath);

//     await contract.addEvidence(evidenceId, cid, hash);

//     // const { hash, cid } = await uploadToIPFS(filePath);

//     // // const tx = await contract.addEvidence(evidenceId, hash, cid);
//     // const tx = await contract.addEvidence(evidenceId, hash);

//     await tx.wait();

//     fs.unlinkSync(filePath);

//     res.json({
//       success: true,
//       hash,
//       cid,
//       txHash: tx.hash
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.listen(5000, () =>
  console.log("Backend running on http://localhost:3000")
);
