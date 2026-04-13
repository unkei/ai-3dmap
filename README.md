# ai-3dmap

Google Maps JavaScript API の 3D view（tilt / heading）を試せるシンプルな Web アプリです。

## ローカル実行

```bash
python -m http.server 8080
# http://localhost:8080/?key=YOUR_API_KEY を開く
```

## API Key の用意

- Demo キー発行ページ: https://mapsplatform.google.com/maps-demo-key/
- このリポジトリでは API キーをハードコードせず、URL クエリ `?key=...` で受け取ります。
- 本番利用では **Google Cloud Console で制限付きキー**を発行してください。

## GitHub Pages デプロイ

`.github/workflows/deploy-pages.yml` により、`main` ブランチへの push 時に Pages へデプロイします。

### 有効化手順

1. GitHub リポジトリの **Settings > Pages** を開く。
2. Build and deployment の Source を **GitHub Actions** にする。
3. `main` へマージ後、Actions の `Deploy static site to GitHub Pages` が実行されます。

## 注意

- Google Maps JavaScript API の利用には課金設定が必要な場合があります。
- 3D 表示品質はブラウザ・GPU・地形データ対応状況に依存します。
