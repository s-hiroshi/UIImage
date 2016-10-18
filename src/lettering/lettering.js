/**
 * 文字入力
 *
 * @module Lettering
 * @class lettering
 */
export default (function () {

    function syncText( input, output ) {
        /* %TODO: 文字レイヤー(ドラッグ可能なDOM)を実装したときにレイヤーの文字を描画(同期)する処理 */
    }

    /**
     * テキストレイヤー非表示
     *
     * @method closeLayer
     */
    function closeLayer() {
            if (typeof textOutput !== 'undefined') {
                $(textOutput).remove();
            }
            if (typeof textTool !== 'undefined') {
                $(textTool).remove();
            }
    }

    /**
     * 要素の親要素に対する相対な位置を取得
     *
     * @method getPosition
     * @public
     * @param {jQuery} elem 位置を算出する要素のjQueryオブジェクトです
     * @return {Object} 親要素を基準にした相対位置を表すtopとleftを持つオブジェクトです。
     */
    function getPosition( elem ) {
        elem = (elem instanceof jQuery) ? elem : $( elem );
        return elem.position();
    }

    /**
     * テキストをcanvasへ描画
     *
     * @method draw
     * @param {HTMLCanvasElement} canvas canvas要素です。
     * @param {String} letter 表示文字です。
     * @param {Object} pos 文字表示位置です。
     * @param {Number} pos.top 上端です。
     * @param {Number} pos.left 左端です。
     * @param {String} color 文字色(HTML16進数カラー表記)です。
     * @param {Number} size 文字サイズです。
     * @param {Number} family フォントファミリーです。
     */
    function draw( canvas, letter, pos, color, size, family) {
        const ctx = canvas.getContext( '2d' );
        if ( letter === '' ) {
            return false;
        }
        ctx.font = `${size}px ${family}`;
        ctx.fillStyle = "#" + color;
        ctx.fillText( letter, pos.left, pos.top );
        return false;
    }

    return {
        getPosition: getPosition,
        draw: draw
    }

}());

