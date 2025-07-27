import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  inputs: ['buttonText', 'actionArrowFunction', 'buttonBackgroundColor', 'buttonIconSVG']
})
export class ButtonComponent {

  buttonText!: string;
  actionArrowFunction!: Function;
  buttonBackgroundColor: 'green' | 'blue' | 'yellow' | 'red' = 'blue';
  buttonIconSVG !: string;

  private colorClasses = {
    blue: {
      base: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    },
    red: {
      base: 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
    },
    green: {
      base: 'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
    },
    yellow: {
      base: 'text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800',
    }
  };

  public getButtonColorClasses(): string {
    const colorClassSelected: string = this.colorClasses[this.buttonBackgroundColor]?.base || this.colorClasses.blue.base;
    return `${colorClassSelected} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2`;
  }

  onClickFoo(){
    console.log(this.buttonIconSVG)
    this.actionArrowFunction();
  }
}
