HTML_Import
===============

## はじめに
このリポジトリは，HTML Importのお試しで作成したものです．
HTML Importとは，別のHTMLファイルの内容を読み込んで，Webページのデザインを分かりやすく記述する仕組みです．
なお，HTML ImportはWebComponentsを構成する一つの仕組みです．

一般的に，WebComponentsは以下の仕組みから構成されます．
今回は以下の内，Custom Elements，HTML Templates，HTML Importsを利用しています．

```
Custom Elements
HTML Templates
HTML Imports
Shadow DOM
```


## ファイル一覧

|:-|:-|
|ファイル名|内容|
|test.html|読み込むファイル|
|x-foo.html|テンプレートの内容（pタグで記述）|
|x-foo2.html|テンプレートの内容（templateタグで記述）|
|x-foo3.html|テンプレートの内容（x-foo2.htmlの簡略版）|
|xfoo.js|x-foo.html用レンダリングプログラム|
|xfoo2.js|x-foo2.html用レンダリングプログラム|

## 使い方
以下のようにgit cloneしてWebサーバを起動して，Webブラウザから```test.html```にアクセスしてください．
画面上にThis is a pen.とHelloが2行ずつ表示されます．

```
$ git clone http://git.mesh.cx/gitbucket/git/suda/HTML_Import.git
$ ruby -run -e httpd . -p 8000
```

## 仕組み

### 元となるHTML

test.htmlの内容は以下のようになっています．
ここで，head内にあるlinkタグで外部のHTMLファイルを読み込んでいます．
このように外部のHTMLファイルを読み込む仕組みをHTML Importsと呼びます．
ここでは，x-foo.htmlとx-foo2.htmlを読み込んでいます．

bodyにあるx-fooとx-foo2がダミーのタグで，このような仕組みをCustom Elementsと呼びます．
このようにダミーのタグを記述するだけで，まとまった部品を配置していきます．


```
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Document</title>

  <link rel="import" id="xfoo" href="x-foo.html">
  <link rel="import" id="xfoo2" href="x-foo2.html">
</head>
<body>
  <x-foo></x-foo>
  <x-foo></x-foo>
  <x-foo2></x-foo2>
  <x-foo2></x-foo2>
</body>
</html>
```

### 読み込まれるHTML

おそらく一般的にはx-foo2.htmlのような使い方をするはずなので，こちらで説明します．
x-foo2.htmlの内容は以下のようになっています．
念のためheadとbodyに分けていますが，特に分けなくても良いはずです．

templateタグの中身が実際にレンダリングされるテンプレート（部品）です．
このようにテンプレートを記述する仕組みをHTML Templatesと呼びます．
今回の例では，単にHelloという文字列が置かれているだけですが，ここに様々なタグを駆使して作成した部品を置くことを想定しておいてください．

scriptタグでは，このテンプレートを，読み込んだWebページに適用するための記述がなされています．

```html:x-foo2.html
<head>
  <script type="text/javascript" src="xfoo2.js"></script>
</head>
<body>
  <template>
    <p>Hello</p>
  </template>
</body>
```

### レンダリング用のJavaScript

上記2つのファイルで，「親」と「子」が定義されているので，「子」の内容を「親」にコピー＆ペーストします．
レンダリング用のスクリプトであるxfoo2.jsの内容は以下のようになっています．

まずはコピーする内容の取得です．
2行目で，xfoo2というidの要素から内容（HTML）を取得しています．
これは，元となるHTMLで定義されているlinkタグが該当します．
3行目で，templateタグの内容を取得して，変数contentに代入しています．

4行目ではx-foo2という全要素を取得しています．
次のfor文で，4行目で取得した要素に対して，contentの内容をクローンした上でペーストしています．

```
window.addEventListener('load', function() {
  var link = document.querySelector("#xfoo2").import;
  var content = link.querySelector('template').content;
  var dest = document.querySelectorAll('x-foo2');
  for( x of dest ) {
    x.appendChild(content.cloneNode(true));
  }
});
```

このようにテンプレートを定義して，利用したいページから読み込むことにより，デザインの統一が容易になったり，スニペットの再利用がしやすくなるなどの利点があります．
