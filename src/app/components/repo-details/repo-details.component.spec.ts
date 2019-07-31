import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { RepoDetailsComponent } from "./repo-details.component";
import { IRepoTitle } from "src/app/model/interface";

describe("RepoDetailsComponent", () => {
  let component: RepoDetailsComponent;
  let fixture: ComponentFixture<RepoDetailsComponent>;
  let repoTitleData: IRepoTitle[] = [];
  let defaultValues: DefaultValues;

  class DefaultValues {
    setDefaultMockData(): void {
      if (repoTitleData.length > 0) {
        return;
      }

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
      declarations: [RepoDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    defaultValues = new DefaultValues();
    defaultValues.setDefaultMockData();
    fixture = TestBed.createComponent(RepoDetailsComponent);
    component = fixture.componentInstance;
    component.repoDetails = repoTitleData;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a list of titles", () => {
    expect(component.repoDetails.length).toBe(5);
  });

  it("should create a list of li tags", () => {
    const lElement: DebugElement[] = fixture.debugElement.queryAll(
      By.css("li")
    );
    fixture.detectChanges();
    expect(lElement.length).toBe(5);
  });
});
