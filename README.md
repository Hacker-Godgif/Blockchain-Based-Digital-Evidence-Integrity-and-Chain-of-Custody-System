# Blockchain-Based-Digital-Evidence-Integrity-and-Chain-of-Custody-System
A secure, tamper-proof system for managing digital evidence using blockchain technology to ensure integrity, traceability, and transparent chain of custody.

This project provides a decentralized framework where every piece of digital evidence is cryptographically hashed and recorded on a blockchain. Each transfer of custody is logged as a blockchain transaction, creating an immutable audit trail that prevents unauthorized modifications and preserves evidentiary trust.

🚀 Key Features

Evidence Integrity Verification
Digital evidence files are hashed (SHA-256) and stored securely. Any alteration changes the hash, immediately revealing tampering.

Blockchain-Based Logging
Evidence records and custody transfers are stored on a blockchain smart contract, ensuring immutability and transparency.

Chain of Custody Tracking
Every evidence movement between investigators is recorded with timestamps and wallet addresses.

IPFS Integration
Large evidence files are stored on IPFS, while only hashes and metadata are stored on-chain for efficiency.

Smart Contract Automation
Custody transfer rules enforced through Ethereum smart contracts.

Secure Access Control
Role-based access for investigators, admins, and forensic officers.

🧩 Tech Stack

Blockchain: Ethereum

Smart Contracts: Solidity

Backend: Node.js + Express

Frontend: React

Storage: IPFS

Web3 Integration: Ethers.js / Web3.js

Database: MongoDB (for metadata & logs)

🔐 Why This Matters

Traditional evidence systems rely on centralized logs that can be altered. This system ensures:

✔ Tamper resistance
✔ Legal admissibility support
✔ Transparent audit trail
✔ Reduced risk of evidence disputes

🏛 Use Cases

Law enforcement digital forensics

Cybercrime investigations

Court-admissible digital evidence management

Corporate incident response

📌 Goal

To build a trustworthy digital evidence ecosystem where integrity, accountability, and transparency are guaranteed by blockchain technology.
