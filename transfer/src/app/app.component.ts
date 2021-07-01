import { Component } from '@angular/core';
import { EthcontractService } from './ethcontract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi primer DApp';
  accounts:any;
  transferFrom = '0x0';
  balance ='0 ETH';
  transferTo='';
  amount=0;
  remarks='';
  conected: Boolean = false;

  constructor( private ethcontractService: EthcontractService ){
    this.getAccountAndBalance()
  }

  getAccountAndBalance = () => {
    const that = this;
    this.ethcontractService.getUserBalance().
    then(function(retAccount: any) {
      that.transferFrom = retAccount.account;
      that.balance = retAccount.balance;  
      if(that.transferFrom !== '0x0')  {
        that.conected = true;
      }  
    }).catch(function(error) {
      console.log(error);
    });
  }

  connectWallet(){
    const that = this;
    this.ethcontractService.enableMetaMaskAccount().
    then(function(connected: any) {
      if(connected !== '0x0')  {
        that.getAccountAndBalance();
      }       
    }).catch(function(error) {
      console.log(error);
    });
   }
}
