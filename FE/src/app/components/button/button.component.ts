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
  buttonBackgroundColor!: 'green' | 'blue' | 'yellow' | 'red';
  buttonIconSVG !: string;

  onClickFoo(){
    console.log(this.buttonIconSVG)
    this.actionArrowFunction();
  }
}
