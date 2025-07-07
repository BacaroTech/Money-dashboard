import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { CashReviewComponent } from './pages/cash-review/cash-review.component';
import { HomeComponent } from './pages/home/home.component';
import { EndMonthComponent } from './pages/end-month/end-month.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SingleDocumentComponent } from './pages/single-document/single-document.component';
import { FormFlowComponent } from './pages/form-flow/form-flow.component';
import { ModifyEndMonthComponent } from './pages/modify-end-month/modify-end-month.component';
import { ModifyFlowComponent } from './pages/modify-flow/modify-flow.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
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
