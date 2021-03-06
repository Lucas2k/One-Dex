import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { environment } from '../../environments/environment';


declare let require: any;
declare let window: any;

//let tokenAbi = require('../../../build/contracts/Payment.json');
let nftColorAbi = require('../../../../build/contracts/NftColor.json');

@Injectable({
  providedIn: 'root'
})

export class EthcontractService {  

  private account: any = null;
  private readonly web3: any;
  //private enable: any;
  
  constructor() { 
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider(environment.TESNET_BSC);
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
  
  public async mintColor(colorStr): Promise<any> {
    const  colorBytes = this.colorStringToBytes(colorStr);
    return  new Promise((resolve, reject) => {
      var MyContract = window.web3.eth.contract(nftColorAbi);
      var myContractInstance = MyContract.at("0xF8da2844989F3FbFc92271F53E0af0666b82b4DC");
 
      myContractInstance.deployed().then(function(instance) {
        return instance.mint(colorBytes);
      }).then(function(status) {
        if(status) {
          return resolve({status:true});
        }
      }).catch(function(error){
        console.log(error);

        return reject("Error mint nft color");
      });

    }) as Promise<any>;
  }

   colorStringToBytes(str) {
     console.log(window.web3);
     
    if (str.length !== 7 || str.charAt(0) !== '#') {
      throw new Error('invalid color string');
    }
    const hexStr = '0x' + str.substring(1);
    return window.web3.utils.hexToBytes(hexStr);
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
