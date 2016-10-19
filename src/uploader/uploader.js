/**
 * アップロード処理
 *
 * @module Uploader
 * @class uploader
 */
export default (function () {
    /**
     * オリジナル画像情報
     *
     * @property original
     * @private
     * @type {Object}
     */
    let original;
    
    function setOriginal(target) {
        original = target
    }
    
    /**
     * 圧縮方式検証
     *
     * png, jpegならばtrue。対応していないタイプならばアラートを表示してfalseを返します。
     * 
     * @method checkFormat
     * @public
     * @param {String} format 画像フォーマット
     * @return {Boolean}
     */
    function checkFormat( format ) {
        if ( format.match( /^image\/(png|jpeg)$/ ) === null ) {
            alert( 
                `対応していないファイル形式です。
                PNGまたはJPGファイルを選択してください。` 
            );
            return false;
        }
        return true;
    }

    /**
     * img要素画像データーをcanvasへ描画
     *
     * @method imgToCanvas
     * @private
     * @param {HTMLImgElement} img canvasへ描画するimg要素です。
     * @param {HTMLCanvasElement} canvas canvas要素です。
     */
    function imgToCanvas( img, canvas ) {
        return function () {
            try {
                let ctx = canvas.getContext( '2d' );
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.clearRect( 0, 0, canvas.width, canvas.height );
                ctx.drawImage( img, 0, 0 );
                $( img ).remove();
                // オリジナルデータ設定
                let originalData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
                original.setOriginalData( originalData );
                original.setOriginalWidth( canvas.width );
                original.setOriginalHeight( canvas.height )
            } catch ( e ) {
                alert( '画像をcanvasへ描画できませんでした。' );
                return false;
            }
        };
    }

    /**
     * 画像読込
     *
     * @method readFile
     * @private
     * @param {Object} reader FileReaderオブエジェクトです。
     * @param {HTMLCanvasElement} canvas canvas要素です。
     * @return {Function}
     */
    function readFile( reader, canvas ) {
        return function () {
            // 一時的にデータを読み込むimg要素を作成します。
            const img = $( '<img>' ).get( 0 );
            img.onload = imgToCanvas( img, canvas );
            img.setAttribute( 'src', reader.result );
        };
    }

    /**
     *  画像描画
     *
     * @method drawFile
     * @private
     * @param {Object} file アップロードする画像です。
     * @param {HTMLCanvasElement} canvas canvas要素です。
     */
    function drawFile( file, canvas ) {
        var reader = new FileReader();
        reader.onload = readFile( reader, canvas );
        reader.readAsDataURL( file );
    }


    /**
     * ドラッグアンドドロップ処理
     *
     * @method setDragDrop
     * @public
     * @param {HTMLCanvasElement} canvas canvas要素です。
     */
    function setDragDrop( canvas ) {
         // ドラッグイベントのdefault処理をキャンセルするためfalseを返します。
        canvas.ondragover = function () {
            return false;
        };
        canvas.ondrop = function ( evt ) {
            /* 選択したファイル情報 */
            let file;
            /* 対象canvas */
            if ( evt.dataTransfer.files.length === 0 ) {
                return false;
            }
            /* ドロップされたファイル情報 */
            file = evt.dataTransfer.files[0];
            /* ファイルタイプの確認 */
            if ( checkFormat( file.type ) === false ) {
                alert(
                    `対応していないファイル形式です。
                    PNGまたはjPGファイルを選択してください。`
                );

            }
            drawFile( file, canvas );
            return false;
        };
    }

    return {
        setOriginal: setOriginal,
        checkFormat: checkFormat,
        setDragDrop: setDragDrop,
        drawFile: drawFile
    }
}());

