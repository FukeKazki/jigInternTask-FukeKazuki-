'use strict';
let end = 10;
let tmp = [];
//表示件数までエレメントの生成をする
const showItems = (items, end = items.length) => {
    let events = '';
    items.map((item, i) => {
        if(i === 0 || i > end) return;
        events += `
            <li>
                <div>
                    ${item.start_date}
                    ${item.event_name}
                    ${item.category}
                    ${item.contact}
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
    const eventName = showItems(tmp, end);
    document.querySelector('.events').innerHTML = eventName;
    showMore(tmp.length);
    console.log(end);
};
const showButton = document.querySelector('.show-more button');
showButton.addEventListener('click', onClickMore);

//表示件数が変更されたとき
const changeShowNumber = () => {
    end = Number(selectItem.value);
    const eventName = showItems(tmp, end);
    document.querySelector('.events').innerHTML = eventName;
    showMore(tmp.length);
    console.log(end);
};
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
      const eventName = showItems(datas, end);
      document.querySelector('.events').innerHTML = eventName;
      console.log(tmp);
      showMore(datas.length);
   });
});
