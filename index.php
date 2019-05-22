<!doctype html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>福井県イベント情報サイト</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="Description" content="福井県イベント情報サイトです。">
    <meta name="Keywords" content="福井, イベント">
    <link rel="stylesheet" href="./com/css/import.css">
    <link rel="stylesheet" href="./com/js/vegas/vegas.min.css">
</head>
<body>
<header>
    <div class="hc">
        <h1>福井県イベント情報サイト</h1>
    </div>
</header>
<!--<div class="hero-img">-->
<!--    <div class="hero-mask">-->
<!--        <div class="hero-title"><h1>Welcome to Fukui</h1></div>-->
<!--    </div>-->
<!--</div>-->
<main>
    <div class="mc">
        <h2>イベント情報</h2>
        <div class="calendar">
            calendar
        </div>
        <div class="forms">

            <h3>キーワード検索</h3>
            <input type="text" value="キーワード" class="keyword">
            <button class="keywordButton">検索</button>

            <h3>カテゴリ検索</h3>
            <select name="" id="selectCategory">
            </select>

            <h3>表示検索</h3>
            <select name="showItems" id="showItems">
                <option value="10">10件表示</option>
                <option value="20">20件表示</option>
                <option value="30">30件表示</option>
                <option value="9999">全件表示</option>
            </select>

        </div>

        <div class="events">
        </div>

        <div class="show-more">
            <button>もっと見る</button>
        </div>

    </div>
</main>
<footer>
    <div class="fc">
        <h3>フッター</h3>
    </div>
</footer>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="./com/js/vegas/vegas.min.js"></script>
<script src="./com/js/index.js"></script>
</body>
</html>