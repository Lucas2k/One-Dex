pragma solidity 0.8.0;


import "https://github.com/0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";


contract Color is NFTokenMetadata, Ownable {
 
  
  bytes3[] public colors;
  mapping(bytes3 => bool) private _colorExists;
  
  constructor() {
    nftName = "COLORS NFT";
    nftSymbol = "CLR";
  }
 
  // E.G. color = "#FFFFFF"
  function mint(bytes3 _color) external onlyOwner {
    require(!_colorExists[_color], "color exists");
    colors.push(_color);
    uint _id = colors.length - 1;
    super._mint(msg.sender, _id);
   
  }
 
}