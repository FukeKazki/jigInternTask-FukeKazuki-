'use strict';
let end = 10;
let tmp = [];
let isCategory = false;
let categorys = [];
let newArray = [];
const eventList = document.querySelector('.events');
//表示件数までエレメントの生成をする
const showItems = (items, end = items.length, flag = true) => {
    let events = '';
    items.map((item, i) => {
        if(flag) if(i === 0) return;
        if(i > end) return;
        events += `
            <li>
                <div>
                    <p>${i}</p>
                    <time>${item.start_date}</time>
                    <p>${item.event_name}</p>
                    <span>${item.category}</span>
                    <p>${item.contact}</p>
                </div>
            </li>`;
    });
    return events;
};
//「もっと見る」を表示するかどうか
const showMore = (arrayLength) => {
    if(end < arrayLength) {
        showButton.style.display = 'block';
    } else {
        showButton.style.display = 'none';
    }
};
//「もっと見る」がクリックされたとき
const onClickMore = () => {
    end += 10;
    if(isCategory) {
        eventList.innerHTML = showItems(newArray, end, false);
        showMore(newArray.length);
    } else {
        eventList.innerHTML = showItems(tmp, end);
        showMore(tmp.length);
    }
    console.log(end);
};


//表示件数が変更されたとき
const changeShowNumber = () => {
    end = Number(selectItem.value);
    if(isCategory) {
        eventList.innerHTML = showItems(newArray, end, false);
        showMore(end);
    } else {
        eventList.innerHTML = showItems(tmp, end);
        showMore(tmp.length);
    }
    console.log(end);
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
//カテゴリを変更したとき
selectCategory.addEventListener('change', () => {
   const value = selectCategory.value;
   if(value === 'noSelect') {
       eventList.innerHTML = showItems(tmp, end);
       isCategory = false;
       return;
   }
   isCategory = true;
   newArray = tmp.filter((event) => {
       return event.category === value;
   });
   console.log(newArray);
   //最初は10件表示createKeyword
   end = 9;
   eventList.innerHTML = showItems(newArray, end, false);
   showMore(newArray.length);
});

const showButton = document.querySelector('.show-more button');
showButton.addEventListener('click', onClickMore);

const selectItem = document.querySelector('#showItems');
selectItem.addEventListener('change', changeShowNumber);

const keywordButton = document.querySelector('.keywordButton');
let keywords = [];
const createKeyword = (word) => {
    keywords = tmp.filter((item, index) => {
        if((item.event_name).indexOf(word) >= 0) return true;
        if((item.contact).indexOf(word) >= 0) return true;
    });
    return keywords;
};
const keyword = document.querySelector('.keyword');
const onClickKeywordButton = () => {
  const findWord = keyword.value;
  let array = createKeyword(findWord);
  end = array.length;
  eventList.innerHTML = showItems(array, end, false);
  showMore(array.length);
  console.log(array);
};
keywordButton.addEventListener('click', createKeyword);
keyword.addEventListener('change', onClickKeywordButton);


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
      document.querySelector('.events').innerHTML = showItems(datas, end);
      console.log(tmp);
      showMore(datas.length);
      //カテゴリの取得
      datas.map(data => {
          categorys.push(data.category);
      });
      categorys = categorys.filter((x, i, self) => self.indexOf(x) === i);
      selectCategory.innerHTML = showCategory();
   });
});
