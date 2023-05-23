// pragma solidity ^0.8.2;
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract ICO is ERC20, Ownable {
//     constructor() ERC20("Inurag", "INC") {
//         _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
//     }

//     function mint(
//         address account,
//         uint256 amount
//     ) public onlyOwner returns (bool) {
//         require(
//             account != address(0) && amount != uint256(0),
//             "ERC20: function mint invalid input"
//         );
//         _mint(account, amount);
//         return true;
//     }

//     function burn(
//         address account,
//         uint256 amount
//     ) public onlyOwner returns (bool) {
//         require(
//             account != address(0) && amount != uint256(0),
//             "ERC20: function burn invalid input"
//         );
//         _burn(account, amount);
//         return true;
//     }

//     function buy() public payable returns (bool) {
//         require( msg.sender.balance >= msg.value && msg.value != 0 ether, "ICO: function buy invalid input");
//         uint amount = msg.value * 1000;
//         _transfer(owner(), _msgSender(), amount);
//     }

//     function withdrow(uint256 amount) public onlyOwner returns (bool) {
//         require(
//             amount <= address(this).balance,
//             "ICo: function withdrow has invalid input"
//         );
//         payable(_msgSender()).transfer(amount);
//         return (true);
//     }
// }


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// import from node_modules @openzeppelin/contracts v4.0
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ICO is ERC20, Ownable {

    constructor() ERC20("IneuronCoin", "INT") {
      _mint(msg.sender, 1000000*(10**uint256(decimals())));
    }
    

    function mint(address account, uint256 amount) public onlyOwner returns (bool) {
      require(account != address(0) && amount != uint256(0), "ERC20: function mint invalid input");
      _mint(account, amount);
      return true;
    }

    function burn(address account, uint256 amount) public onlyOwner returns (bool) {
      require(account != address(0) && amount != uint256(0), "ERC20: function burn invalid input");
      _burn(account, amount);
      return true;
    }


    function buy() public payable returns (bool) {
      require(msg.sender.balance >= msg.value && msg.value != 0 ether, "ICO: function buy invalid input");
      uint256 amount = msg.value * 1000;
      _transfer(owner(), _msgSender(), amount);
      return true;
    }

    function withdraw(uint256 amount) public onlyOwner returns (bool) {
      require(amount <= address(this).balance, "ICO: function withdraw invalid input");
      payable(_msgSender()).transfer(amount);
      return true;
    }
}