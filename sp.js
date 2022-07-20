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
setInterval(clock, 60000);

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