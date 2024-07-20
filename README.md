# 水平思考クイズアプリ

## 環境構築手順
ビルドして起動（バックグラウンドで起動）
```shell
docker compose up -d --build
```

ログをターミナルに出して起動
```shell
docker compose up --build
```

データベースの作成
```shell
docker compose exec app rails db:prepare
```