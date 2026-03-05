// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EvidenceIntegrity {

    // ---------------- STRUCT ----------------
    struct Evidence {
        string cid;          // IPFS CID (file location)
        string fileHash;     // Cryptographic hash (integrity check)
        address owner;       // Current owner
        uint256 timestamp;   // Time of submission
        bool exists;         // Existence flag
    }

    // ---------------- STORAGE ----------------
    mapping(string => Evidence) private evidences;

    // ---------------- EVENTS ----------------
    event EvidenceAdded(
        string evidenceID,
        string cid,
        string fileHash,
        address owner,
        uint256 timestamp
    );

    event CustodyTransferred(
        string evidenceID,
        address from,
        address to,
        uint256 timestamp
    );

    // ---------------- FUNCTIONS ----------------

    // Add new evidence
    function addEvidence(
        string memory _evidenceID,
        string memory _cid,
        string memory _fileHash
    ) public {
        require(!evidences[_evidenceID].exists, "Evidence already exists");

        evidences[_evidenceID] = Evidence(
            _cid,
            _fileHash,
            msg.sender,
            block.timestamp,
            true
        );

        emit EvidenceAdded(
            _evidenceID,
            _cid,
            _fileHash,
            msg.sender,
            block.timestamp
        );
    }

    // Get evidence details
    function getEvidence(string memory _evidenceID)
        public
        view
        returns (
            string memory cid,
            string memory fileHash,
            address owner,
            uint256 timestamp
        )
    {
        require(evidences[_evidenceID].exists, "Evidence not found");

        Evidence memory e = evidences[_evidenceID];
        return (e.cid, e.fileHash, e.owner, e.timestamp);
    }

    // Transfer custody of evidence
    function transferCustody(
        string memory _evidenceID,
        address _newOwner
    ) public {
        require(evidences[_evidenceID].exists, "Evidence not found");
        require(msg.sender == evidences[_evidenceID].owner, "Not current owner");

        address oldOwner = evidences[_evidenceID].owner;
        evidences[_evidenceID].owner = _newOwner;

        emit CustodyTransferred(
            _evidenceID,
            oldOwner,
            _newOwner,
            block.timestamp
        );
    }
}
