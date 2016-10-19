/**
 * 画像データ
 * 
 * @module Data
 */
/**
 * オリジナル画像管理
 *
 * @class original
 */
export default (function () {
    /**
     * オリジナル画像のImageData
     *
     * @property originalData
     * @private
     * @type {ImageData}
     */
    let originalData;
    
    /**
     * ImageData設定
     *
     * @method setOriginalData
     * @public
     * @param {ImageData} imageData オリジナル画像のImageDataです。
     */
    function setOriginalData( imageData ) {
        originalData = imageData;
    }

    /**
     * オリジナル画像幅表示要素
     *
     * @property setWidthElem
     * @private
     * @type {jQuery}
     */
    let widthElem;
    
    /**
     * オリジナル画像幅表示要素設定
     *
     * @method setWidthElem
     * @public
     * @param {jQuery} target jQueryオブジェクトです。
     */
    function setWidthElem( target ) {
        target = (target instanceof jQuery) ? target : $( target );
        widthElem = target;
    }
    
    /**
     * オリジナル画像高さ表示要素
     * 
     * @property setWidthElem
     * @private
     * @type {jQuery}
     */
    let heightElem;
    
    /**
     * オリジナル画像高さ表示要素設定
     *
     * @method setWidthElem
     * @public
     * @param {jQuery} target jQueryオブジェクトです。
     */
    function setHeightElem(target) {
        heightElem = target;
    }

    /**
     * ImageData 取得
     *
     * @method getOriginalData
     * @public
     */
    function getOriginalData() {
        return originalData;
    }

    /**
     * ImageData 横幅設定
     *
     * @method setOriginalWidth
     * @public
     * @param {Number} canvasWidth canvasの横幅です。
     */
    function setOriginalWidth( canvasWidth ) {
        widthElem.val( canvasWidth );
    }

    /**
     * ImageData 高さ設定
     *
     * @method setOriginalHeight
     * @public
     * @param {Number} canvasHeight canvasの高さです。
     */
    function setOriginalHeight( canvasHeight ) {
        heightElem.val( canvasHeight );
    }

    return {
        setOriginalData: setOriginalData,
        getOriginalData: getOriginalData,
        setWidthElem: setWidthElem,
        setHeightElem: setHeightElem,
        setOriginalWidth: setOriginalWidth,
        setOriginalHeight: setOriginalHeight
    }
}());

