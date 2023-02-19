//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;


contract Calculator
{
    constructor()
    {
        
    }

    function add(uint256[] memory numbers) public pure returns(uint256)
    {
        uint256 sum = 0;
        for(uint256 i=0; i< numbers.length; i++)
        {
            sum += numbers[i];
        }

        return sum;
    }

    function substract(uint256[] memory numbers) public pure returns(uint256)
    {
        uint256 difference = numbers[0];
        for(uint256 i=1; i< numbers.length; i++)
        {
            difference -= numbers[i];
        }

        return difference;
    }

    function multiply(uint256[] memory numbers) public pure returns(uint256)
    {
        uint256 product = 1;
        for(uint256 i=0; i< numbers.length; i++)
        {
            product *= numbers[i];
        }

        return product;
    }

    function divide(uint256[] memory numbers) public pure returns(uint256)
    {
        uint256 quotient = numbers[0];
        for(uint256 i=1; i< numbers.length; i++)
        {
            require(numbers[i] != 0, "Cannot divide by zero");
            quotient /= numbers[i];
        }

        return quotient;
    }

    receive() external payable {}
    fallback() external payable {}
}