// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "./dependencies/IERC1155Receiver.sol";
import "./dependencies/IERC1155MetadataURI.sol";
import "./dependencies/Context.sol";
import "./dependencies/ERC165.sol";
import "./dependencies/SafeMath.sol";
import "./dependencies/Address.sol";
import "./dependencies/ERC1155Holder.sol";
import "./dependencies/Ownable.sol";

/**
 *
 * @dev Implementation of the basic standard multi-token.
 * See https://eips.ethereum.org/EIPS/eip-1155
 * Originally based on code by Enjin: https://github.com/enjin/erc-1155
 *
 * _Available since v3.1._
 */
contract ERC1155 is Context, ERC165, IERC1155, IERC1155MetadataURI, IERC1155Receiver, ERC1155Holder {
    using SafeMath for uint256;
    using Address for address;

    // Mapping from token ID to account balances
    mapping (uint256 => mapping(address => uint256)) private _balances;

    // Mapping from account to operator approvals
    mapping (address => mapping(address => bool)) private _operatorApprovals;

    // Used as the URI for all token types by relying on ID substitution, e.g. https://token-cdn-domain/{id}.json
    string private _uri;

    /*
     *     bytes4(keccak256('balanceOf(address,uint256)')) == 0x00fdd58e
     *     bytes4(keccak256('balanceOfBatch(address[],uint256[])')) == 0x4e1273f4
     *     bytes4(keccak256('setApprovalForAll(address,bool)')) == 0xa22cb465
     *     bytes4(keccak256('isApprovedForAll(address,address)')) == 0xe985e9c5
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256,uint256,bytes)')) == 0xf242432a
     *     bytes4(keccak256('safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)')) == 0x2eb2c2d6
     *
     *     => 0x00fdd58e ^ 0x4e1273f4 ^ 0xa22cb465 ^
     *        0xe985e9c5 ^ 0xf242432a ^ 0x2eb2c2d6 == 0xd9b67a26
     */
    bytes4 private constant _INTERFACE_ID_ERC1155 = 0xd9b67a26;

    /*
     *     bytes4(keccak256('uri(uint256)')) == 0x0e89341c
     */
    bytes4 private constant _INTERFACE_ID_ERC1155_METADATA_URI = 0x0e89341c;

    /**
     * @dev See {_setURI}.
     */
    constructor (string memory uri_) public {
        _setURI(uri_);

        // register the supported interfaces to conform to ERC1155 via ERC165
        _registerInterface(_INTERFACE_ID_ERC1155);

        // register the supported interfaces to conform to ERC1155MetadataURI via ERC165
        _registerInterface(_INTERFACE_ID_ERC1155_METADATA_URI);
    }

    /**
     * @dev See {IERC1155MetadataURI-uri}.
     *
     * This implementation returns the same URI for *all* token types. It relies
     * on the token type ID substitution mechanism
     * https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].
     *
     * Clients calling this function must replace the `\{id\}` substring with the
     * actual token type ID.
     */
    function uri(uint256) external view virtual override returns (string memory) {
        return _uri;
    }

    /**
     * @dev See {IERC1155-balanceOf}.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function balanceOf(address account, uint256 id) public view virtual override returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");
        return _balances[id][account];
    }

    /**
     * @dev See {IERC1155-balanceOfBatch}.
     *
     * Requirements:
     *
     * - `accounts` and `ids` must have the same length.
     */
    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    )
        public
        view
        virtual
        override
        returns (uint256[] memory)
    {
        require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    /**
     * @dev See {IERC1155-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(_msgSender() != operator, "ERC1155: setting approval status for self");

        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC1155-isApprovedForAll}.
     */
    function isApprovedForAll(address account, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[account][operator];
    }

    /**
     * @dev See {IERC1155-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
        public
        virtual
        override
    {
        require(to != address(0), "ERC1155: transfer to the zero address");


        address operator = _msgSender();

        _beforeTokenTransfer(operator, from, to, _asSingletonArray(id), _asSingletonArray(amount), data);

        _balances[id][from] = _balances[id][from].sub(amount, "ERC1155: insufficient balance for transfer");
        _balances[id][to] = _balances[id][to].add(amount);

        emit TransferSingle(operator, from, to, id, amount);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
    }

    /**
     * @dev See {IERC1155-safeBatchTransferFrom}.
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        public
        virtual
        override
    {
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
        require(to != address(0), "ERC1155: transfer to the zero address");
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: transfer caller is not owner nor approved"
        );

        address operator = _msgSender();

        _beforeTokenTransfer(operator, from, to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            _balances[id][from] = _balances[id][from].sub(
                amount,
                "ERC1155: insufficient balance for transfer"
            );
            _balances[id][to] = _balances[id][to].add(amount);
        }

        emit TransferBatch(operator, from, to, ids, amounts);

        _doSafeBatchTransferAcceptanceCheck(operator, from, to, ids, amounts, data);
    }

    /**
     * @dev Sets a new URI for all token types, by relying on the token type ID
     * substitution mechanism
     * https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].
     *
     * By this mechanism, any occurrence of the `\{id\}` substring in either the
     * URI or any of the amounts in the JSON file at said URI will be replaced by
     * clients with the token type ID.
     *
     * For example, the `https://token-cdn-domain/\{id\}.json` URI would be
     * interpreted by clients as
     * `https://token-cdn-domain/000000000000000000000000000000000000000000000000000000000004cce0.json`
     * for token type ID 0x4cce0.
     *
     * See {uri}.
     *
     * Because these URIs cannot be meaningfully represented by the {URI} event,
     * this function emits no events.
     */
    function _setURI(string memory newuri) internal virtual {
        _uri = newuri;
    }

    /**
     * @dev Creates `amount` tokens of token type `id`, and assigns them to `account`.
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - If `account` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     */
    function _mint(address account, uint256 id, uint256 amount, bytes memory data) internal virtual {
        require(account != address(0), "ERC1155: mint to the zero address");

        address operator = _msgSender();

        _beforeTokenTransfer(operator, address(0), account, _asSingletonArray(id), _asSingletonArray(amount), data);

        _balances[id][account] = _balances[id][account].add(amount);
        emit TransferSingle(operator, address(0), account, id, amount);

        _doSafeTransferAcceptanceCheck(operator, address(0), account, id, amount, data);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_mint}.
     *
     * Requirements:
     *
     * - `ids` and `amounts` must have the same length.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the
     * acceptance magic value.
     */
    function _mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");

        address operator = _msgSender();

        _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);

        for (uint i = 0; i < ids.length; i++) {
            _balances[ids[i]][to] = amounts[i].add(_balances[ids[i]][to]);
        }

        emit TransferBatch(operator, address(0), to, ids, amounts);

        _doSafeBatchTransferAcceptanceCheck(operator, address(0), to, ids, amounts, data);
    }

    /**
     * @dev Destroys `amount` tokens of token type `id` from `account`
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens of token type `id`.
     */
    function _burn(address account, uint256 id, uint256 amount) internal virtual {
        require(account != address(0), "ERC1155: burn from the zero address");

        address operator = _msgSender();

        _beforeTokenTransfer(operator, account, address(0), _asSingletonArray(id), _asSingletonArray(amount), "");

        _balances[id][account] = _balances[id][account].sub(
            amount,
            "ERC1155: burn amount exceeds balance"
        );

        emit TransferSingle(operator, account, address(0), id, amount);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_burn}.
     *
     * Requirements:
     *
     * - `ids` and `amounts` must have the same length.
     */
    function _burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) internal virtual {
        require(account != address(0), "ERC1155: burn from the zero address");
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");

        address operator = _msgSender();

        _beforeTokenTransfer(operator, account, address(0), ids, amounts, "");

        for (uint i = 0; i < ids.length; i++) {
            _balances[ids[i]][account] = _balances[ids[i]][account].sub(
                amounts[i],
                "ERC1155: burn amount exceeds balance"
            );
        }

        emit TransferBatch(operator, account, address(0), ids, amounts);
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning, as well as batched variants.
     *
     * The same hook is called on both single and batched variants. For single
     * transfers, the length of the `id` and `amount` arrays will be 1.
     *
     * Calling conditions (for each `id` and `amount` pair):
     *
     * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * of token type `id` will be  transferred to `to`.
     * - When `from` is zero, `amount` tokens of token type `id` will be minted
     * for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens of token type `id`
     * will be burned.
     * - `from` and `to` are never both zero.
     * - `ids` and `amounts` have the same, non-zero length.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        internal
        virtual
    { }

    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
        private
    {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data) returns (bytes4 response) {
                if (response != IERC1155Receiver(to).onERC1155Received.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non ERC1155Receiver implementer");
            }
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        private
    {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155BatchReceived(operator, from, ids, amounts, data) returns (bytes4 response) {
                if (response != IERC1155Receiver(to).onERC1155BatchReceived.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non ERC1155Receiver implementer");
            }
        }
    }

    function _asSingletonArray(uint256 element) private pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }
}

contract polyhess is ERC1155, Ownable {

     uint8 winner;
     address _owner;
     uint tokencounter;
     uint maxnft=75;
     uint NFT_Price=10000;
    mapping (uint256 => string) private _uris;

    struct game {
        address P1;
        address P2;
        uint amt;
        uint nft_t1;
        uint nft_t2;
    }
    mapping (uint=>game) public GameID;
    uint gameID;



    constructor() public ERC1155("") {
        _owner = msg.sender;
        _mint (address(this), 0, 10**20, "");
        tokencounter = 1;
        gameID=0;
    }

    // Events
      event Hess_Buy(
        uint ethAMT,
        address recipient
        );
      event ex_eth_hess(
        uint ethAMT,
        address recipient
        );
      event ex_NFT(
        uint NFTid,
        address To,
        address From,
        uint buy_price
        );
      event mint_NFT(
        address TO,
        uint NFTid,
        uint amt
        );
      event mint_token(
        uint AMT
        );
      event TOKEN_staking(
        address F1,
        address F2,
        uint amt
        );
      event NFT_STAKE(
        address F1,
        address F2,
        uint nftid1,
        uint nftid2
        );
      event TOKEN_win(
        address winner,
        uint amt
        );
      event NFT_win(
        address winner,
        uint nftid1,
        uint nftid2
        );


    // Functions
      // To buy tokens from ethereum
    function buy_hess(uint ethamount)public payable{
        require(msg.value>=ethamount,"Not enough token sent");
        uint amt = (msg.value)*5;
        safeTransferFrom(address(this),msg.sender, 0, amt, "" );
        emit Hess_Buy(ethamount, msg.sender);
      }
      // To exchange tokens from ethereum

    function exchange_eth(uint hesstoken)public payable{
        require(hesstoken > 1000, " Not sufficient hesstoken sent" );
        safeTransferFrom(msg.sender, address(this), 0, hesstoken, "" );
        uint amt = (hesstoken/550);

        ((msg.sender).transfer)(amt);
        emit ex_eth_hess(amt, msg.sender);
      }
     // To Set Token URIs
    function uri(uint256 tokenId) override public view returns (string memory) {
        return(_uris[tokenId]);}
    function setTokenUri(uint256 tokenId, string memory uri) public onlyOwner {
        require(bytes(_uris[tokenId]).length == 0, "Cannot set uri twice");
        _uris[tokenId] = uri;}


    function NFT_tran(uint256 tokenId, address _to, address _from, uint amt)public{
        require(msg.sender==_from, "You are not the owner of NFT");
        require(balanceOf(_to, 0)>=amt, " Insufficent balance");
        require(balanceOf(_to, tokenId)==1, " Address does not own this NFT");
        safeTransferFrom(_to, _from, tokenId, 1, "");
        safeTransferFrom(_from, _to, 0, amt, "");
        emit ex_NFT(tokenId, _to, _from, amt);
      }
    function minttoken(uint256 Amount) public  onlyOwner{
        _mint(address(this), 0, Amount, "");
        emit mint_token(Amount);
    }

    function mintNFT( uint256 amount)public {
        require(tokencounter<=75, "All NFTs are minted");
        require(amount>=NFT_Price, "Price of NFT more than given");
        require(balanceOf(msg.sender,0)>=amount," Insufficent balance in account");
        setApprovalForAll(address(this),true);
        safeTransferFrom(msg.sender, _owner, 0, amount,"");
        _mint(msg.sender, tokencounter, 1,"");
        tokencounter=tokencounter+1;
        emit mint_NFT(msg.sender, tokencounter-1, amount);
    }



      function Token_staking(address p1, address p2, uint am1, uint am2) public {
          require(am1>99&&am2>99, "Stake amouunt more than 100");
          require( am1== am2,"Both have not staked similar amount");

          safeTransferFrom(p1, address(this), 0, am1, "0x00");
          safeTransferFrom(p2, address(this), 0, am1, "0x00");
          gameID= gameID+1;
          GameID[gameID].P1 = p1;
          GameID[gameID].P2 = p2;
          GameID[gameID].amt = am1;
          emit TOKEN_staking( p1, p2, am1);
      }
      function win_TokenStaking(uint256 _gameID, uint gstatus) public {
          require(gstatus>0&&gstatus<3, "Wrong status provided");
          address WINNER;
           if(gstatus==1){
              WINNER = GameID[_gameID].P1;

              safeTransferFrom(address(this), GameID[_gameID].P1, 0, (GameID[_gameID].amt)*2, "0x00");
          }
          else if(gstatus==2){
              WINNER = GameID[_gameID].P2;


              safeTransferFrom(address(this), GameID[_gameID].P2, 0, (GameID[_gameID].amt)*2, "0x00");
          }
          else if (gstatus==0){
              WINNER = 0x0000000000000000000000000000000000000000;

              safeTransferFrom(address(this), GameID[_gameID].P1, 0, GameID[_gameID].amt, "0x00");
              safeTransferFrom(address(this), GameID[_gameID].P2, 0, GameID[_gameID].amt, "0x00");
          }
          emit TOKEN_win(WINNER, GameID[_gameID].amt);
      }


      function NFT_staking(address p1, address p2, uint id1, uint id2) public {
          safeTransferFrom(p1, address(this), id1, 1, "0x00");
          safeTransferFrom(p1, address(this), id2, 1, "0x00");
          gameID= gameID+1;
          GameID[gameID].P1 = p1;
          GameID[gameID].P2 = p2;
          GameID[gameID].nft_t1 = id1;
          GameID[gameID].nft_t2 = id2;
          emit NFT_STAKE( p1, p2, id1, id2);
      }
      function win_NFTStaking(uint256 _gameID, uint gstatus) public {
          require(gstatus>0&&gstatus<3, "Wrong status provided");
          address WINNER;
           if(gstatus==1){
              WINNER = GameID[_gameID].P1;
              safeTransferFrom(address(this), GameID[_gameID].P1, GameID[_gameID].nft_t1, 1, "0x00");
              safeTransferFrom(address(this), GameID[_gameID].P1, GameID[_gameID].nft_t2, 1, "0x00");
          }
          else if(gstatus==2){
             WINNER = GameID[_gameID].P2;
             safeTransferFrom(address(this), GameID[_gameID].P2, GameID[_gameID].nft_t1, 1, "0x00");
             safeTransferFrom(address(this), GameID[_gameID].P2, GameID[_gameID].nft_t2, 1, "0x00");
          }
          else if (gstatus==0){
              WINNER = 0x0000000000000000000000000000000000000000;
              safeTransferFrom(address(this), GameID[_gameID].P1, GameID[_gameID].nft_t1, 1, "0x00");
              safeTransferFrom(address(this), GameID[_gameID].P2, GameID[_gameID].nft_t2, 1, "0x00");
          }
          emit NFT_win(WINNER, GameID[_gameID].nft_t1, GameID[_gameID].nft_t1);
      }

      function Get_My_MONEY() public onlyOwner{
          ((msg.sender).transfer)(address(this).balance);
      }

}
