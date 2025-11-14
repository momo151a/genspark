# CareMé Beauty Reviews - React + Firebase

React 19、Vite、Firebaseで構築されたモダンな美容パウダーレビュープラットフォームです。ユーザーは製品レビューや画像を投稿し、ブランドごとの評価を閲覧できます。

## 🚀 プロジェクト概要

- フロントエンド: React + Vite によるシングルページアプリケーション
- バックエンド: Firebase（Authentication、Firestore、Storage、Hosting）
- CI/CD: GitHub Actions での自動ビルド・デプロイ
- デザイン: CSS変数とカスタムCSSによるレスポンシブ対応

## ✅ 進捗状況

### 完了したタスク

- ✅ Firebaseプロジェクトの設定（firestore.rules、storage.rules、indexes）
- ✅ 環境変数のセットアップ
- ✅ Firebase SDKの初期化
- ✅ React Routerによる基本ルート構成
- ✅ コアサービス（認証、レビュー、製品、ストレージ）
- ✅ 認証コンテキストとカスタムフック
- ✅ 共通コンポーネント（Header、Footer、Modal、Toast、Loading）
- ✅ グローバルスタイルとCSS変数
- ✅ プロジェクトフォルダ構造の整備

### 今後の予定

1. Firebase Consoleでの各種機能設定
2. `.env`ファイルにFirebase認証情報を追加
3. Firestoreルールとインデックスのデプロイ
4. レビュー関連UIコンポーネントの拡張
5. 管理者向け機能や分析ビューの実装
6. パフォーマンス計測とアクセシビリティ改善

## 📋 前提条件

- Node.js 18以上とnpm
- Firebase CLI: `npm install -g firebase-tools`
- Firebaseアカウントとプロジェクト

## 🔧 インストール

1. **リポジトリのクローンと依存関係のインストール:**

```bash
cd genspark
npm install
```

2. **Firebaseの設定:**

Firebase Console → プロジェクトの設定 → 全般 からFirebase設定を取得してください。

`.env`ファイルにFirebase認証情報を更新:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=kutikomi-f1e8b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=kutikomi-f1e8b
VITE_FIREBASE_STORAGE_BUCKET=kutikomi-f1e8b.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. **Firebaseサービスの有効化:**

Firebase Consoleで以下を有効化してください:

- Authentication（メール/パスワード）
- Firestore Database
- Cloud Storage

4. **Firebaseルールとインデックスのデプロイ:**

```bash
firebase login
firebase use kutikomi-f1e8b
firebase deploy --only firestore:rules,storage:rules,firestore:indexes
```

## 🏃 プロジェクトの実行

### 開発モード

```bash
npm run dev
```

[http://localhost:5173](http://localhost:5173) を開いてください。

### 本番ビルド

```bash
npm run build
```

### 本番ビルドのプレビュー

```bash
npm run preview
```

### Firebase Hostingへのデプロイ

```bash
npm run build
firebase deploy --only hosting
```

## 📁 プロジェクト構造

```
genspark/
├── src/
│   ├── components/           # Reactコンポーネント
│   │   ├── common/          # 共通コンポーネント
│   │   ├── auth/            # 認証関連コンポーネント
│   │   ├── reviews/         # レビュー関連コンポーネント
│   │   └── products/        # 製品関連コンポーネント
│   │
│   ├── pages/               # ページコンポーネント
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── contexts/            # Reactコンテキスト
│   │   └── AuthContext.jsx  # グローバル認証状態
│   │
│   ├── hooks/               # カスタムReactフック
│   │   ├── useToast.js
│   │   └── useFirestore.js
│   │
│   ├── services/            # Firebaseサービスラッパー
│   │   ├── auth.service.js
│   │   ├── reviews.service.js
│   │   ├── products.service.js
│   │   └── storage.service.js
│   │
│   ├── utils/               # ヘルパー関数
│   ├── firebase.js          # Firebase初期化
│   ├── App.jsx              # ルートコンポーネント
│   └── main.jsx             # エントリーポイント
│
├── public/                  # 静的アセット
├── firestore.rules          # Firestoreセキュリティルール
├── storage.rules            # Storageセキュリティルール
├── firestore.indexes.json   # Firestoreインデックス
├── firebase.json            # Firebase設定
└── package.json
```

## 🔐 Firebaseセキュリティ

### Firestoreルール

- ユーザーは公開プロフィールを読み取り可能
- ユーザーは自分のプロフィールのみ編集可能
- レビューは公開（閲覧可能）だが、作成者だけが編集・削除可能
- 製品とカテゴリは読み取り専用（管理者管理）

### Storageルール

- 画像は公開読み取り可能
- ユーザーは自分のアバターのみアップロード・削除可能
- 認証済みユーザーはレビュー画像をアップロード可能
- 製品画像は管理者のみ

## 🛠️ 技術スタック

- **フロントエンド**: React 19、Vite 7
- **バックエンド**: Firebase（Firestore、Auth、Storage、Hosting）
- **ルーティング**: React Router v7
- **状態管理**: Zustand
- **スタイリング**: CSS変数 + カスタムCSS

## 📦 主要な依存関係

```json
{
  "firebase": "^12.4.0",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.2.0",
  "zustand": "^5.0.3"
}
```

## 🔄 データ構成

- Firestore: ユーザー、レビュー、製品、カテゴリーなどのコレクションを格納
- Cloud Storage: レビュー画像やプロフィール画像を保存
- Authentication: メール/パスワードによるユーザー管理
- Firebase Hosting: 静的ファイルとSPAルーティングを提供

## 🎨 スタイリング

このプロジェクトはテーマ設定にCSS変数を使用しています:

```css
--primary-color: #e91e63
--secondary-color: #ff4081
--accent-color: #ffc107
```

スタイルは`src/index.css`に定義され、レスポンシブデザインをサポートしています。

## 🔗 ルート

- `/` - ホームページ
- `/login` - ログインページ
- `/register` - 登録ページ
- `/products` - 製品一覧
- `/profile` - ユーザープロフィール（認証必須）
- `*` - 404 Not Found

## 🧪 Firebaseエミュレーターでの開発（オプション）

1. エミュレーターのインストール:

```bash
firebase init emulators
```

2. エミュレーターの起動:

```bash
firebase emulators:start
```

3. `.env`の更新:

```bash
VITE_USE_EMULATORS=true
```

これにより、Firebaseの各サービスをローカルで検証できます。

## 📝 環境変数

| 変数名                              | 説明              | 例                                  |
| ----------------------------------- | ----------------- | ----------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Firebase APIキー  | `AIza...`                           |
| `VITE_FIREBASE_AUTH_DOMAIN`         | 認証ドメイン       | `kutikomi-f1e8b.firebaseapp.com`    |
| `VITE_FIREBASE_PROJECT_ID`          | プロジェクトID    | `kutikomi-f1e8b`                    |
| `VITE_FIREBASE_STORAGE_BUCKET`      | ストレージバケット | `kutikomi-f1e8b.appspot.com`        |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | メッセージング送信者ID | `123456789`                      |
| `VITE_FIREBASE_APP_ID`              | アプリID          | `1:123:web:abc`                     |
| `VITE_USE_EMULATORS`                | ローカルエミュレーターを使用 | `true`または省略              |

## 🚀 デプロイ

サイトはFirebase Hostingでホストされています。

**本番URL**: `https://kutikomi-f1e8b.web.app`

デプロイコマンド:

```bash
npm run build && firebase deploy
```

### GitHub Actionsによる自動デプロイ

`master`ブランチへのプッシュで自動的にFirebase Hostingへデプロイされます。

**必要な設定:**

1. Firebase CLIトークンを取得:
   ```bash
   firebase login:ci
   ```

2. GitHubリポジトリのシークレットに追加:
   - Settings → Secrets and variables → Actions
   - 新しいリポジトリシークレットを作成
   - 名前: `FIREBASE_TOKEN`
   - 値: 上記コマンドで取得したトークン

ワークフローファイル:
- `.github/workflows/firebase-hosting-merge.yml` - masterブランチへのマージ時にデプロイ
- `.github/workflows/firebase-hosting-pull-request.yml` - プルリクエスト時にプレビューをデプロイ

## 📄 ライセンス

このプロジェクトはプライベートでプロプライエタリです。

## 👥 コントリビューション

プルリクエストを歓迎します。大きな変更を行う際はIssueを立ててから作業してください。

---

**最終更新**: 2025-10-29
**ステータス**: 開発中
