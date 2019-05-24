'use strict';
let tmp = [];
let isCategory = false;
let isSearch = false;
let categorys = [];
let newArray = [];
let searchResult = [];
const eventList = document.querySelector('.events');

/*
body: 表示件数とカテゴリを取得する
in: なし
out: カテゴリの値, 選択されている表示件数
 */
const getValue = () => {
    const category = selectCategory.value;
    const displayCount = Number(selectItem.value);
    return {category, displayCount};
};
/*
body: 表示件数までエレメントの生成をする
in: 表示する配列, 表示件数, カテゴリ一覧かどうか
out: HTMLエレメント
 */
const showItems = (items, displayCount, flag = true) => {
    let events = '';
    items.map((item, i) => {
        if(flag && i === 0) return;
        if(i > displayCount) return;
        events += `
            <li class="event">
                <h3 class="event-name">${item.event_name}</h3>
                <span class="event-category mr-2">${item.category}</span>
                <time class="event-date">${item.start_date} ~ ${item.end_date}</time>
                <p class="event-place"><i class="fas fa-map-marker-alt mr-1"></i>${item.event_place}</p>
            </li>`;
    });
    return events;
};

/*
body: もっと見る」を表示するかどうか
in: 表示件数, 配列の長さ
out: なし
 */
const showMore = (displayCount, arrayLength) => {
    displayCount < arrayLength ? showButton.style.display = 'block' : showButton.style.display = 'none';
};

/*
body:「もっと見る」がクリックされたとき+10件を表示する
in: なし
out: なし
 */
const onClickMore = () => {
    let { displayCount } = getValue();
    displayCount += 10;
    //表示件数一覧を変更の処理をここに書く
    if(isCategory) {
        eventList.innerHTML = showItems(newArray, displayCount, false);
        createDisplayCount(displayCount, newArray.length);
        showMore(displayCount, newArray.length);
    } else if(isSearch) {
        eventList.innerHTML = showItems(searchResult, displayCount, false);
        createDisplayCount(displayCount, searchResult.length);
        showMore(displayCount, searchResult.length);
    } else {
        eventList.innerHTML = showItems(tmp, displayCount);
        createDisplayCount(displayCount, tmp.length);
        showMore(displayCount, tmp.length);
    }
    console.log(displayCount);
};

/*
body: 表示件数一覧の作成 表示件数のセレクトをセット
in: 表示件数, 配列の長さ
out: なし
 */
const createDisplayCount = (displayCount, length) => {
    let element = '';
    for(let i = 0; i < length; i+=10) {
        if(displayCount === i+10){
            element += `<option value="${i+10}" selected>${i+10}件表示</option>`;
        } else {
            element += `<option value="${i+10}">${i+10}件表示</option>`;
        }
    }
    document.querySelector('#showItems').innerHTML = element;
};

//表示件数が変更されたとき
const changeShowNumber = () => {
    let { displayCount } = getValue();
    if(isCategory) {
        eventList.innerHTML = showItems(newArray, displayCount, false);
        showMore(displayCount, newArray.length);
    } else if(isSearch) {
        eventList.innerHTML = showItems(searchResult, displayCount, false);
        showMore(displayCount, searchResult.length);
    } else {
        eventList.innerHTML = showItems(tmp, displayCount);
        showMore(displayCount, tmp.length);
    }
};


//カテゴリ一覧の作成
const showCategory = () => {
    let element = '';
    categorys.map((category, i) => {
        if(i === 0) {
            element += `<option value="noSelect">全てのカテゴリ</option>`;
            return;
        }
        element += `<option value="${category}">${category}</option>`;
    });
    return element;
};

const selectCategory = document.querySelector('#selectCategory');
/*
body: カテゴリを変更したときにその配列を作成する
 */
const changeCategory = () => {
    const {category, displayCount} = getValue();
    keyword.value　= '';
    isSearch = false;
    if(category === 'noSelect') {
        eventList.innerHTML = showItems(tmp, displayCount);
        isCategory = false;
        return;
    }
    isCategory = true;
    newArray = tmp.filter((event) => {
        return event.category === category;
    });
    eventList.innerHTML = showItems(newArray, displayCount, false);
    showMore(displayCount, newArray.length);
    createDisplayCount(displayCount, newArray.length);
    console.log(displayCount);
};
selectCategory.addEventListener('change', changeCategory);

const showButton = document.querySelector('.show-more');
showButton.addEventListener('click', onClickMore);

const selectItem = document.querySelector('#showItems');
selectItem.addEventListener('change', changeShowNumber);

/*
body: 検索する
in: 検索ワード
out: 検索結果の配列
 */
const createKeyword = (word) => {
    return tmp.filter((item) => {
        if((item.event_name).indexOf(word) >= 0) return true;
        if((item.event_place).indexOf(word) >= 0) return true;
    });
};
const keyword = document.querySelector('.keyword');

keyword.addEventListener('keyup', () => {
    selectCategory.value = 'noSelect';
    isCategory = false;
    const findWord = keyword.value;
    const { displayCount } = getValue();
    if(findWord === '') {
        isSearch = false;
        eventList.innerHTML = showItems(tmp, displayCount);
        showMore(displayCount, tmp.length);
        createDisplayCount(displayCount, tmp.length);
    } else {
        isSearch = true;
        searchResult = createKeyword(findWord);
        eventList.innerHTML = showItems(searchResult, displayCount, false);
        showMore(displayCount, searchResult.length);
        createDisplayCount(displayCount, searchResult.length);
        console.log(searchResult.length);
    }
});



// jQuery
$(function(){
    'use strict';
    $('.hero-img').vegas({
        slides: [
            {src: './com/img/vegas1.jpg'},
            {src: './com/img/vegas2.jpg'},
            {src: './com/img/vegas3.jpg'},
            {src: './com/img/vegas4.jpg'},
        ],
        delay: 5000,
        transitionDuration: 3000,
        transition: 'blur',
        animation: 'random',
    });

    //jsonの取得
    const JSON_URL = 'https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json';
    $.getJSON(JSON_URL, datas => {
        tmp = datas;
        createDisplayCount(10, datas.length);
        const { displayCount } = getValue();
        document.querySelector('.events').innerHTML = showItems(datas, displayCount);
        console.log(tmp);
        showMore(displayCount, datas.length);
        //カテゴリの取得
        datas.map(data => {
            categorys.push(data.category);
        });
        categorys = categorys.filter((x, i, self) => self.indexOf(x) === i);
        selectCategory.innerHTML = showCategory();
    });
});