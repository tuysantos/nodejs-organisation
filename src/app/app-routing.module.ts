import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { RepoComponent } from "./components/repo/repo.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "repo", component: RepoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
