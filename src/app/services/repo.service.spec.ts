import { TestBed, inject } from "@angular/core/testing";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { RepoService } from "./repo.service";
import { IRepo, IRepoTitle } from "../model/interface";
import { environment } from "src/environments/environment";
import { of } from "rxjs/internal/observable/of";

describe("RepoService", () => {
  let repoService: RepoService;
  let httpMock: HttpTestingController;

  const reposMock: IRepo[] = [
    {
      id: 186749,
      name: "http-parser"
    },
    {
      id: 25292973,
      name: "build-containers"
    },
    {
      id: 27193779,
      name: "node"
    }
  ];
  const repoTitlesMock: IRepoTitle[] = [
    { id: 1111111, title: "ansible: remove firewalld on centos and fedora" },
    { id: 2222222, title: "ansible: reprovisioned armv7 scaleway machine" },
    { id: 3333333, title: "arm failed to do git checkout" },
    {
      id: 4444444,
      title: "node-test-known-issues, is this job used? can it be deleted?"
    },
    { id: 5555555, title: "node-test-npm, is this job used? can I delete it?" }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoService],
      imports: [HttpClientTestingModule]
    });
    repoService = TestBed.get(RepoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(repoService).toBeTruthy();
  });

  it("should return repos", inject(
    [HttpTestingController, RepoService],
    (httpMock: HttpTestingController, service: RepoService) => {
      service.getRepos().subscribe(data => {
        expect(data.length).toEqual(3);
        expect(data).toEqual(reposMock);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/orgs/nodejs/repos`);
      expect(req.request.method).toEqual("GET");
      req.flush(reposMock);
    }
  ));

  it("should return repos titles", inject(
    [HttpTestingController, RepoService],
    (httpMock: HttpTestingController, service: RepoService) => {
      const reponame = "build";
      service.getRepoDetails(reponame).subscribe(data => {
        expect(data.length).toEqual(5);
        expect(data).toEqual(repoTitlesMock);
      });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/repos/nodejs/${reponame}/issues?state=open`
      );
      expect(req.request.method).toEqual("GET");
      req.flush(repoTitlesMock);
    }
  ));

  it("should throw an error", inject(
    [HttpTestingController, RepoService],
    (httpMock: HttpTestingController, service: RepoService) => {
      const reponame = "";
      const ErrorObj = {
        type: "ERROR",
        status: 404,
        body: JSON.stringify({ color: `red` })
      };

      service.getRepoDetails(reponame).subscribe(data => {
        console.log(`in success:`, data);
        expect(of(data)).toBeTruthy();
        expect(data).not.toBeNull();
      });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/repos/nodejs/${reponame}/issues?state=open`
      );
      expect(req.request.method).toEqual("GET");
      req.flush(ErrorObj);
    }
  ));
});
