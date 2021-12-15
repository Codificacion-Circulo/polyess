# Polyess



Polyess is one stop for all chess lovers and web3 enthusiasts. 
It is a combination of decentralized gaming, NFT marketplaces, and the classic and one of the oldest game "Chess".
It gives anyone a platform to not only get interested in chess but also blockchain and Web3. Our tech stack is so extensive that users have everything they could wish for in one site.  
Some features are:- 
💸In-Game currency: Polyess is the play-to-earn game so we created an in-game currency **HT token** which you can buy and exchange for Matic.
📈📉NFT-Marketplace: We built an NFT marketplace and handmade 35 awesome NFTs of legendary and famous chess players. (MarketPlace is on App and Web) 
⚔️🗡Visual NFT Battle: Those NFTs are not just art they are an avatar in games of NFT staking where you can use them as the king giving you the personalized experience you always wanted.  
♟♟3 Game modes: Free-to-play, Token Betting, and NFT staking. Bet on your wits and your Hess tokens or your NFTs and winner takes all tokens wither it.  Stake NFTs and take part in exclusive NFT battles with your friends NFT too. 
🪧🎯Leaderboard:- It gives the indication and promotes higher engagement because the more games you play the better you get, and higher is your rank. 
👨🏼‍⚕️🧑🏽‍🎓User Profile: You get your user profile with all the stats like games won, lost, NFTs owned, Hess Tokens in your account, with your username.
 📹🕹Video Chat: While playing you can video chat with your opponent which makes it more fun while playing and gives a better experience. 
And we haven't even talked about the user experience and graphic experience of the website, android.



## Installation


1. Run the development console.
    ```javascript
    truffle develop
    ```

2. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

3. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm run start
    ```

4. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

5. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run test
    ```

6. To build the application for production, use the build script. A production build will be in the `client/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```

## FAQ

* __How do I use this with the Ganache-CLI?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 29 of `client/src/utils/getWeb3.js`.

* __Where is my production build?__

    The production build will be in the `client/build` folder after running `npm run build` in the `client` folder.

* __Where can I find more documentation?__

    This box is a marriage of [Truffle](http://truffleframework.com/) and a React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start!
