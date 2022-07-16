<?php

$raw = file_get_contents('php://input');
//file_put_contents("record.json", $raw);

$write_file = 'record.json'; //書き込みファイル

if (filesize(record.json) == 0) {
  if (unlink($write_file)){
    echo "SUCCESS";
  }else{
    echo "FAILED";
  }
  if (rename("backup.txt", "record.json")){
    echo "SUCCESS";
  }else{
    echo "FAILED";
  }
}

$flg = copy('record.json', 'backup.txt');
if ($flg) {
  echo "SUCCESS";
} else {
  echo "FAILED";
}

try{

	//---------------------------------------
	// 書き込みファイルのオープン&ロック処理
	//---------------------------------------
	$fp_w = fopen($write_file, "wb");
	if(is_resource($fp_w) === true) {
		echo "書き込みファイルオープン成功 {$write_file}" . PHP_EOL;
		if (flock($fp_w, LOCK_EX) === true) { // ファイルをロックする(排他ロック)
			echo "書き込みファイルのロック成功 {$write_file}" . PHP_EOL;
		}else{
			throw new Exception("書き込みファイルのロック失敗 {$write_file}");
		}
	}else{
		throw new Exception("書き込みファイルオープン失敗 {$write_file}");
	}

		if(fwrite($fp_w, $raw) === false){
			throw new Exception("書き込みに失敗しました");
		}

	//---------------------------------------
	//終了後のチェック
	//---------------------------------------

	echo "書き込みファイルの行数: " . count(file($write_file)) . PHP_EOL;
	echo "正常終了" . PHP_EOL;

}catch(Exception $ex) {

	//---------------------------------------
	// エラー処理
	//---------------------------------------
	echo "エラーメッセージ: " . $ex->getMessage() . PHP_EOL;

} finally { //finallyはPHP5.5より

	//---------------------------------------
	// 後処理。正常終了・エラー終了のいずれにしても実行
	//---------------------------------------

	if (is_resource($fp_w) === true) {
		echo "書き込みファイルロック解除 {$write_file}" . PHP_EOL;
		flock($fp_w, LOCK_UN); //ロック解除
		echo "書き込みファイルクローズ {$write_file}" . PHP_EOL;
		fclose($fp_w);
	}

}

exit;
?>