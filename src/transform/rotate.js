/**
 * アフィン変換
 *
 * @module Transform
 */
/**
 * アフィン変換 回転
 *
 * @class rotate
 */
export default (function () {
    /**
     * 回転
     *
     * @method rotate
     * @private
     * @param {Number} angle 度数
     * @param {HTMLCanvasElement} canvas canvas要素です。
     * @param {HtmlImageElement} img img要素オブジェクトです。
     */
    function rotate( angle, canvas, img ) {
        return function () {
            const ctx = canvas.getContext( '2d' );
            const width = canvas.width;
            const height = canvas.height;
            // 90度単位の回転なので縦横を入れ替えます。
            canvas.width = height;
            canvas.height = width;
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            // 回転
            ctx.translate( canvas.width / 2, canvas.height / 2 );
            ctx.rotate( angle * Math.PI / 180 );
            ctx.translate( -img.width / 2, -img.height / 2 );
            // 描画
            ctx.drawImage( img, 0, 0, img.width, img.height );
        };
    }

    /*
     * 回転フィルタを実行
     *
     * @method run
     * @param {Number} angle 度数です。
     * @param {CanvasRenderingContext2D} ctx canvasのcontextオブジェクトです。
     * @param {HtmlImageElement} img要素オブジェクトです。
     */
    function run( angle, canvas) {
        const canvasData = canvas.toDataURL();
        const img = $( '<img>' ).get( 0 );
        img.onload = rotate( angle, canvas, img );
        img.setAttribute( 'src', canvasData );
    }
    
    return {
        run: run
    }
}());

