import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-dark',
  templateUrl: './to-dark.component.html',
  styleUrls: ['./to-dark.component.css']
})
export class ToDarkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  switchMode(): void {
    if(document.getElementById("toggleMode")?.classList.contains("bg-gray-200")){
      document.getElementById("mydashboard")?.classList.add("dark");
      document.getElementById("home")?.classList.add("dark");
      document.getElementById("toggleMode")?.classList.remove("bg-gray-200");
    } else {
      document.getElementById("mydashboard")?.classList.remove("dark");
      document.getElementById("home")?.classList.remove("dark");
      document.getElementById("toggleMode")?.classList.add("bg-gray-200");
    }
  }

}
