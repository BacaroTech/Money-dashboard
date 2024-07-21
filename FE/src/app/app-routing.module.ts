import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Error404Component } from './components/error404/error404.component';
import { CashReviewComponent } from './components/cash-review/cash-review.component';
import { HomeComponent } from './components/home/home.component';
import { EndMonthComponent } from './components/end-month/end-month.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SingleDocumentComponent } from './components/single-document/single-document.component';
import { FormFlowComponent } from './components/form-flow/form-flow.component';
import { ModifyEndMonthComponent } from './components/modify-end-month/modify-end-month.component';
import { ModifyFlowComponent } from './components/modify-flow/modify-flow.component';

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: HomeComponent},
  {path: "addFlow", component: FormFlowComponent},
  {path: "review", component: CashReviewComponent},
  {path: "end", component: EndMonthComponent},
  {path: "documents", component: DocumentsComponent},
  {path: "document", children: [
    {path: "**", component: SingleDocumentComponent}
  ]},
  {path: "modify", children: [
    {path: "**", component: ModifyEndMonthComponent}
  ]},
  {path: "modifyFlow", children: [
    {path: "**", component: ModifyFlowComponent}
  ]},
  {path: "404", component: Error404Component},
  {path: "**", redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
