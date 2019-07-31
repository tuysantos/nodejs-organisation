import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { RepoComponent } from "./repo.component";
import { LoadingComponent } from "../loading/loading.component";
import { RepoDetailsComponent } from "../repo-details/repo-details.component";
import { IRepo, IRepoTitle } from "src/app/model/interface";
import { of, Observable } from "rxjs";
import { By } from "@angular/platform-browser";
import { RepoService } from "src/app/services/repo.service";

describe("RepoComponent", () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;
  let repoData: IRepo[] = [];
  let repoTitleData: IRepoTitle[] = [];
  let defaultValues: DefaultValues;

  class repoServiceMock {
    getRepos(): Observable<IRepo[]> {
      return of(this.getRepoMockData());
    }

    getRepoDetails(reponame: string): Observable<IRepoTitle[]> {
      return of(this.getRepoTitleMockData());
    }

    getRepoMockData(): IRepo[] {
      return repoData;
    }

    getRepoTitleMockData(): IRepoTitle[] {
      return repoTitleData;
    }
  }

  class DefaultValues {
    setDefaultMockData(): void {
      if (repoData.length > 0) {
        return;
      }

      repoData[repoData.length] = { id: 186749, name: "http-parser" };
      repoData[repoData.length] = {
        id: 25292973,
        name: "build-containers"
      };
      repoData[repoData.length] = {
        id: 27193779,
        name: "node"
      };

      repoTitleData[repoTitleData.length] = {
        id: 1111111,
        title: "ansible: remove firewalld on centos and fedora"
      };
      repoTitleData[repoTitleData.length] = {
        id: 2222222,
        title: "ansible: reprovisioned armv7 scaleway machine"
      };
      repoTitleData[repoTitleData.length] = {
        id: 3333333,
        title: "arm failed to do git checkout"
      };
      repoTitleData[repoTitleData.length] = {
        id: 4444444,
        title: "node-test-known-issues, is this job used? can it be deleted?"
      };
      repoTitleData[repoTitleData.length] = {
        id: 5555555,
        title: "node-test-npm, is this job used? can I delete it?"
      };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepoComponent, LoadingComponent, RepoDetailsComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [{ provide: RepoService, useClass: repoServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    defaultValues = new DefaultValues();
    defaultValues.setDefaultMockData();
    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.componentInstance;
    component.loadRepos();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a list of repos", () => {
    expect(component.repos.length).toBe(3);
    expect(component.repos[0].name).toEqual("http-parser");
  });

  it("should return a list of titles", () => {
    component.getRepoTitles("http-parser");
    expect(component.repoDetails.length).toBe(5);
    expect(component.selected).toEqual("http-parser");
    expect(component.repoDetails[0].title).toEqual(
      "ansible: remove firewalld on centos and fedora"
    );
  });

  it("should create a list of li tags", () => {
    const lElement: DebugElement[] = fixture.debugElement.queryAll(
      By.css("li")
    );
    fixture.detectChanges();
    expect(lElement.length).toBe(3);
  });
});
