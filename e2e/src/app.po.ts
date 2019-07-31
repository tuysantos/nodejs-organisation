import { browser, by, element } from "protractor";
import { Driver } from "selenium-webdriver/edge";

export class AppPage {
  navigateTo() {
    return browser.get("/repo");
  }

  getRepoTitle() {
    return element(by.css("app-root h1")).getText();
  }

  getRepos() {
    return browser.driver.findElements(by.css("ul li")).then(elems => {
      return elems;
    });
  }

  selectRepo() {
    return element(by.css("ul li"));
  }
}
