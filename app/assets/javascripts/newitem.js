$(function(){
  // 画像用のinputを生成する関数
  const buildFileField = (index)=> {
    const html = `<div data-index="${index}" class="js-file_group">
                    <input class="js-file hidden" type="file"
                    name="item[images_attributes][${index}][src]"
                    id="item_images_attributes_${index}_src"><br>
                    
                  </div>`;
    return html;
  }
 
  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url)=> {
    const html = `<div class='preview' data-index="${index}">
                    <img data-index="${index}" src="${url}" width="100px" height="100px">
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;
  }
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  
  $('#image-box').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    let nextIndex = $('.js-file[type="file"]:last').parent().data('index') +1;

    // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {  // 新規画像追加の処理
      $('#previews').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-box').append(buildFileField(nextIndex));
      // $('#image-box').append(buildFileField(fileIndex[0]));
      $('.label-box').attr('for', `item_images_attributes_${targetIndex+1}_src`);
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
    }
  });
  
  $('#image-box').on('click', '.js-remove', function(e) {
    e.stopPropagation();
    const targetIndex = $(this).parent().data('index');
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    const target = $(`#item_images_attributes_${targetIndex}_src`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    $(this).parent().remove();
    $(`img[data-index="${targetIndex}"]`).remove();
    target.remove()
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
});