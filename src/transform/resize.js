/**
 * アフィン変換
 * @module Transform
 */
/**
 * アフィン変換 リサイズ
 *
 * @class resize
 */
export default (function () {
    /**
     * リサイズ後の縦横を返す
     * 
     * リサイズ後の値として横縦両方がしていされているときは横を優先し計算します。。
     *
     * @method getFixSize
     * @private
     * @param {ImageData} imageData 画像のImageDataです。
     * @param {Object} size リサイズ後のサイズです。
     * @param {Number} size.width リサイズ後の幅です。
     * @param {Number} size.height リサイズ後の高さです。
     * @return {Object} リサイズ後の縦横を持つオブジェクトです。
     */
    function getFixSize( imageData, size ) {
        let scale;
        if (size.width !== "") {
            scale = size.width / imageData.width;
        } else {
           scale = size.height/ imageData.height; 
        }
        return {
            'width': Math.round( imageData.width * scale ),
            'height': Math.round( imageData.height * scale )
        };
    }

    /**
     * 画像を拡大・縮小し描画
     *
     * @method draw
     * @private
     * @param {HTMLCanvasElement} canvas 処理対象のcanvasです。
     * @param {Object} before リサイズ前の縦・横です。
     * @param {Object} after リサイズ後の縦・横です。
     */
    function draw( canvas, before, after ) {
        // 回転して描画
        // 1. 画像をimgに読み込む
        // 2. 現在のcanvasデータを一度img要素に読み込む
        // 3. canvasを変形
        // 4. imgデータをcanvasに再描画
        // 5. imgの削除
        var canvasData = canvas.toDataURL();
        var img = $( '<img>' ).get( 0 );
        img.onload = (function () {
            return function () {
                const ctx = canvas.getContext( '2d' );
                canvas.width = after.width;
                canvas.height = after.height;
                img.width = after.width;
                img.height = after.height;
                ctx.clearRect( 0, 0, canvas.width, canvas.height );
                ctx.drawImage( img, 0, 0, img.width, img.height );
                $( img ).remove();
            };
        }());
        img.setAttribute( 'src', canvasData );
    }

    /**
     * 入力検証
     *
     * @method validate
     * @public
     * @param {Object} size リサイズ後のサイズです。
     * @param {Number} size.width リサイズ後の幅です。
     * @param {Number} size.height リサイズ後の高さです。
     * @param {Boolean} ratio 縦横比固定にチェックがあればtrue, なければfalseです。
     * @param {Object} validation 入力検証オブジェクトです。
     * @return {Boolean} 正しければtrue, 誤りがあればfalseを返します。
     */
    function validate(size, ratio, validation) {
        if (ratio === false) {
            if (!validation.isMoreThan0(size.width) || ! validation.isMoreThan0(size.height)) {
                window.alert('横、縦へ0より大きな数を入力してください。')
                return false;
            }
        }
        if (ratio === true) {
           if (!validation.isNotEmpty(size.width) && !validation.isNotEmpty(size.height) ) {
               window.alert('横、縦のどちらか0より大きな数を入力してください。')
               return false;
           } 
        }
       return true; 
    }

    /**
     * リサイズフィルタ実行
     *
     * @method run
     *
     * @param {HTMLCanvasElement} canvas 処理対象のcanvasです。
     * @param {Object} size key/value。
     * @param {Number} size.width リサイズ後の幅です。
     * @param {Number} size.height リサイズ後の高さです。
     * @param {boolean} ratio 縦横比固定フラグです。
     * @return {Boolean} 処理を失敗したときはfalseを返します。
     */
    function run( canvas, size, ratio ) {
        const before = {
            width: canvas.width,
            height: canvas.height
        };
        let after;
        if ( ratio === true ) {
            after = getFixSize( canvas, size );
        } else {
            after = size;
        }
        draw( canvas, before, after );
    }

    return {
        run: run,
        validate: validate
    }
}());

