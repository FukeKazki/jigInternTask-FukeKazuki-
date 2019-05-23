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
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
</head>
<body>
<header>
    <div class="hc">
        <h1 class="title">福井県イベント情報サイト</h1>
    </div>
</header>
<!--<div class="hero-img">-->
<!--    <div class="hero-mask">-->
<!--        <div class="hero-title"><h1>Welcome to Fukui</h1></div>-->
<!--    </div>-->
<!--</div>-->
<main>
    <div class="mc">
        <h2 class="article-title">イベント情報</h2>
        <div class="calendar" style="text-align: center;">
            calendar
        </div>
        <div class="forms">
            <style>
                .search-box, .category-box, .count-box {
                    border: 1px solid #4d4d4d;
                    -webkit-border-radius: 1em;
                    -moz-border-radius: 1em;
                    border-radius: 1em;
                    padding: 1em 2em;
                }
                .forms .bottom {
                    display: flex;
                    justify-content: center;
                }
                .keyword {
                    border: 1px solid #ccc;
                    box-shadow: none;
                    border-radius: 4px;
                    width: 100%;
                    padding: .5em 1em;
                }
                .cp_ipselect {
                    position: relative;
                }
                .cp_ipselect::before {
                    font-weight: bold;
                    z-index: 1;
                    position: absolute;
                    right: 12px;
                    top: 0;
                    content: "\f107";
                    line-height: 37px;
                    pointer-events: none;
                    font-family: "Font Awesome 5 Free";
                }
                .cp_ipselect .cp_sl01 {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    cursor: pointer;
                    position: relative;
                    border: 1px solid #bbbbbb;
                    border-radius: 2px;
                    background: #ffffff;
                    padding: .5em 2em .5em 1em;
                    color: #666666;
                }
            </style>

            <div style="text-align: center" class="count-box mt-5">
                <h3 class="section-title">表示検索</h3>
                <div class="">
                    <select name="showItems" id="showItems" class="">
                        <option value="10">10件表示</option>
                        <option value="20">20件表示</option>
                        <option value="30">30件表示</option>
                        <option value="9999">全件表示</option>
                    </select>
                </div>
            </div>

            <div class="bottom">
                <div style="text-align: center" class="search-box mt-5 mr-5">
                    <h3 class="section-title">Keyword</h3>
                    <input type="text" value="キーワード" class="keyword">
                </div>

                <div style="text-align: center;" class="category-box mt-5">
                    <h3 class="section-title">Category</h3>
                    <div class="cp_ipselect">
                        <select name="" id="selectCategory" class="cp_sl01">
                        </select>
                    </div>
                </div>
            </div>


        </div>

        <ul class="events mt-5">
        </ul>

        <div class="mt-2 mb-5">
            <button class="show-more">もっと見る</button>
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