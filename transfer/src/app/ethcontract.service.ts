import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';


declare let require: any;
declare let window: any;

//let tokenAbi = require('../../../build/contracts/Payment.json');

@Injectable({
  providedIn: 'root'
})

export class EthcontractService {
  private web3Provider: null;  
  private contracts: {};
  

  private account: any = null;
  private readonly web3: any;
  private enable: any;
  
  constructor() { 
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      }
      window.web3 = new Web3(window.ethereum);
      //console.log(this.web3);
      //this.enable = this.enableMetaMaskAccount();
    }
  }
  public async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
      resolve(enable);
    }) as Promise<any>;
    return Promise.resolve(enable);
  }

  private async getAccount(): Promise<any> {    
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {       
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('getAccount service -> ');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            reject('No accounts found.');
          }
          if (err != null) {
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }


  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();    
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function(err, balance) {
        console.log('getUserBalance service -> ');
        console.log(balance);
        if (!err) {
          const retVal = {
            account: account,
            balance: balance
          };
          resolve(retVal);
        } else {
          reject({account: 'error', balance: 0});
        }
      });
    }) as Promise<any>;
  }
  
 /*  transferEther(
    _transferFrom,
    _transferTo,
    _amount,
    _remarks
  ) {
    let that = this;

    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(window.web3);

      paymentContract.deployed().then(function(instance) {
          return instance.transferFund(
            _transferTo,
            {
              from:_transferFrom,
              value:window.web3.toWei(_amount, "ether")
            });
        }).then(function(status) {
          if(status) {
            return resolve({status:true});
          }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
    });
  } */
}
