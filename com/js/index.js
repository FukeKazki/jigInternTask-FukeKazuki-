'use strict';
let eventList = [];
let isCategory = false;
let isSearch = false;
let categoryList = [];
let categoryArray = [];
let searchResult = [];
const eventArea = document.querySelector('.events');

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
out: エレメント
 */
const showItems = (items, displayCount, flag = true) => {
    let events = '';
    items.map((item, i) => {
        if(flag && i === 0) return;
        if(i > displayCount) return;
        events += `
            <li class="event">
                <h3 class="event-name">${item.event_name}</h3>
                <p class="event-description" style="padding: 0 2em 1em 2em;">${item.description}</p>
                <span class="event-category mr-2">${item.category}</span>
                <time class="event-date">${item.start_date} ~ ${item.end_date}</time>
                <table class="mt-2">
                    <tbody>
                        <tr>
                            <th><i class="far fa-file-alt mr-1"></i>概要</th>
                            <td>
                                <p class="event-remarks">${item.remarks}</p>
                            </td>
                        </tr>
                        <tr>
                            <th><i class="fas fa-map-marker-alt mr-1"></i>会場</th>
                            <td>
                                <p class="event-place">${item.event_place}</p>
                                <p class="event-address">${item.address}</p> 
                            </td>
                        </tr>
                        <tr>
                            <th><i class="fas fa-car mr-1"></i>交通</th>
                            <td>
                                <p class="event-transportation">${item.transportation}</p>
                            </td>
                        </tr>
                        <tr>
                            <th><i class="fas fa-phone mr-1"></i>お問い合わせ</th>
                            <td>
                                <p class="event-contact">${item.contact}</p>
                                <p class="event-contact-phone-number">${item.contact_phone_number}</p>
                                <p class="event-mail-address">${item.mail_address}</p>
                                <p class="event-place-url"><a href="${item.event_place_url}" target="_blank">${item.event_place_url}</a></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
    if(isCategory) {
        eventArea.innerHTML = showItems(categoryArray, displayCount, false);
        createDisplayCount(displayCount, categoryArray.length);
        showMore(displayCount, categoryArray.length);
    } else if(isSearch) {
        eventArea.innerHTML = showItems(searchResult, displayCount, false);
        createDisplayCount(displayCount, searchResult.length);
        showMore(displayCount, searchResult.length);
    } else {
        eventArea.innerHTML = showItems(eventList, displayCount);
        createDisplayCount(displayCount, eventList.length);
        showMore(displayCount, eventList.length);
    }
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
        eventArea.innerHTML = showItems(categoryArray, displayCount, false);
        showMore(displayCount, categoryArray.length);
    } else if(isSearch) {
        eventArea.innerHTML = showItems(searchResult, displayCount, false);
        showMore(displayCount, searchResult.length);
    } else {
        eventArea.innerHTML = showItems(eventList, displayCount);
        showMore(displayCount, eventList.length);
    }
};


//カテゴリ一覧の作成
const showCategory = () => {
    let element = '';
    categoryList.map((category, i) => {
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
        eventArea.innerHTML = showItems(eventList, displayCount);
        createDisplayCount(displayCount, eventList.length);
        isCategory = false;
        return;
    }
    isCategory = true;
    categoryArray = eventList.filter((event) => {
        return event.category === category;
    });
    eventArea.innerHTML = showItems(categoryArray, displayCount, false);
    showMore(displayCount, categoryArray.length);
    createDisplayCount(displayCount, categoryArray.length);
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
    return eventList.filter((item) => {
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
        eventArea.innerHTML = showItems(eventList, displayCount);
        showMore(displayCount, eventList.length);
        createDisplayCount(displayCount, eventList.length);
    } else {
        isSearch = true;
        searchResult = createKeyword(findWord);
        eventArea.innerHTML = showItems(searchResult, displayCount, false);
        showMore(displayCount, searchResult.length);
        createDisplayCount(displayCount, searchResult.length);
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
    $.getJSON(JSON_URL, data => {
        eventList = data;
        createDisplayCount(10, data.length);
        const { displayCount } = getValue();
        document.querySelector('.events').innerHTML = showItems(data, displayCount);
        showMore(displayCount, data.length);
        //カテゴリの取得
        data.map(x => {
            categoryList.push(x.category);
        });
        categoryList = categoryList.filter((x, i, self) => self.indexOf(x) === i);
        selectCategory.innerHTML = showCategory();
    });
});