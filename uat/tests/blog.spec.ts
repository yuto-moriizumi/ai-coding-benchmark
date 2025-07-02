import { test, expect, Page } from "@playwright/test";

test.describe.serial("Blog app", () => {
  test("should reset all posts", async ({ page }: { page: Page }) => {
    // トップページにアクセス
    await page.goto("http://localhost:3000/");

    // "Reset data"ボタンをクリック
    await page.click("text=Reset data");

    // 記事が存在しないことを確認
    await expect(page.locator("article")).toHaveCount(0);
  });

  test("should allow a user to create a new post", async ({
    page,
  }: {
    page: Page;
  }) => {
    // トップページにアクセス
    await page.goto("http://localhost:3000/");

    // "my new post"という記事が存在しないことを確認
    await expect(page.locator("body")).not.toContainText("my new post");

    // "Add new article"ボタンをクリック
    await page.click("text=Add new article");

    // /new-post画面に遷移したことを確認
    await expect(page).toHaveURL("http://localhost:3000/new-post");

    // フォームに入力
    await page.locator("#title").fill("my new post");
    await page.locator("#content").fill("my content");

    // "Publish Post"ボタンをクリック
    await page.click("text=Publish Post");

    // posts/任意の数字に遷移していることを確認
    await expect(page).toHaveURL(/http:\/\/localhost:3000\/posts\/\d+/);

    // ページのh1テキストの内容が「my new post」であることを確認
    await expect(page.locator("h1")).toHaveText("my new post");

    // articleタグの中身に「my content」が含まれることを確認
    await expect(page.locator("article")).toContainText("my content");

    // トップページに戻る
    await page.click("text=Back to Blog");

    // トップページに遷移したことを確認
    await expect(page).toHaveURL("http://localhost:3000/");

    // 追加した記事がトップページに表示されていることを確認
    await expect(page.locator("body")).toContainText("my new post");
  });

  test("should allow a user to add a comment to a post", async ({
    page,
  }: {
    page: Page;
  }) => {
    // 記事ページに直接アクセス
    await page.goto("http://localhost:3000/posts/1");

    // "This is a great post!"というコメントが存在しないことを確認
    await expect(page.locator("body")).not.toContainText(
      "This is a great post!"
    );

    // コメントフォームに入力
    await page.getByLabel("Your Name").fill("John Doe");
    await page.getByLabel("Comment").fill("This is a great post!");

    // "Submit"ボタンをクリック
    await page.click("text=Submit");

    // フォームが空になっていることを確認
    await expect(page.getByLabel("Your Name")).toBeEmpty();
    await expect(page.getByLabel("Comment")).toBeEmpty();

    // コメントが表示されていることを確認
    await expect(page.locator("body")).toContainText("John Doe");
    await expect(page.locator("body")).toContainText("This is a great post!");
  });
});
