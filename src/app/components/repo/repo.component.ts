import { Component, OnInit, OnDestroy } from "@angular/core";
import { RepoService } from "src/app/services/repo.service";
import { Subscription, Observable } from "rxjs";
import { IRepo, IRepoTitle } from "src/app/model/interface";
import { take, map } from "rxjs/operators";

@Component({
  selector: "app-repo",
  templateUrl: "./repo.component.html",
  styleUrls: ["./repo.component.scss"]
})
export class RepoComponent implements OnInit, OnDestroy {
  sub: Subscription;
  repos: IRepo[] = [];
  repoDetails: IRepoTitle[] = [];
  selected: string = "";

  constructor(private repoService: RepoService) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadRepos();
    }, 500);
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  loadRepos(): void {
    this.sub = this.repoService.getRepos().subscribe((items: IRepo[]) => {
      this.repos = items;
    });
  }

  getRepoTitles(reponame: string): void {
    this.selected = reponame;
    this.repoDetails = [];
    this.repoService
      .getRepoDetails(reponame)
      .pipe(take(1))
      .subscribe((items: IRepoTitle[]) => {
        this.repoDetails = items;
      });
  }

  trackByFn(index, item) {
    return index;
  }
}
