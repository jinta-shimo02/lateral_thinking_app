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

railsのサーバーのみ立ち上げ
```shell
※bin/devでrailsを立ち上げると、binding.irbなどでデバックできない問題について
bin/dev -c all=1,web=0 でrails以外起動して、別ターミナルでbin/rails s すると、Procfile.devに書かれた内容のうち、webだけ切り分けて立ち上げることができる。
こうすることで、rails sのターミナルでbinding.irbなどのデバックができるようになる。
```
