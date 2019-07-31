import { AppPage } from "./app.po";
import { browser, element, by } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  async function repoList() {
    page.navigateTo();
    browser.sleep(3000);
  }

  it("should display a list of repos", async () => {
    await repoList();
    browser.sleep(5000);
    let repos = await page.getRepos();
    expect(repos.length).toBeGreaterThan(0);
  });

  it("should display a list of title for a given repo", async () => {
    await repoList();
    let repos = await page.getRepos();
    browser.sleep(1000);
    let repo = await page.selectRepo().getText();
    await page.selectRepo().click();
    browser.sleep(4000);
    expect(repo).toBe("http-parser");
  });
});
