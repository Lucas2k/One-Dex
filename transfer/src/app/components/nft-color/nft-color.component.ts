import { Component, OnInit } from '@angular/core';
import { EthcontractService } from 'src/app/services/ethcontract.service';

@Component({
  selector: 'app-nft-color',
  templateUrl: './nft-color.component.html',
  styleUrls: ['./nft-color.component.css']
})
export class NftColorComponent  {

  colors: any = ['#DD3C1A', '#81DD1A']

  constructor(private ethcontractService: EthcontractService) { }

  createNftColor(){
    this.ethcontractService.mintColor('#DD3C1A')
  }

}
