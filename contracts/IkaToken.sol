pragma solidity ^0.6.0;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface ERC20Interface {
    
    function totalSupply() external view returns (uint256);

    function balanceOf(address tokenOwner) external view returns (uint256);
    
	function allowance(address tokenOwner, address spender) external view returns (uint256);

    function transfer(address to, uint256 tokens) external returns (bool);
    
	function approve(address spender, uint256 tokens) external returns (bool);

    function transferFrom (address from, address to, uint256 tokens) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 tokens);
    
    event Approval(address indexed tokenOwner, address indexed spender, uint256 tokens);

}

contract IkaToken is ERC20Interface {
    
    string public name;
    string public symbol;
    uint8 public decimals;
    
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    constructor() public {
        name = "IkaToken";
        symbol = "IKA";
        decimals = 18;
        
        _totalSupply = 100000000000000000000000000;
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    
    //Envoie le nombre total de tokens créés
    function totalSupply() public view override returns (uint256){
        return _totalSupply;
    }
    
    //Récupérer le nombre de token detenus par une adresse donnée
    function balanceOf(address tokenOwner) public view override returns (uint256) {
        return _balances[tokenOwner];
    }
    
    //Retourne le montant restant que spender doit dépenser on behalf du priopiétaire, par défaut c'est zéro
    function allowance(address tokenOwner, address spender) public view override returns (uint256){
        return _allowances[tokenOwner][spender];
    }
    
    function approve(address spender, uint256 tokens) public virtual override returns (bool){
        _allowances[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    
    //Permet au priopiétaire du contrat de transférer un nombre de tokens à une autre addresse
    function transfer(address to, uint256 tokens) public virtual override returns (bool){
        _balances[msg.sender] = SafeMath.sub(_balances[msg.sender], tokens);
        _balances[to] = SafeMath.add(_balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    
    //Permet au priopiétaire du contrat de transférer un nombre de tokens d'une addresse donnée à une autre addresse
    function transferFrom (address from, address to, uint256 tokens) public virtual override returns (bool){
        _balances[from] = SafeMath.sub(_balances[from], tokens);
        _allowances[from][msg.sender] = SafeMath.sub(_allowances[from][msg.sender], tokens);
        _balances[to] = SafeMath.add(_balances[to], tokens);
        emit Transfer(from, to, tokens);
        return true;
    }
}