/*

  Copyright 2017 Loopring Project Ltd (Loopring Foundation).

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
pragma solidity 0.5.2;


/// @title ITokenRegistry
/// @author Brecht Devos - <brecht@loopring.org>
contract ITokenRegistry {

    // Q(dongw): we may need to use the concept of 'bips', 100 bips == 1 percentage. The base
    // of bips is always 10000 (100%)
    // Burn rates
    uint16 public constant BURNRATE_TIER1            =                       25; // 2.5%
    uint16 public constant BURNRATE_TIER2            =                  15 * 10; //  15%
    uint16 public constant BURNRATE_TIER3            =                  30 * 10; //  30%
    uint16 public constant BURNRATE_TIER4            =                  50 * 10; //  50%

    // Fee
    uint public constant TOKEN_REGISTRATION_FEE_IN_LRC_BASE           = 100 ether;
    uint public constant TOKEN_REGISTRATION_FEE_IN_LRC_DELTA          = 10 ether;

    uint16 public constant BURN_BASE_PERCENTAGE           =                 100 * 10; // 100%
    // Cost of upgrading the tier level of a token in a percentage of the total LRC supply
    uint16 public constant TIER_UPGRADE_COST_PERCENTAGE  =                         1; // 0.1%

    // General
    uint public constant MAX_NUM_TOKENS                               = 2 ** 12;
    uint public constant TIER_UPGRADE_DURATION                        = 365 days;

    event TokenTierUpgraded(
        address indexed addr,
        uint            tier
    );

    function getTokenID(
        address tokenAddress
        )
        public
        view
        returns (uint16);

    function getTokenAddress(
        uint16 tokenID
        )
        external
        view
        returns (address);

    function getBurnRate(
        uint24 tokenID
        )
        public
        view
        returns (uint16 burnRate);

}
