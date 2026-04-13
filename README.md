# ai-3dmap

Google Maps JavaScript API の **3D Maps（`maps3d` ライブラリ）** を使うサンプルです。
`<gmp-map-3d>` カスタム要素で 3D マップを表示します。

## ローカル実行

```bash
python -m http.server 8080
# http://localhost:8080/?key=YOUR_API_KEY を開く
```

## API Key の用意

- Demo キー発行ページ: https://mapsplatform.google.com/maps-demo-key/
- URL クエリ `?key=...` で API キーを渡します。
- 読み込み URL は `v=beta&libraries=maps3d` を使用しています。

## 実装内容

- 公式 Get Started 方式に合わせた `<gmp-map-3d>` の利用
- 「東京駅へ移動」ボタンで 3D カメラ位置を設定
- 「自動回転」ボタンで heading を連続変更（再クリックで停止）

## 参考ドキュメント

- https://developers.google.com/maps/documentation/javascript/3d/overview
- https://developers.google.com/maps/documentation/javascript/3d/get-started
