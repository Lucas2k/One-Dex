import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EthcontractService } from './services/ethcontract.service';
import { NftColorComponent } from './components/nft-color/nft-color.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NftColorComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'nft', component: NftColorComponent },
    ])
  ],
  providers: [EthcontractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
