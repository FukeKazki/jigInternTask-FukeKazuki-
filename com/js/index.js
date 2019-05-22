'use strict';
//表示数の初期状態
let end = 10;

let tmp = [];
let isCategory = false;
let categorys = [];
let newArray = [];

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

//もっと見るを表示するかどうか
const showMore = (length) => {
    if(end < length) {
        showButton.style.display = 'block';
    } else {
        showButton.style.display = 'none';
    }
};
//もっと見るがクリックされたとき
const onClickMore = () => {
    end += 10;
    if(isCategory) {
        document.querySelector('.events').innerHTML = showItems(newArray, end);
        showMore(newArray.length);
    } else {
        document.querySelector('.events').innerHTML = showItems(tmp, end);
        showMore(tmp.length);
    }
    console.log(end);
};


//表示件数が変更されたとき
const changeShowNumber = () => {
    end = Number(selectItem.value);
    if(isCategory) {
        document.querySelector('.events').innerHTML = showItems(newArray, end, false);
        showMore(end);
    } else {
        document.querySelector('.events').innerHTML = showItems(tmp, end);
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
       document.querySelector('.events').innerHTML = showItems(tmp, end);
       isCategory = false;
       return;
   }
   isCategory = true;
   newArray = tmp.filter((event) => {
       return event.category === value;
   });
   console.log(newArray);
   // end = newArray.length;
   end = 9;
   document.querySelector('.events').innerHTML = showItems(newArray, end, false);
   showMore(newArray.length);
});

const showButton = document.querySelector('.show-more button');
showButton.addEventListener('click', onClickMore);

const selectItem = document.querySelector('#showItems');
selectItem.addEventListener('change', changeShowNumber);


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

   const url = 'https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json';
   //jsonの取得
   $.getJSON(url, datas => {
      tmp = datas;
      document.querySelector('.events').innerHTML = showItems(datas, end);
      console.log(tmp);
      showMore(datas.length);
      //カテゴリの取得
       datas.map(data => {
          categorys.push(data.category);
       });
       categorys = categorys.filter((x, i, self) => self.indexOf(x) === i);
       console.log(categorys);
       selectCategory.innerHTML = showCategory();
   });
});
