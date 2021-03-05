window.onload = function () {
//console.log('xxxxxxxxxxxx');

const documentElement = document.documentElement;
const extension_check = new RegExp('([^\s]+(\\.(jpg|png|gif|jpeg|jpe|jfif|bmp|dib|ico|art|cam|cdr|cgm|cmp|dpx|fal|q0|fpx|j6i|mac|mag|maki|mng|pcd|pct|pic|pict|pcx|pmp|pnm|ras|sj1|tif|tiff|nsk|tga|wmf|wpg|xbm|xpm|pdf|docx|doc|xlsx|xls|ppt|pps|dcr|dir|dxr|dwt|fla|jxw|ppd|ps|eps|rtf|wri|exe|dll|com|ocx|sys|a|so|ai|psd|wave|aif|mp3|mp4|aac|flac|mid|midi|aif|aiff|aifc|au|snd|mov|qt|mpg|mpeg|wm|wma|wmv|asf|wax|wvx|asx|ra|rv|rm|ram|rmm|rpm|swf|avi|dvr-ms|scr|smi|smil|vdo|vrml|wrl|lzh|zip|cab|tar|gz|tgz|hqx|sit|Z|uu))$)', 'i');
var text_test = 'if(true){ i=1; }';
var text_list = [];
var text_list_element = 0;
var btn_typing_obj = document.getElementById('btn_typing');
var text_typing_obj = document.getElementById('text_typing');
var text_count = 0;
var text_position = 0;
var interval_id = 0;
var interval_count = 0;
var interval_timeout = 6;
//var key_sound = new Audio('../../sound/key_sound_p1.mp3');
var key_sound_list_element = 0;
var key_sound_list = [
    new Audio('../../sound/key_sound_p1.mp3'),
    new Audio('../../sound/key_sound_p2.mp3'),
    new Audio('../../sound/key_sound_p3.mp3'),
    new Audio('../../sound/key_sound_p4.mp3'),
    new Audio('../../sound/key_sound_p5.mp3'),
];
var key_sound_enter = new Audio('../../sound/key_sound_enter.mp3');
var key_sound_space = new Audio('../../sound/key_sound_space.mp3');
var key_sound_tab = new Audio('../../sound/key_sound_tab.mp3');

btn_typing_obj.addEventListener('click', function(){
    console.log('text_list', text_list);
    console.log('text_list.length', text_list.length);
    console.log('text_list[text_list_element].content.length', text_list[text_list_element].content.length);
    
    //文字数 × ミリ秒 = 総ミリ秒
    //総ミリ秒 / 1000 = ファイル総秒数
    //総秒数 × ファイル数 = 総ファイル数の秒数
    //総ファイル数の秒数 / 60 = 総ファイル数の分数
    //総ファイル数の分数 / 60 = 総ファイル数の時間
    
    //(((文字数 × ミリ秒) / 1000) × 60) × 60 = 総時間
    //var total_time = (((text_list[text_list_element].content.length * interval_timeout) / 1000) * 60) * 60;
    //console.log('total_time', total_time);
    
    //ファイル選択を非表示
    document.getElementById('input_box').style.display = 'none';
    
    //表示場所を表示
    document.getElementById('text_typing').style.display = 'block';
    
    //撮影用にインターバルを設ける
    setTimeout(runSetInterval, 1000);
    
    //interval_id = setInterval(runTypingAnimation, 1, text_typing_obj);
    //text_count++;
    //clearTimeout
    //setTimeout
    /*for (var i = 0; i < text_test.length; i++) {
        let char = text_test.charAt(i);
        text_typing_obj.innerHTML += char;
    }*/
});

//タイマー処理実行
function runSetInterval(){
    interval_id = setInterval(runTypingAnimation, interval_timeout, text_typing_obj);
}

//タイピングアニメーション実行
function runTypingAnimation(disp_obj){
    /*interval_count++;
    if(interval_count >= interval_timeout){
        console.log('interval_count', interval_count);
        interval_count = 0;
    }else{
        //return null;
    }*/
    //console.log('disp_obj', disp_obj);
    //console.log('text_position', text_position);
    
    //リストが要素数より多い、要素が存在しない場合
    if(
        text_list_element >= text_list.length 
        || typeof text_list[text_list_element].name === 'undefined' 
        || typeof text_list[text_list_element].content === 'undefined'
    ){
        //タイマー処理を終了する
        clearTimeout(interval_id);
    }else{
        
        //console.log('scrollHeight', documentElement.scrollHeight);
        //console.log('clientHeight', documentElement.clientHeight);
        //自動スクロール
        let bottom = documentElement.scrollHeight - documentElement.clientHeight;
        //console.log('bottom', bottom);
        window.scroll(0, bottom);
        
        //位置が最初の場合はファイル名を表示する
        if(text_position == 0){
            disp_obj.innerHTML += '$ '+text_list[text_list_element].name+"\n";
        }
        
        //指定箇所の文字取得
        //let char = text_test.charAt(text_position);
        let char = text_list[text_list_element].content.charAt(text_position);
        
        /*if(char == "\r" || char == "\r\n"){
            char = "\n";
        }*/
        /*if(char == "\n"){
            
        }else if(char == ' '){
            char = '&nbsp;';
        }else if(char == '	'){
            char = '&#009;';
        }else if(char == '"'){
            char = '&quot;';
        }else if(char == '&'){
            char = '&amp;';
        }else if(char == "'"){
            char = '&#x27;';
        }else if(char == '<'){
            char = '&lt;';
        }else if(char == '>'){
            char = '&gt;';
        }else if(char == '`'){
            char = '&#x60;';
        }*/
        
        disp_obj.innerHTML += char;
        /*
        if(text_position >= text_test.length){
            clearTimeout(interval_id);
            text_position = 0;
        }
        */
        
        //内容を全て表示した場合
        if(text_position >= text_list[text_list_element].content.length){
            //位置を初期化する
            text_position = 0;
            
            //リストの要素を増やす
            text_list_element++;
            
            //改行を入れる
            disp_obj.innerHTML += "\n";
            
            key_sound_enter.play();
        }else{
            //内容を表示中の場合は位置を増やす
            text_position++;
            
            if(char == "\n"){
                key_sound_enter.play();
            }else if(char == ' '){
                key_sound_space.play();
            }else if(char == '	'){
                key_sound_tab.play();
            }else{
                key_sound_list[key_sound_list_element].play();
                key_sound_list_element++;
                if(key_sound_list_element >= key_sound_list.length){
                    key_sound_list_element = 0;
                }
            }
        }
        
    }
}

//ファイルデータ取得
var upload_file_obj = document.getElementById('upload_file');
upload_file_obj.onchange = function(_e){
    //console.log(_e);
    //console.log(_e.target.files);
    //text_test = '';
    for(let i = 0;i < _e.target.files.length;i++){
        console.log(_e.target.files[i]);
        let file = _e.target.files[i];
        let file_reader = new FileReader();
        file_reader.onload = function () {
            //console.log(file.name);
            //console.log(file_reader.result);
            //text_test += file_reader.result;
            let name = file.name;
            if(extension_check.test(name)){
                console.log(file.name);
                return;
            }
            let content = file_reader.result;
            content = content.replace(/\r?\n/g, "\n");
            let file_info = {
                'name':name,
                'content':content
            };
            text_list.push(file_info);
        }
        file_reader.readAsText(file);
    }
}

//ディレクトリのファイルデータ取得
var upload_file_dir_obj = document.getElementById('upload_file_dir');
upload_file_dir_obj.onchange = function(_e){
    //console.log(_e);
    //console.log(_e.target.files);
    //text_test = '';
    for(let i = 0;i < _e.target.files.length;i++){
        //console.log(_e.target.files[i]);
        let file = _e.target.files[i];
        let file_reader = new FileReader();
        file_reader.onload = function () {
            //console.log(file.name);
            //console.log(file.webkitRelativePath);
            //console.log(file_reader.result);
            //text_test += file_reader.result;
            let name = file.webkitRelativePath;
            if(extension_check.test(name)){
                console.log(file.name);
                return;
            }
            let content = file_reader.result;
            content = content.replace(/\r?\n/g, "\n");
            let file_info = {
                'name':name,
                'content':content
            };
            text_list.push(file_info);
        }
        file_reader.readAsText(file);
    }
}

};