// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract Trade{
    address public owner;
    uint public percentCommission;

    mapping(address=>mapping(address=>uint256)) public tokens;
    mapping(uint256=>Order) public orders;
    mapping(uint256=>bool) public cancelledOrders;
    mapping(uint256=>bool) public completedOrders;
    uint256 orderId;

    struct Order{
        uint256 id;
        uint256 timestamp;
        address maker;
        address tokenToSell;
        uint amountToSell;
        address tokenToBuy;
        uint amountToBuy;
    }

    event Deposit(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );
    event Withdraw(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );
    event Ordered(
        uint256 id,
        address user,
        address tokenToSell,
        uint256 amountToSell,
        address tokenToBuy,
        uint256 amountToBuy,
        uint256 timestamp
    );
    event Cancelled(
        uint256 id,
        address user,
        address tokenToSell,
        uint256 amountToSell,
        address tokenToBuy,
        uint256 amountToBuy,
        uint256 timestamp
    );
    event Traded(
        uint256 id,
        address maker,
        address taker,
        address tokenToSell,
        uint256 amountToSell,
        address tokenToBuy,
        uint256 amountToBuy,
        uint256 timestamp
    );

    constructor(address _owner, uint _commission){
        owner=_owner;
        percentCommission=_commission; 
    }

    function depositToken(address _token, uint256 _amount) public{
        require(Token(_token).transferFrom(msg.sender,address(this),_amount));
        unchecked{
        tokens[_token][msg.sender]+=_amount;
        }
        emit Deposit(_token,msg.sender,_amount,tokens[_token][msg.sender]);
    }

    function balanceOf(address _token,address _user) public view returns(uint256){
        return tokens[_token][_user];
    }
   
    function withdrawToken(address _token, uint256 _amount) public{
        require(tokens[_token][msg.sender]>=_amount,"Insufficient deposit amount");
        Token(_token).transfer(msg.sender,_amount);
        unchecked{
        tokens[_token][msg.sender]-=_amount;
        }
        emit Withdraw(_token,msg.sender,_amount,tokens[_token][msg.sender]);
    }
    
    function makeOrder(address _tokenToSell, uint256 _amountToSell,
                       address _tokenToBuy,uint256 _amountToBuy) public{
      unchecked {
        orderId++;
      }

      orders[orderId]=Order(orderId,block.timestamp,msg.sender,_tokenToSell,
      _amountToSell,_tokenToBuy,_amountToBuy);
      emit Ordered(orderId,msg.sender,_tokenToSell,_amountToSell,_tokenToBuy,_amountToBuy,block.timestamp);
    }

    function cancelOrder(uint256 _id) public{
       require(_id>0 && _id<=orderId,"Invalid order id");
       Order storage _order = orders[_id];
       require(_order.maker==msg.sender,"Invalid order maker");
       cancelledOrders[_id]=true;
       emit Cancelled(_id,msg.sender,_order.tokenToSell,_order.amountToSell,_order.tokenToBuy,_order.amountToBuy,block.timestamp);
    }

    function confirmOrder(uint256 _id) public{
        require(_id>0 &&_id<=orderId,"Invalid order id");
        require(!cancelledOrders[_id],"Order is cancelled");
        require(!completedOrders[_id],"Order is completed");

        Order storage _order = orders[_id];
        
        _trade(_order.maker,_order.tokenToSell,_order.amountToSell,_order.tokenToBuy,_order.amountToBuy);
        completedOrders[_id]=true;
    }

    function _trade(address _maker, address _tokenToSell,
                     uint256 _amountToSell, address _tokenToBuy, uint256 _amountToBuy) internal{

        uint256 _commissionAmount=(_amountToBuy*percentCommission)/100;

        require(tokens[_tokenToBuy][_maker]>=(_amountToBuy+_commissionAmount),"Insufficient deposit amount");
        unchecked{
        tokens[_tokenToBuy][_maker]+=_amountToBuy;
        tokens[_tokenToBuy][msg.sender]-=(_amountToBuy+_commissionAmount);
        }

        require(tokens[_tokenToSell][msg.sender]>=_amountToSell,"Insufficient deposit amount");
        unchecked{
        tokens[_tokenToSell][msg.sender]+=_amountToSell;
        tokens[_tokenToSell][_maker]-=_amountToSell;
        }
        
        unchecked{
        tokens[_tokenToBuy][owner]+=_commissionAmount;
        }

        emit Traded(orderId,_maker,msg.sender,_tokenToSell,_amountToSell,_tokenToBuy,_amountToBuy,block.timestamp);
    }

}