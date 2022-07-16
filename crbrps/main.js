'use strict';

var round = 0;
var hands = ['グー', 'チョキ', 'パー'];
var mhand;
var cphand;
var rockprob = 5;
var scissorsprob;
var paperprob;
var sc = 0;
var scoredata = [];
var username;
var rank;

/*
let cookier = document.cookie;
let cookies = cookier.split(';');
let userid;
for (let i of cookies) {
  let iarr = i.split('=');
  if (iarr[0] == ' id') {
    userid = iarr[1];
  }
}
console.log(cookies);
*/

function fetchdata() {
  fetch('https://mkybdev.com/crbrps/record.json')
  .then(response => response.text())
  .then(data => {
    let tmp = JSON.stringify(data);
    let tmpp = JSON.parse(tmp);
    scoredata = JSON.parse(tmpp);
    /*
    scoredata.forEach((x) => {
      x.score = parseInt(x.score);
    });
    */
  })
  .catch(e => {
    console.log("エラー");
  });
}

function gamestart() {
  let el = document.getElementById("crh");
  el.src = "";
  el.style = "visibility: hidden";
  document.getElementById("message").innerHTML = "";
  document.getElementById("currscore").innerHTML = "スコア：" + sc + "pt";
  round++;
  document.getElementById("rnd").innerHTML = "ROUND:" + round;
  paperprob = -Math.exp(-0.1*(round-1)+3.9)+50;
  scissorsprob = 100-paperprob-rockprob;
  let ch = document.getElementById("crabhand");
  for (let j = 0; j < 3; j++) {
    document.getElementsByTagName('p')[j].style.display = "none";
  }
  ch.innerHTML = "<font face=\"PS\">ROUND " + round + "</font>";
  document.getElementById("currprob").innerHTML = "パーの確率：" + paperprob.toPrecision(2) + "％";
  setTimeout(game, 1500);
}

function gameend() {
  let el = document.getElementById("crh");
  el.src = "img/balloon.png";
  el.style = "visibility: visible; width: 20vh; height: 12.5vh;";
  document.getElementById("currscore").innerHTML = "";
  document.getElementById("currprob").innerHTML = "";
  document.getElementById("message").innerHTML = "";
  document.getElementById("crhw").style = "border: none; padding: 0; right: calc(50% - 17.5vh);";
  document.getElementById("rnd").innerHTML = "ゲーム終了";
  /*
  let highscore;
  let exch = scoredata.findIndex(({name}) => name == username);
  if (username == "anonymous") {
    scoredata.push({"name":"とくめいきぼう","score":sc,"id":userid});
  } else {
  if (exch < 0) {
    scoredata.push({"name":username,"score":sc,"id":userid});
    highscore = sc;
  } else {
    let tmp = scoredata[exch].score;
    if (sc > tmp) {
      scoredata.splice(exch, 1);
      scoredata.push({"name":username,"score":sc,"id":userid});
      highscore = sc;
    } else {
      highscore = tmp;
    }
  }
  }
  scoredata.sort(function (a, b) {
    if (a.score < b.score)
      return 1;
    if (a.score > b.score)
      return -1;
    return 0;
  });
  */
  let crank = 1;
  let score_10 = -1;
  rank = 0;
  let sctmp = Object.values(scoredata);
  let all = sctmp.length;
  sctmp.push(sc);
  sctmp.sort(function (a, b) {
    if (a < b)
      return 1;
    if (a > b)
      return -1;
    return 0;
  });
  for (let i = 0; i < all+1; i++) {
    if(i == 0) {
      crank = 1;
    } else if (sctmp[(i - 1)] > sctmp[i]) {
      crank = i + 1;
    }
    if (sctmp[i] == sc) {
    	rank = crank;
    }
    if (crank == 10 && score_10 < 0) {
    	score_10 = sctmp[i];
    }
  }
  let comment;
  if (rank == 1) {
    comment = "すごい！";
  } else if (rank == 2) {
    comment = "おめでとう！";
  } else if (rank == 3) {
    comment = "やったね！";
  } else if (rank < crank/2) {
    comment = "いい感じ！";
  } else if (rank == crank) {
    comment = "ざんねん！";
  } else {
    comment = "もう一息！";
  }
  document.getElementById("crab").innerHTML += "<div id=\"mes\">" + comment + "<br>" + rank + "位だよ！</div>";
  document.getElementById("mes").style = "position: absolute; width: 15vh; height: 12vh; right: calc(50% - 17vh); top: 0.25vh; color: black; font-size: 2.25vh; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: PM-B;";
  document.getElementById("message").style.lineHeight = "1.75";
  let ch = document.getElementById("crabhand");
  ch.style.fontSize = "3.25vh";
  document.getElementById("myhand").style.lineHeight = "1.5";
  let scstr = "今回のスコア：" + sc + "pt<br>(" + rank + "位 / " + crank + ")";
  if (rank > 10) {
  	let keyarr = Object.keys(scoredata);
  	let num;
  	for (let i = 100000; ; i++) {
  		if (keyarr.indexOf(String(i)) < 0) {
  			num = i;
  			break;
  		}
  	}
  	scoredata[num] = sc;
  	let scarr = Object.keys(scoredata).map((k)=>({key:k,value:scoredata[k]}));
  	scarr.sort(function (a, b) {
    		if (a.value < b.value) {
      			return 1;
      		}
    		if (a.value > b.value) {
      			return -1;
      		}
    		return 0;
  	});
  	scoredata = Object.assign({}, ...scarr.map((item) => ({
  		[item.key]: item.value,
  	})));
  	fetch('index.php', {
    		method: 'POST',
    		headers: { 'Content-Type': 'application/json' },
    		body: JSON.stringify(scoredata)
  	})
  	.then(response => response.json())
  	.then(res => {
    		console.log(res);
  	});
  	scstr += "<br><p id=\"tweet\" onclick=\"tweet();\"><i class=\"fa-brands fa-twitter\"></i> 結果をツイートする</p>";
  	document.getElementById("message").style.fontSize = "2.5vmax";
  	document.getElementById("message").innerHTML = "もう一度<br>プレイしますか？";
  	document.getElementById("myhand").innerHTML = "<a href=\"game.html\">&#9654; はい</a><a href=\"./\">&#9654; もどる</a>";
  } else {
  	document.getElementById("message").style.fontSize = "2vmax";
  	document.getElementById("message").innerHTML = "ランキングに名前を<br>登録しますか？<br>「いいえ」を押すと<br>「とくめい」<br>で登録されます";
  	let url = "https://mkybdev.com/crbrps/register.html";
  	let sccrp = (sc*255 + 11) * 7;
  	let rkcrp = (rank*127 + 13) * 11;
  	document.getElementById("myhand").innerHTML = "<a href=\"" + url + "?reg=true&score=" + sccrp + "&rank=" + rkcrp + "\">&#9654; はい</a><a href=\"" + url + "?reg=false&score=" + sccrp + "&rank=" + rkcrp + "\">&#9654; いいえ</a>";
  }
  ch.innerHTML = scstr;
}

function game() {
  sign(0, 1);
}

function sign(r, flag) {
  let el = document.getElementById("crh");
  el.src = "";
  el.style = "visibility: hidden";
  document.getElementById("message").innerHTML = "";
  let ch = document.getElementById("crabhand");
  let str;
  if (flag == 1) {
    str = "最初はグー";  
  } else {
    if (r) {
      str = "あいこで…";
    } else {
      str = "じゃんけん…";
    }
  }
  ch.innerHTML = str;
  flag--;
  const timeout = setTimeout(function(){sign(r, flag)}, 1000);
  if (flag < 0) {
    clearTimeout(timeout);
    wait();
  }
}

function wait() {
  for (let j = 0; j < 3; j++) {
    document.getElementsByTagName('p')[j].style.display = "block";
  }
  document.getElementById("message").innerHTML = "出す手を<br>えらんでね";
}

function hand(btnid) {
  mhand = btnid;
  //document.getElementById("currprob").innerHTML = "";
  let ch = document.getElementById("crabhand");
  for (let j = 0; j < 3; j++) {
    document.getElementsByTagName('p')[j].style.display = "none";
  }
  let prob = [[rockprob, 0], [scissorsprob, 1], [paperprob, 2]].sort(function(a, b){ return a[0]-b[0] });
  let tmp = Math.floor(Math.random()*100);
  let tmp_2 = 0;
  for (let prop = 0; prop < 3; prop++) {
    tmp_2 += prob[prop][0];
    if (tmp <= tmp_2) {
      cphand = prob[prop][1];
      break;
    }
  }
  let el = document.getElementById("crh");
  el.style = "visibility: visible";
  el.src = "img/" + cphand + ".png";
  ch.innerHTML = "ポン！";
  document.getElementById("message").innerHTML = "<p id=\"you\">あなた： </p><img id=\"hnd\" src=\"img/" + mhand + ".png\" height=\"40%\" style=\"padding-right: 40%;\">";
  document.getElementById("message").style.flexDirection = "row";
  document.getElementById("hnd").style = "margin: 0; padding: 0;";
  if (cphand == mhand) {
    if (cphand == 2) {
      sc += 10;
      setTimeout(function(){result("カニとじゃんけん<br>したらパー出されて<br>あいこだった<br>もう一度(+10pt)", 0)}, 1000);
    } else {
      setTimeout(function(){result("あいこです<br>もう一度", 0)}, 1000);
    }
  } else if ((cphand == 0 && mhand == 2) || (cphand == 1 && mhand == 0) || (cphand == 2 && mhand == 1)) {
    sc += 1;
    setTimeout(function(){result("あなたの勝ちです<br>次のROUNDに<br>進みます(+1pt)", 1)}, 1000);
  } else {
    setTimeout(function(){result("あなたの負けです", 2)}, 1000);
  }
}

function result(m, n) {
  document.getElementById("currscore").innerHTML = "スコア：" + sc + "pt";
  let ch = document.getElementById("crabhand");
  ch.innerHTML = m;
  if (n == 1) {
    setTimeout(gamestart, 2000);
  } else if (n == 0) {
    setTimeout(function(){sign(1, 0)}, 2000);
  } else {
    fetchdata();
    //const searchParams = new URLSearchParams(window.location.search)
    //username = searchParams.get('name');
    setTimeout(function(){gameend()}, 2000);
  }
}

function tweet() {
	let s = sc + "ptで" + rank + "位でした！あなたもカニとじゃんけんしよう！";
	let url = "https://mkybdev.com/crbrps/";
	url = "http://twitter.com/share?url=" + url + "&text=" + s;
		window.open(url,"_blank","width=600,height=300");
}