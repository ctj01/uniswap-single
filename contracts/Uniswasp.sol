// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract Swap {
    mapping(string => address) tokens;

    ISwapRouter public immutable swapRouter =
        ISwapRouter(0x0640E42Fb95D07070A93BF103C98b63f64A81eaA);

    constructor() {
        tokens["LINK"] = 0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5;
        tokens["USDT"] = 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0;
    }

    function requireToken(string memory token) internal view {
        require(tokens[token] != address(0), "Token not supported");
    }
    // we will set the pool fee to 0.3%.
    uint24 public constant poolFee = 3000;

    /// @notice swapExactInputSingle swaps a fixed amount of DAI for a maximum possible amount of TokenOut
    /// using the tokenIn/TokenOut 0.3% pool by calling `exactInputSingle` in the swap router.
    /// @dev The calling address must approve this contract to spend at least `amountIn` worth of its TokenIn for this function to succeed.
    /// @param amountIn The exact amount of DAI that will be swapped for WETH9.
    /// @return amountOut The amount of WETH9 received.
    function swapExactInputSingle(
        uint256 amountIn,
        string memory tokenIn,
        string memory tokenOut
    ) external returns (uint256 amountOut) {
        requireToken(tokenIn);
        requireToken(tokenOut);
        // msg.sender must approve this contract
        address tokenInAddress = tokens[tokenIn];
        address tokenOutAddress = tokens[tokenOut];
       
        IERC20(tokenInAddress).approve(address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenInAddress,
                tokenOut: tokenOutAddress,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

    function swapExactOutputSingle(
        uint256 amountOut,
        uint256 amountInMaximum,
        string memory tokenIn,
        string memory tokenOut
    ) external returns (uint256 amountIn) {
        requireToken(tokenIn);
        requireToken(tokenOut);
        // msg.sender must approve this contract
        address tokenInAddress = tokens[tokenIn];
        address tokenOutAddress = tokens[tokenOut];
        IERC20(tokenInAddress).approve(address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter
            .ExactOutputSingleParams({
                tokenIn: tokenInAddress,
                tokenOut: tokenOutAddress,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp + 60,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

        amountIn = swapRouter.exactOutputSingle(params);

        if (amountIn < amountInMaximum) {
            // Transfer the remaining tokenIn back to the caller.
            IERC20(tokenInAddress).approve(address(swapRouter), 0);
            IERC20(tokenInAddress).transfer(
                msg.sender,
                amountInMaximum - amountIn
            );
        }
    }

    function balanceOf(string memory token) external view returns (uint256) {
        requireToken(token);
        address tokenAddress = tokens[token];
        return IERC20(tokenAddress).balanceOf(address(this));
    }
}
