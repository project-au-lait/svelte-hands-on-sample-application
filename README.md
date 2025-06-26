# Svelte Hands-on Sample Application

このリポジトリは[Project Au Lait](https://aulait.dev/)が主催するSvelte + GitHub Copilot Hands-on勉強会([connpass](https://project-au-lait.connpass.com/event/359450/) / [Doorkeeper](https://project-au-lait.doorkeeper.jp/events/185521))のサンプルアプリケーションを格納しています。

## 必要なソフトウェア

サンプルアプリケーションの実行には以下のソフトウェアが必要です。

- Node.js (v.22+)
- pnpm
- VSCode

## 実行手順

サンプルアプリケーションを実行するには以下のコマンドを実行します。

```sh
git clone
cd svelte-hands-on-sample-application

pnpm i

#　以下の2つのコマンドはそれぞれ別のウィンドウ/タブで実行
pnpm json-server db.json
pnpm dev
```

コマンドを実行後、以下のURLでサンプルアプリケーションにアクセス可能です。

- 利用者向け: http://localhost:5173
- 店舗向け: http://localhost:5173/shop

