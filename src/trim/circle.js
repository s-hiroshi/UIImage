/**
 * 円形トリミング
 *
 * @module Trim
 * @class circle
 */
export default (function () {
    /**
     * 選択範囲表示
     *
     * @method openSelection
     * @public
     * @param {jQuery} elem 選択範囲オブジェクトです。
     */
    function openSelection( elem ) {
        const selection = (elem instanceof jQuery) ? elem : $(elem);
        selection.resizable();
        selection.draggable();
        selection.css( { 'display': 'block' } );
    }

    /**
     * 選択範囲削除
     *
     * @method closeSelection
     * @param {jQuery} elem 選択範囲オブジェクトです。
     */
    function closeSelection( elem ) {
        const selection = (elem instanceof jQuery) ? elem : $(elem);
        selection.css( 'display', 'none' );
    }

    /**
     * 選択範囲変更
     *
     * @method resizeSelection
     * @param {jQuery} rect トリミング範囲オブジェクトです。
     * @param {jQuery} rectWidth トリミング範囲 横設定input要素です。
     * @param {jQuery} rectHeight トリミング範囲 縦設定input要素です。
     */
    function resizeSelection( rect, rectWidth, rectHeight ) {
        rect = (rect instanceof jQuery) ? rect : $( rect );
        rectWidth = (rectWidth instanceof jQuery) ? rectWidth : $( rectWidth );
        rectHeight = (rectHeight instanceof jQuery) ? rectHeight : $( rectHeight );
        rectWidth.val( rect.width() );
        rectHeight.val( rect.height() );
    }

    /**
     * トリムエリア横幅設定
     *
     * @method setWidth
     * @public
     * @param {jQuery} elem トリミング範囲 横設定input要素です。
     * @param {jQuery} rect トリミング範囲オブジェクトです。
     */
    function setWidth( elem, rect ) {
        elem = (elem instanceof jQuery) ? elem : $( elem );
        rect = (rect instanceof jQuery) ? rect : $( rect );
        if ( elem.val() === '' ) {
            return false;
        }
        const width = parseInt( elem.val(), 10 );
        // キャスト(キャストできないときはエラーではなくNaNを返します)
        if (isNaN(width)) {
            alert( '数字を入力してください。' );
        }
        if ( (width > 0) === false ) {
            alert( '0より大きい整数を入力してください。' );
            return false;
        }
        rect.css( 'width', width + 'px' );
    }

    /**
     * トリムエリア縦幅設定
     *
     * @method setHeight
     * @public
     * @param {jQuery} elem トリミング範囲 縦設定input要素です。
     * @param {jQuery} rect トリミング範囲オブジェクトです。
     */
    function setHeight( elem, rect ) {
        elem = (elem instanceof jQuery) ? elem : $( elem );
        rect = (rect instanceof jQuery) ? rect : $( rect );
        if ( elem.val() === '' ) {
            return false;
        }
        /* キャスト(キャストできないときはエラーではなくNaNを返します) */
        const height = parseInt( elem.val(), 10 );
        if ( isNaN( height ) ) {
            alert( '数字を入力してください。' );
        }
        /* 0より大きい数字以外はアラート */
        if ( (height > 0) === false ) {
            alert( '0より大きい数字を入力してください。' );
            return false;
        }
        rect.css( 'height', height + 'px' );
    }

    /**
     * トリミング
     *
     * @method run
     * @param {HTMLCanvasElement} canvas canvas要素です。
     * @return {Function}
     */
    function run( canvas, selection ) {
        const ctx = canvas.getContext( '2d' );

        const bufferCanvas = document.createElement( 'canvas' );
        const bufferCtx = bufferCanvas.getContext( '2d' );
        bufferCtx.drawImage( canvas, 0, 0 );

        ctx.beginPath();
        ctx.rect( 0, 0, canvas.width, canvas.height );
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fill();

        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const radius = (x - y >= 0) ? x / 2 : y / 2;
        ctx.beginPath();
        ctx.arc( x, y, radius, 0, 2 * Math.PI, false );
        ctx.clip();
        /* ImageDataによる下記処理では正しくクリッピングできません。
         * 代わりにbufferCanvasを作成しdrawImageで描画しています。
         * const data = ctx.getImageData( 0, 0, canvas.width, canvas.height);
         * ctx.putImageData( data, 0, 0 );
         */
        ctx.drawImage( bufferCanvas, 0, 0 )

    }

    return {
        openSelection: openSelection,
        closeSelection: closeSelection,
        resizeSelection: resizeSelection,
        setWidth: setWidth,
        setHeight: setHeight,
        run: run
    }

}());

