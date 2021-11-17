// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;
  uint bal;

  function set(uint x) public {
    storedData = x;
  }
  function setbal(uint _bal) public {
    bal=_bal;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
