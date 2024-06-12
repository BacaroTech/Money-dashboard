import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Error404Component } from './components/error404/error404.component';
import { AddFlowComponent } from './components/add-flow/add-flow.component';
import { CashReviewComponent } from './components/cash-review/cash-review.component';
import { HomeComponent } from './components/home/home.component';
import { EndMonthComponent } from './components/end-month/end-month.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SingleDocumentComponent } from './components/single-document/single-document.component';

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: HomeComponent},
  {path: "addFlow", component: AddFlowComponent},
  {path: "review", component: CashReviewComponent},
  {path: "end", component: EndMonthComponent},
  {path: "documents", component: DocumentsComponent},
  {path: "document", children: [
    {path: "**", component: SingleDocumentComponent}
  ]},
  {path: "404", component: Error404Component},
  {path: "**", redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
