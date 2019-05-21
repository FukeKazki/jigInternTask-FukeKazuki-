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
   let tmp;
   $.getJSON(url, datas => {
      let eventName = '';
      tmp = datas;
      datas.map((data, i) => {
         if(i >= 10 || i === 0) return;
         eventName += `
            <li>
                <div>
                    ${data.start_date}
                    ${data.event_name}
                    ${data.category}
                    ${data.contact}
                </div>
            </li>
           `;
      });
      document.querySelector('.events').innerHTML = eventName;
      console.log(tmp);
   });
});