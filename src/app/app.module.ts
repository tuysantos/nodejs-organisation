import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RepoComponent } from "./components/repo/repo.component";
import { RepoDetailsComponent } from "./components/repo-details/repo-details.component";
import { HomeComponent } from "./components/home/home.component";
import { RouterModule } from "@angular/router";
import { RequestCacheService } from "./services/request-cache.service";
import { CachingInterceptor } from "./services/caching-interceptor";
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    RepoComponent,
    RepoDetailsComponent,
    HomeComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "**", redirectTo: "/home" }
    ])
  ],
  exports: [RouterModule],
  providers: [
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
