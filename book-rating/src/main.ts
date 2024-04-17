import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));



  ////////////

export class Customer {

  // Constructor Shorthand
  constructor(public id: number) {

    console.log(this.id);

    setTimeout(() => {
      console.log('ID:', this.id);
    }, 2000);
  }

  /*id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  private fooBar(arg: number): string {
    console.log(this.id);
    return '';
  }
}


const myCustomer = new Customer(3);



const foo = function (arg: number): number {
  return arg + 1;
}

const foo2 = (arg: number): number => arg + 1;
