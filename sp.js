function clock() {
  let twoDigit = function (num) {
    let digit;
    if (num < 10) { digit = "0" + num; }
    else { digit = num; }
    return digit;
  }
  let weeks = new Array("日", "月", "火", "水", "木", "金", "土");
  let now = new Date();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let week = weeks[now.getDay()];
  let hour = now.getHours();
  let minute = twoDigit(now.getMinutes());
  document.getElementById("date").innerHTML = month + "月" + day + "日 " + week + "曜日";
  document.getElementById("clock").innerHTML = hour + ":" + minute;
}
setInterval(clock, 60000);

window.addEventListener('touchend', swipeup);

jQuery(function () {
  jQuery('#box').draggable({
    axis: 'y',
    scroll: false,
  });
});

function swipeup() {
  const box = document.querySelector('#box');
  const y = box.getBoundingClientRect().top;
  if (y <= -0.2 * window.innerHeight) {
    $('#box').animate({
      top: -100 * window.innerHeight,
    }, 1000, 'swing');
  } else {
    console.log("test");
    $('#box').animate({
      top: 0,
      left: 0,
      right: 0,
      //marginLeft: auto,
      //marginRight: auto,
      padding: 0,
    }, 500, 'swing');
  }
}

function stuanime() {
  window.setTimeout(function () {
    $('#stu').animate({
      bottom: 0.075 * window.innerHeight,
      opacity: 1,
    }, 1500, 'easeInOutQuart');
    $('#navibar').animate({
      bottom: 0.045 * window.innerHeight,
    }, 1000, 'swing', function () {
      $('#navibar').animate({
        bottom: 0.03 * window.innerHeight,
      }, 2000, 'swing');
    });
  }, 500);
}