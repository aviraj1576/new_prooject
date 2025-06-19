// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AllowList {
    address public admin;
    string public allowlistCID;

    event AllowlistUpdated(string newCID, address indexed updatedBy);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(string memory _initialCID) {
        admin = msg.sender;
        allowlistCID = _initialCID;
        emit AllowlistUpdated(_initialCID, msg.sender);
    }

    function setAllowlistCID(string memory _newCID) external onlyAdmin {
        allowlistCID = _newCID;
        emit AllowlistUpdated(_newCID, msg.sender);
    }
}
