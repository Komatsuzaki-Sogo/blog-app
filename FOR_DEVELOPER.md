# 開発者向け情報

本プロジェクトに参加されるすべての開発者に守っていただきたいルールと、開発に関わる仕様をお伝えします。

## 開発環境

### Visual Studio Codeの拡張機能

Visual Studio Codeを利用する場合は、以下の拡張機能をインストールします。[^1]

| 拡張名                                                                                     | インストール条件 |
| ------------------------------------------------------------------------------------------ | :--------------: |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)          |       必須       |
| [editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) |       必須       |
| [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)   |       必須       |
| [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)                |       推奨       |
| [Gremlins tracker](https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins)      |       推奨       |

### 命名ルール

- FLOCSSを採用しています。
- 「接頭辞」・「部位・分類」・「識別子」をハイフンケースでつなぎます。
- 各単語はローワーキャメルケースで表記します。
- 原則、単語を「省略しない」

> 「接頭辞」-「部位・分類」-「識別子 (-type [「2」以上の連番 ])」

```text
例：
.l-header
.c-text-alert
.c-list-shopData
.c-tbl-type2
```

| 接頭辞 | 説明                                                                                        |
| :----: | :------------------------------------------------------------------------------------------ |
|  .l-*  | レイアウト。ガワおよびフレーム（骨組み）にあたる部分に使用します。`<br>`例：`.l-header` |
|  .c-*  | モジュール。モジュールにあたる部品に使用します。`<br>`例：`.m-box-info`                 |
|  .u-*  | ユーティリティ。調整クラスに使用します。                                                    |

### コメント

コメントアウトは `block`単位

* `block`の終わりに付与

例：

```
<div class="block">
</div><!-- /.block -->
```

```
<ul class="block">
<li class="block__element">
<div class="block__elementDiv">
</div>
</li>
</ul><!-- /.block -->
```


### CSSプロパティ指定

- `background`はロングハンドを使用します（未指定のプロパティ反映は望ましくないため）

#### マージン

余白は基本的に `margin-top`と `margin-left`を使用

* ただしアイコンやラベルなどの不確定要素を配置する場合は不確定要素の方にmarginを設定する

### リソースファイル管理ルール

#### 共通ファイル格納場所

**※文書仕様書をもとに記述調整中。とくにsites配下はルール未fix**

すべてのリソースファイルは `/shared/`配下に格納する。

| ディレクトリ    | 格納するもの                               |
| :-------------- | :----------------------------------------- |
| `/shared/img` | 共通系・ページ固有で使用している画像を格納 |
| `/shared/js`  | 共通系・ページ固有で使用しているJSを格納   |
| `/shared/css` | 共通系・ページ固有で使用しているCSSを格納  |

#### 画像ファイル名

> [種別] - [ページ名] - [具体的な命名]（- [連番]）（- [pc/tab/sp]）.[拡張子]

- [ページ名][具体的な命名] はローワーキャメルケースを使用します
  - ページ名にハイフンやアンダースコアが含まれている場合はローワーキャメルケースに変更します。
- 接頭辞が `cmn` の場合はページ名を省略します。
  - `cmn` を使用する場合、その後に別の種別接頭辞を付与してください
  - 例：`cmn-logo.svg`
- ページが index.html の場合でも ページ名 `index` は省略しません。
  - `cmn` 接頭辞の場合は `index` を付与しないでください
- [連番]は `2`から付与します。※`1`は省略
- [pc/tab/sp] は各種ブレークポイントで出し分けを行う場合に付与します

##### 接頭辞

| 種別 | 説明                                   |
| :--- | :------------------------------------- |
| cmn  | 配下の複数ページで共通で使用される画像 |
| logo | ロゴ                                   |
| icon | アイコン                               |
| fig  | 図版画像                               |
| bg   | 背景画像                               |
| img  | 上記以外の画像                         |

##### 例

```
img-index.webp
img-index-2.webp

img-index-maiVisual-sp.webp
img-index-maiVisual-pc.webp
img-index-maiVisual-2-sp.webp
img-index-maiVisual-2-pc.webp

img-index-carousel.webp
img-index-carousel-2.webp

cmn-img-localNavgation.webp
cmn-img-localNavigation-2.webp
```

※ CMS登録（アセット登録）する画像は[04_CMS投入](https://mlc-inc.backlog.com/alias/wiki/3604185)を参考に命名してください。

### アンカーリンクの命名ルール

`anchor-連番`

※連番の1は省略する

```
anchor
anchor-2
anchor-3
anchor-4
```


### Gitコミットルール

以下に沿うようにgitのコミットメッセージを反映お願いします。

| type     | 用途                   |
| -------- | ---------------------- |
| feat     | 新機能追加             |
| fix      | バグ修正               |
| docs     | ドキュメントのみの変更 |
| style    | フォーマットや空白など |
| refactor | 挙動変更なしの改善     |
| test     | テストコード関連       |
| chore    | ビルドやCIなど雑務系   |
