import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { IRepoTitle } from "src/app/model/interface";

@Component({
  selector: "app-repo-details",
  templateUrl: "./repo-details.component.html",
  styleUrls: ["./repo-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoDetailsComponent implements OnInit {
  @Input() repoDetails: IRepoTitle[] = [];
  constructor() {}

  ngOnInit() {}
}
