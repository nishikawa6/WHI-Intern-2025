# 🌙 ダークモード機能の実装

## 概要

タレントマネジメントシステムにダークモード機能を実装しました。ユーザーはヘッダーのトグルボタンを使用してライトモードとダークモードを切り替えることができ、設定はブラウザのローカルストレージに保存されます。

## 🎯 実装内容

### 主要な機能

- ✅ ライトモード/ダークモードの切り替え
- ✅ テーマ設定のローカルストレージ永続化
- ✅ Material-UI テーマとの完全統合
- ✅ CSS 変数を使用したカスタムスタイル対応
- ✅ ヘッダーのテーマ切り替えボタン

### 技術的な改善点

- React Context API を使用した状態管理
- TypeScript による型安全性の確保
- Material-UI のテーマシステムとの統合
- パフォーマンスを考慮したコンポーネント設計

## 📁 変更されたファイル

### 新規作成

- `src/contexts/ThemeContext.tsx` - テーマの状態管理とローカルストレージ連携
- `src/providers/ThemeProvider.tsx` - Material-UI テーマプロバイダーの統合
- `src/components/ThemeToggleButton.tsx` - テーマ切り替えボタンコンポーネント
- `src/themes/darkTheme.ts` - ダークテーマの定義
- `src/themes/lightTheme.ts` - ライトテーマの定義
- `src/themes/index.ts` - テーマの型定義とエクスポート

### 更新

- `src/app/layout.tsx` - ThemeProvider の統合
- `src/app/globals.css` - CSS 変数によるテーマ対応
- `src/components/GlobalHeader.tsx` - テーマ切り替えボタンの追加

## 🔧 技術仕様

### テーマ管理

```typescript
// ThemeContext.tsx
interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export type ThemeMode = "light" | "dark";
```

### Material-UI テーマ統合

```typescript
// ThemeProvider.tsx
const ThemeProviderInner: React.FC<ThemeProviderInnerProps> = ({
  children,
}) => {
  const { mode } = useThemeContext();
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
```

### CSS 変数対応

```css
/* globals.css */
:root {
  --background: #f0f0f0;
  --foreground: #171717;
}

[data-theme="dark"] {
  --background: #121212;
  --foreground: #ffffff;
}
```

## 🎨 デザイン詳細

### ライトテーマ

- **Primary**: #005bac (企業カラー)
- **Secondary**: #5ec2c6 (アクセントカラー)
- **Background**: #f0f0f0 (明るいグレー)
- **Paper**: #ffffff (白)

### ダークテーマ

- **Primary**: #4a9eff (明るいブルー)
- **Secondary**: #81d4d8 (明るいシアン)
- **Background**: #121212 (ダークグレー)
- **Paper**: #1e1e1e (少し明るいダークグレー)

## 🚀 使用方法

### 基本的な使用

```tsx
// テーマコンテキストの使用
const { mode, toggleTheme } = useThemeContext();

// テーマ切り替えボタン
<ThemeToggleButton />;
```

### カスタムコンポーネントでのテーマ適用

```tsx
// MUIコンポーネントは自動的にテーマが適用される
<Paper sx={{ p: 2 }}>
  <Typography variant="h6">自動的にテーマが適用されます</Typography>
</Paper>
```

## ✅ テスト内容

### 手動テスト

- [x] ライトモード → ダークモード切り替え
- [x] ダークモード → ライトモード切り替え
- [x] ページリロード時のテーマ保持
- [x] 全ページでのテーマ適用確認
- [x] Material-UI コンポーネントの表示確認
- [x] モバイル表示での動作確認

### 確認項目

- [x] ヘッダーのテーマ切り替えボタンが正常に動作する
- [x] 選択されたテーマがローカルストレージに保存される
- [x] ページリロード後も選択されたテーマが維持される
- [x] 全てのページでテーマが正しく適用される
- [x] Material-UI コンポーネントがテーマに従って表示される
- [x] カスタム CSS 変数がテーマに応じて変更される

## 📱 スクリーンショット

### ライトモード

![ライトモード - 検索画面](screenshots/light-mode-search.png)
![ライトモード - 従業員詳細](screenshots/light-mode-employee.png)

### ダークモード

![ダークモード - 検索画面](screenshots/dark-mode-search.png)
![ダークモード - 従業員詳細](screenshots/dark-mode-employee.png)

## 🔄 今後の拡張可能性

- システムのダークモード設定に従う自動切り替え機能
- 追加のテーマカラーバリエーション
- アニメーション付きのテーマ切り替え
- ユーザー設定での詳細なテーマカスタマイズ

## 📋 レビューポイント

### 確認してほしい点

1. **テーマの一貫性**: 全てのページで統一されたテーマが適用されているか
2. **パフォーマンス**: テーマ切り替え時のパフォーマンスに問題がないか
3. **アクセシビリティ**: ダークモードでの視認性やコントラストが適切か
4. **モバイル対応**: スマートフォンでの表示に問題がないか

### 懸念事項

- ローカルストレージの容量制限（現在は問題なし）
- 古いブラウザでの CSS 変数対応（モダンブラウザ対象のため問題なし）

## 🏁 完了基準

- [x] ライトモード/ダークモードの切り替えが正常に動作する
- [x] テーマ設定がローカルストレージに正しく保存される
- [x] 全ページでテーマが統一されて適用される
- [x] Material-UI コンポーネントがテーマに従って表示される
- [x] モバイル端末での動作確認完了
- [x] コード品質チェック完了

## 🔗 関連 Issue

- #123 ダークモード機能の実装要求
- #124 UI/UX の改善要求

---

**レビュワー**: @frontend-team  
**マージ予定**: 2024/01/XX  
**影響範囲**: フロントエンド全体（破壊的変更なし）
