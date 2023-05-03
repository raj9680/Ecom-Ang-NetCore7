import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

const route: Routes = [
  {path: '',  component: CheckoutComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
