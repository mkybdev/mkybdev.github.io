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
  document.getElementById("time").innerHTML = hour + ":" + minute + "<i class=\"fas fa-location-arrow\"></i>";
}
setInterval(clock, 1000);

window.addEventListener('touchend', swipeup);
let boxtimer;
window.addEventListener('touchstart', function () {
  boxtimer = setInterval(function () {
    const box = document.querySelector('#box');
    const y = box.getBoundingClientRect().top;
    //if (y < 0) {
    /*$('#lwp').animate({
      opacity: "0.5",
    }, 100, 'swing');
    boxflag = false;*/
    //}
    let lwpop;
    let yrat = -y / window.innerHeight;
    /*
    if (yrat < 0.45) {
      lwpop = 1 - 1 / 7 * Math.log(1 + yrat);
    } else {
      lwpop = 1 - 1 / 7 * Math.log(1.45);
    }
    document.getElementById("lwp").style.opacity = lwpop;
    document.getElementById("hstatus").style.opacity = 1 / 2 * Math.exp(yrat) - 1 / 2;
    */
    if (yrat >= 0.45) {
      lockopen();
    }
    if (y == 0) {
      //document.getElementById("dock").style.bottom = "-10vh";
      $('#dock').addClass("hidedock");
      /*$('#lwp').animate({
        opacity: "1",
      }, 10, 'swing');
      boxflag = true;*/
      //document.getElementById("lwp").style.filter = "blur(0)";
      $('#apps').removeClass("active");
      $('#uapps').removeClass("uactive");
    } else {
      //document.getElementById("lwp").style.filter = "blur(" + 80 * yrat + "px)";
    }
    $('.hidedock').css("bottom", "-10vh");
  }, 500);
});

jQuery(function () {
  jQuery('#box').draggable({
    axis: 'y',
    scroll: false,
    containment: [0, -10000, 0, 0],
  });
});

function lockopen() {
  $('#apps').addClass("active");
  $('#uapps').addClass("uactive");
  $('#dock').removeClass("hidedock");
  const app_1 = document.getElementById("app1");
  $('#dock').animate({
    bottom: 0.0325 * window.innerHeight,
  }, 750, 'easeOutQuart', function () {
    document.getElementById("hstatus").style.opacity = 1;
  });
}

//let boxflag = true;

function swipeup() {
  const box = document.querySelector('#box');
  const y = box.getBoundingClientRect().top;
  if (y <= -0.2 * window.innerHeight) {
    $('#box').animate({
      top: -1 * window.innerHeight,
    }, 500, 'easeInOutSine', function () {
      clearInterval(boxtimer);
    });
    lockopen();
  } else {
    $('#box').animate({
      top: 0,
      left: 0,
      right: 0,
      padding: 0,
    }, 500, 'easeOutQuart', function () {
      clearInterval(boxtimer);
    });
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

let wrapper = null;
let canvas = null;
let g = null;
let clock_size;
let scale;
let center = { x: 0, y: 0 };
let $id = function (id) { return document.getElementById(id); };
const clock_bg = "white";
const clock_ct = "#ec8e17";
const clock_wf = "black";
const clock_wfs = "#c2c2c2";
const clock_num = "black"
const clock_hour = "black";
const clock_min = "black";
const clock_sec = "#ec8e17";
/*canvas.width = wrapper.offsetWidth;
canvas.height = wrapper.offsetHeight;
center.x = canvas.width / 2;
center.y = canvas.height / 2;
clock_size = canvas.width >= canvas.height ? canvas.height : canvas.width;
scale = clock_size / 500.0;*/

function clockdisp() {
  g.save();

  g.translate(center.x, center.y);
  g.scale(scale, scale);
  g.fillStyle = clock_bg;
  g.beginPath();
  g.arc(0, 0, 200, 0, Math.PI * 2, true);
  g.fill();

  g.rotate(-Math.PI / 2);
  g.lineCap = "round";

  let now = new Date();

  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds() + 0.001 * now.getMilliseconds();

  hour = hour >= 12 ? hour - 12 : hour;

  g.save();
  g.strokeStyle = clock_wfs;
  g.lineWidth = 5;
  g.beginPath();
  for (let i = 0; i < 60; i++) {
    g.rotate(Math.PI / 30);
    //if (i % 6 == 0) { continue; }
    g.moveTo(175, 0);
    g.lineTo(187.5, 0);
  }
  g.stroke();
  g.restore();

  g.save();
  g.strokeStyle = clock_wf;
  g.lineWidth = 5;
  g.beginPath();
  for (let i = 0; i < 12; i++) {
    g.rotate(Math.PI / 6);
    g.moveTo(175, 0);
    g.lineTo(187.5, 0);
  }
  g.stroke();
  g.restore();

  g.save();
  g.rotate(Math.PI / 2);
  g.fillStyle = clock_num;
  g.font = "normal 50px 'sfr'";
  g.textBaseline = "middle";
  let angle = -60;
  let offset = [10, 10, 10, 15, 15, 15, 15, 15, 17.5, 17.5, 17.5, 25];
  let yoffset = [0, 0, -2.5, -2.5, -5, -5, 0, 0, -2.5, -2.5, -2.5, 0];
  let r = 140;
  i = 1;
  while (i <= 12) {
    let radian = angle * Math.PI / 180;
    let x = r * Math.cos(radian);
    let y = r * Math.sin(radian);
    g.fillText(i, x - offset[i - 1], y - yoffset[i - 1]);
    angle += 30;
    i++;
  }
  g.restore();

  g.save();
  g.rotate(hour * (Math.PI / 6) + minute * (Math.PI / 360) + second * (Math.PI / 21600));
  g.lineWidth = 7.5;
  g.strokeStyle = clock_hour;
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(30, 0);
  g.stroke();
  g.lineWidth = 15;
  g.strokeStyle = clock_hour;
  g.beginPath();
  g.moveTo(35, 0);
  g.lineTo(100, 0);
  g.stroke();
  g.restore();

  g.save();
  g.rotate(minute * (Math.PI / 30) + second * (Math.PI / 1800));
  g.lineWidth = 7.5;
  g.strokeStyle = clock_min;
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(30, 0);
  g.stroke();
  g.lineWidth = 15;
  g.strokeStyle = clock_min;
  g.beginPath();
  g.moveTo(35, 0);
  g.lineTo(178.5, 0);
  g.stroke();
  g.restore();

  g.fillStyle = "black";
  g.beginPath();
  g.arc(0, 0, 12, 0, Math.PI * 2, true);
  g.fill();

  g.fillStyle = clock_ct;
  g.beginPath();
  g.arc(0, 0, 8, 0, Math.PI * 2, true);
  g.fill();

  g.rotate(second * Math.PI / 30);
  g.strokeStyle = clock_sec;
  g.lineWidth = 3.5;
  g.beginPath();
  g.moveTo(-25, 0);
  g.lineTo(187.5, 0);
  g.stroke();

  g.fillStyle = "white";
  g.beginPath();
  g.arc(0, 0, 4, 0, Math.PI * 2, true);
  g.fill();

  g.restore();

  setTimeout(clockdisp, 1);
}


$(window).on("orientationchange", function () {
  const modal = document.getElementById('rotmodal');
  if (isRot) {
    modal.style.display = 'block';
    isRot = false;
  } else {
    modal.style.display = 'none';
    isRot = true;
  }
});