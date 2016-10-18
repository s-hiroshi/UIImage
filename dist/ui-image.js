(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * フィルター
 * 
 * @module Filter
 */
/**
 * 空間フィルター境界処理
 *
 * @class boundary
 */

exports.default = function () {
    /**
     * 境界処理
     *
     * 境界で近傍のピクセルがないときは対角のピクセルを処理します。そのためのカウンタを返します。
     * 境界処理は左上端, 左下端, 右上端, 右下端, 左端、右端、上端、下端で処理を分ける。
     *
     * @method expandedIndex
     * @param {Number} k 注目ピクセルのRGBAのRed値インデックス
     * @param {Number} i 空間フィルターの行方向カウンタ
     * @param {Number} j 空間フィルターの列方向カウンタ
     * @param {ImageData} {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object}
     *
     */
    function expandedIndex(k, i, j, imageData) {

        // imageData.data配列の長さ
        var length = imageData.width * imageData.height * 4;

        // 左上端
        if (k === 0) {
            if (i === -1 && j === -1) {
                return {
                    i: -i,
                    j: -j
                };
            }
            if (i === -1 && j === 0) {
                return {
                    i: -i,
                    j: j
                };
            }
            if (i === -1 && j === 1) {
                return {
                    i: -i,
                    j: j
                };
            }
            if (i === 0 && j === -1) {
                return {
                    i: i,
                    j: -j
                };
            }
            if (i === 1 && j === -1) {
                return {
                    i: i,
                    j: -j
                };
            }
            // 境界じゃないのでそのまま返す
            return {
                i: i,
                j: j
            };
        }
        // 左下端
        if (k === length - imageData.width * 4) {
            if (i === -1 && j === -1) {
                return {
                    i: i,
                    j: -j
                };
            }
            if (i === 0 && j === -1) {
                return {
                    i: i,
                    j: -j
                };
            }
            if (i === 1 && j === -1) {
                return {
                    i: -i,
                    j: -j
                };
            }
            if (i === 1 && j === 0) {
                return {
                    i: -i,
                    j: j
                };
            }
            if (i === 1 && j === 1) {
                return {
                    i: -i,
                    j: j
                };
            }
            // 境界じゃないのでそのまま返す
            return {
                i: i,
                j: j
            };
        }
        // 右上端
        if (k === (imageData.width - 1) * 4) {
            if (i === -1 && j === -1) {
                return {
                    i: -i,
                    j: j
                };
            }
            if (i === -1 && j === 0) {
                return {
                    i: -i,
                    j: j
                };
            }
            if (i === -1 && j === 1) {
                return {
                    i: -i,
                    j: -j
                };
            }
            if (i === 0 && j === 1) {
                return {
                    i: i,
                    j: -j
                };
            }
            if (i === 1 && j === 1) {
                return {
                    i: i,
                    j: -j
                };
            }
            return {
                i: i,
                j: j
            };
        }
        // 右下端
        if (k === length - 4) {
            if (i === -1 && j === 1) {

                return {
                    i: i,
                    j: -j
                };
            }
            if (i === 0 && j === 1) {
                return {
                    i: i,
                    j: -j
                };
            }
            if (i === 1 && j === -1) {
                return {
                    i: -i,
                    j: j
                };
            }
            if (i === 1 && j === 0) {
                return {
                    i: -i,
                    j: j
                };
            }
            if (i === 1 && j === 1) {
                return {
                    i: -i,
                    j: -j
                };
            }
            // 境界じゃないのでそのまま返す
            return {
                i: i,
                j: j
            };
        }
        // 左端
        if (k % (imageData.width * 4) === 0) {
            if (j === -1) {
                return {
                    i: i,
                    j: -j
                };
            }
            return {
                i: i,
                j: j
            };
        }
        // 右端
        if ((length - 4 - k) % imageData.width * 4 === 0) {
            if (j === 1) {
                return {
                    i: i,
                    j: -j
                };
            }
            return {
                i: i,
                j: j
            };
        }
        // 上端
        if (k < imageData.width * 4) {
            if (i === -1) {
                return {
                    i: -i,
                    j: j
                };
            }
            return {
                i: i,
                j: j
            };
        }
        // 下端
        if (k > length - 1 - imageData.width * 4) {
            if (i === 1) {
                return {
                    i: -i,
                    j: j
                };
            }
            return {
                i: i,
                j: j
            };
        }

        // 境界ではないのでインデックス変わらない
        return {
            i: i,
            j: j
        };
    }
    return {
        expandedIndex: expandedIndex
    };
}();

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * フィルター
 *
 * @module Filter
 */
/**
 * フィルター
 *
 * @class filters
 */
exports.default = function () {
  /**
   * 線形フィルター
   *
   * @property linearFilter
   * @private
   * @type {Object}
   */
  var linearFilter = void 0;

  /**
   * 線形フィルター設定
   *
   * @method run
   * @param {Object} filter 空間フィルターオブジェクトです。
   */
  function setLinearFilter(filter) {
    linearFilter = filter;
  }

  /**
   * 空間フィルター
   *
   * @property linearFilter
   * @private
   * @type {Object}
   */
  var spatialFilter = void 0;

  /**
   * 空間フィルター設定
   *
   * @method run
   * @param {Object} filter 空間フィルターオブジェクトです。
   */
  function setSpatialFilter(filter) {
    spatialFilter = filter;
  }

  /**
   * フィルター処理
   *
   * @method run
   * @param {String} name filter name
   * @param {Number} k ImageData.dataの処理rgbaのred値に対応するインデックス<br>
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object | Boolean} rgbaの値を格納したオブジェクト。フィルターがないときはfalseを返す。
   */
  function run(k, imageData, name) {
    if (linearFilter.is(name) === true) {
      return linearFilter.run(k, imageData, name);
    }
    if (spatialFilter.is(name) === true) {
      return spatialFilter.run(k, imageData, name);
    }
    return false;
  }
  return {
    setLinearFilter: setLinearFilter,
    setSpatialFilter: setSpatialFilter,
    run: run
  };
}();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * フィルター
 *
 * @module Filter
 */
/**
 * 線形フィルター
 *
 * @class linearFilter
 */
exports.default = function () {
  var filters = {};
  /**
   * 反転
   *
   * @method reverse
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['reverse'] = function (i, imageData) {
    var rgba = {};
    rgba.r = 255 - imageData.data[i];
    rgba.g = 255 - imageData.data[i + 1];
    rgba.b = 255 - imageData.data[i + 2];
    rgba.a = imageData.data[i + 3];
    return rgba;
  };

  /**
   * 2値画像
   *
   * @method mono
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['mono'] = function (i, imageData) {
    var rgba = {};
    var color = parseInt((imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3, 10);
    color = color < 128 ? 0 : 255;
    rgba.r = rgba.g = rgba.b = color;
    rgba.a = imageData.data[i + 3];
    return rgba;
  };

  /**
   * グレースケール(単純平均)
   *
   * @method simpleGrayscale.
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['simpleGrayscale'] = function (i, imageData) {
    var rgba = {};
    var average = parseInt((imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3, 10);
    rgba.r = rgba.g = rgba.b = average;
    rgba.a = imageData.data[i + 3];
    return rgba;
  };

  /**
   * グレースケール(NTSC系加重平均法)
   *
   * @method grayscale
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['grayscale'] = function (i, imageData) {
    var rgba = {};
    var color = parseInt((imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3, 10);
    rgba.r = rgba.g = rgba.b = color;
    rgba.a = imageData.data[i + 3];
    return rgba;
  };

  /**
   * 明るく
   *
   * @method bright
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   *     alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['bright'] = function (i, imageData) {
    var rgba = {};
    var inc = 4;
    rgba.r = imageData.data[i] + inc < 255 ? imageData.data[i] + inc : 255;
    /* Red */
    rgba.g = imageData.data[i + 1] + inc < 255 ? imageData.data[i + 1] + inc : 255;
    /* Green */
    rgba.b = imageData.data[i + 2] + inc < 255 ? imageData.data[i + 2] + inc : 255;
    /* Blue */
    rgba.a = imageData.data[i + 3];
    /* alpha */
    return rgba;
  };

  /**
   * sepia セピア
   *
   * @method filters.sepia.
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['sepia'] = function (i, imageData) {
    var rgba = {};
    // グレースケールへ
    var average = parseInt(imageData.data[i] * 0.298912 + imageData.data[i + 1] * 0.586611 + imageData.data[i + 2] * 0.114478, 10);
    rgba.r = rgba.g = rgba.b = average;
    rgba.a = imageData.data[i + 3];
    // セピアへ
    rgba.r *= 0.9;
    rgba.g *= 0.7;
    rgba.b *= 0.4;
    return rgba;
  };

  /**
   * 赤を増やす
   *
   * @method red
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['red'] = function (i, imageData) {
    var rgba = {};
    rgba.r = imageData.data[i];
    rgba.r = rgba.r < 250 ? rgba.r + 5 : 255;
    rgba.g = imageData.data[i + 1];
    rgba.b = imageData.data[i + 2];
    rgba.a = imageData.data[i + 3];
    return rgba;
  };

  /**
   * グリーンを増やす
   *
   * @method green
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['green'] = function (i, imageData) {
    var rgba = {};
    rgba.r = imageData.data[i];
    rgba.g = imageData.data[i + 1];
    rgba.g = rgba.g < 250 ? rgba.g + 5 : 255;
    rgba.b = imageData.data[i + 2];
    rgba.a = imageData.data[i + 3];
    return rgba;
  };

  /**
   * 青を増やす
   *
   * @method blue
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   *     + Red   i
   *     + Green i + 1
   *     + Blue  i + 2
   *     + Alpha i + 3
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  filters['blue'] = function (i, imageData) {
    var rgba = {};
    rgba.r = imageData.data[i];
    rgba.g = imageData.data[i + 1];
    rgba.b = imageData.data[i + 2];
    rgba.b = rgba.b < 250 ? rgba.b + 5 : 255;
    rgba.a = imageData.data[i + 3];
    return rgba;
  };

  /**
   * フィルターの存在を確認
   * @method is
   * @param {String} name フィルター名です。
   * @return {Boolean} フィルターがあればtrue、フィルターがないときはfalseを返します。
   */
  function is(name) {
    return typeof filters[name] === 'function';
  }

  /**
   * フィルター呼び出し処理
   * @method perform
   * @private
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @param {String} name フィルター名です。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  function perform(i, imageData, name) {
    return filters[name](i, imageData);
  }

  /**
   * フィルター処理
   *
   * @method run
   * @param {Number} i 画像データ(ImageData.data)のインデックスです。
   * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
   * @param {String} name フィルター名です。
   * @return {Object} rgbaの値を持つオブジェクトです。
   */
  function run(i, imageData, name) {
    return perform(i, imageData, name);
  }

  return {
    is: is,
    run: run
  };
}();

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * フィルター
 *
 * @module Filter
 */
/**
 * 空間フィルター
 *
 * @class spatialFilter
 */
exports.default = function () {
    /**
     * 境界処理
     *
     * @property boundary
     * @private
     * @type {Object}
     */
    var boundary = void 0;

    /**
     * 境界処理設定
     *
     * @method setBoundary
     * @public
     * @param {Object} target 境界判定オブジェクトです。
     */
    function setBoundary(target) {
        boundary = target;
    }

    /**
     * 空間フィルターのオペレーター
     *
     * @property operator
     * @private
     * @type {Object}
     */
    var operator = {
        smooth: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], // 平滑化
        mean: [1 / 16, 2 / 16, 1 / 16, 2 / 16, 4 / 16, 2 / 16, 1 / 16, 2 / 16, 1 / 16], // 平滑化(加重平均)
        sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0], // 先鋭化
        sharpen2: [-1, -1, -1, -1, 9, -1, -1, -1, -1], // 先鋭化2
        differentialH: [0, 0, 0, 0, -1, 1, 0, 0, 0], // 横方向一次微分フィルター
        differentialV: [0, 1, 0, 0, -1, 0, 0, 0, 0], // 横方向一次微分フィルター
        prewitt: [-1, 0, 1, -1, 0, 1, -1, 0, 1], // Prewittフィルター
        sobel: [-1, 0, 1, -2, 0, 2, -1, 0, 1], // Sobelフィルター
        emboss: [1, 0, 0, 0, -1, 0, 0, 0, 0] // Embossフィルター
    };

    /**
     * 空間フィルター
     *
     * @method filter
     * @param {Number} k 画像データ(ImageData.data)のインデックスです。
     *     + red   k 注目ピクセルのRed値に対応するImageData.dataのインデックス<br>
     *     + green k + 1
     *     + blue  k + 2
     *     + alpha k + 3
     * @param {Object} imageData
     * @param {String} name フィルター名
     * @return {Object}
     */
    function filter(k, imageData, name) {
        if (operator[name] instanceof Array === false) {
            throw new Error('フィルターがありません。');
        }
        var rgba = {};
        rgba.r = rgba.g = rgba.b = 0;
        var i,
            j,
            n,
            count = 0,
            index = {};
        for (i = -1; i <= 1; i++) {
            for (j = -1; j <= 1; j++) {
                index = boundary.expandedIndex(k, i, j, imageData);
                n = k + (index.i * 3 + index.j) * 4;
                rgba.r += parseInt(operator[name][count] * imageData.data[n], 10);
                rgba.g += parseInt(operator[name][count] * imageData.data[n + 1], 10);
                rgba.b += parseInt(operator[name][count] * imageData.data[n + 2], 10);
                count++;
            }
        }
        rgba.a = imageData.data[k + 3];
        return rgba;
    }

    /**
     * フィルター存在確認
     *
     * @method is
     * @public
     * @param {String} name フィルター名です。
     * @return {Boolean} フィルターがあればtrue、フィルターがないときはfalseを返します。
     */
    function is(name) {
        return $.inArray(name, operator) !== false;
    }

    /**
     * フィルター実行
     *
     * @method run
     * @public
     *
     * @param {String} name フィルター名です。
     * @param {Number} i ImageData.dataの処理。rgbaのred値に対応するインデックスです。
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgba値を持つオブジェクトです。
     */
    function run(i, imageData, name) {
        return filter(i, imageData, name);
    }

    return {
        setBoundary: setBoundary,
        is: is,
        run: run
    };
}();

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
exports.default = function () {
  /**
   * オリジナル画像のImageData
   *
   * @property originalData
   * @private
   * @type {ImageData}
   */
  var originalData = void 0;

  /**
   * ImageData設定
   *
   * @method setOriginalData
   * @public
   * @param {ImageData} imageData オリジナル画像のImageDataです。
   */
  function setOriginalData(imageData) {
    originalData = imageData;
  }

  /**
   * オリジナル画像幅表示要素
   *
   * @property setWidthElem
   * @private
   * @type {jQuery}
   */
  var widthElem = void 0;

  /**
   * オリジナル画像幅表示要素設定
   *
   * @method setWidthElem
   * @public
   * @param {jQuery} target jQueryオブジェクトです。
   */
  function setWidthElem(target) {
    target = target instanceof jQuery ? target : $(target);
    widthElem = target;
  }

  /**
   * オリジナル画像高さ表示要素
   * 
   * @property setWidthElem
   * @private
   * @type {jQuery}
   */
  var heightElem = void 0;

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
  function setOriginalWidth(canvasWidth) {
    widthElem.val(canvasWidth);
  }

  /**
   * ImageData 縦幅設定
   *
   * @method setOriginalHeight
   * @public
   * @param {Number} canvasHeight canvasの横幅です。
   */
  function setOriginalHeight(canvasHeight) {
    heightElem.val(canvasHeight);
  }

  return {
    setOriginalData: setOriginalData,
    getOriginalData: getOriginalData,
    setWidthElem: setWidthElem,
    setHeightElem: setHeightElem,
    setOriginalWidth: setOriginalWidth,
    setOriginalHeight: setOriginalHeight
  };
}();

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * フィルター
 *
 * @module Filter
 */
/**
 * 画像の各ピクセルへフィルターを提要
 *
 * @class processing
 */
exports.default = function () {
    /**
     * フィルターオブジェクト
     *
     * @property filter
     * @private
     * @type {Object}
     */
    var filter = void 0;

    /**
     * フィルター設定
     *
     * @method setFilter
     * @public
     * @param {Object} target filterオブジェクトです。
     */
    function setFilter(target) {
        filter = target;
    }

    /**
     * フィルターを適用したデータを返す
     *
     * @method run
     * @public
     * @param {ImageData} imageData フィルター適用するImageDataです。
     * @param {String} name 適用するフィルター名です。
     * @return {Array} フィルター適用後のRGBA値を持つデータ配列です。
     */
    function run(imageData, name) {
        // 全ピクセルを走査しピクセルごとにフィルター処理を呼び出す
        var i,
            j,
            k,
            rgba = {},
            data = [];
        // 行
        for (i = 0; i < imageData.height; i++) {
            // 列
            for (j = 0; j < imageData.width; j++) {
                k = (i * imageData.width + j) * 4;
                rgba = filter.run(k, imageData, name);
                data[k] = rgba.r;
                data[k + 1] = rgba.g;
                data[k + 2] = rgba.b;
                data[k + 3] = rgba.a;
            }
        }
        return data;
    }

    return {
        setFilter: setFilter,
        run: run
    };
}();

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * 文字入力
 *
 * @module Lettering
 * @class lettering
 */
exports.default = function () {

    function syncText(input, output) {}
    /* %TODO: 文字レイヤー(ドラッグ可能なDOM)を実装したときにレイヤーの文字を描画(同期)する処理 */


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
    function getPosition(elem) {
        elem = elem instanceof jQuery ? elem : $(elem);
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
    function draw(canvas, letter, pos, color, size, family) {
        var ctx = canvas.getContext('2d');
        if (letter === '') {
            return false;
        }
        ctx.font = size + 'px ' + family;
        ctx.fillStyle = "#" + color;
        ctx.fillText(letter, pos.left, pos.top);
        return false;
    }

    return {
        getPosition: getPosition,
        draw: draw
    };
}();

},{}],8:[function(require,module,exports){
'use strict';

var _original = require('./data/original.js');

var _original2 = _interopRequireDefault(_original);

var _uploader = require('./uploader/uploader.js');

var _uploader2 = _interopRequireDefault(_uploader);

var _resize = require('./transform/resize.js');

var _resize2 = _interopRequireDefault(_resize);

var _rotate = require('./transform/rotate.js');

var _rotate2 = _interopRequireDefault(_rotate);

var _validation = require('./validation/validation.js');

var _validation2 = _interopRequireDefault(_validation);

var _boundary = require('./Filter/boundary.js');

var _boundary2 = _interopRequireDefault(_boundary);

var _linearfilter = require('./Filter/linearfilter.js');

var _linearfilter2 = _interopRequireDefault(_linearfilter);

var _spatialfilter = require('./Filter/spatialfilter.js');

var _spatialfilter2 = _interopRequireDefault(_spatialfilter);

var _filters = require('./Filter/filters.js');

var _filters2 = _interopRequireDefault(_filters);

var _processing = require('./filter/processing.js');

var _processing2 = _interopRequireDefault(_processing);

var _trim = require('./trim/trim.js');

var _trim2 = _interopRequireDefault(_trim);

var _lettering = require('./lettering/lettering.js');

var _lettering2 = _interopRequireDefault(_lettering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = $('#canvas').get(0);
var ctx = canvas.getContext('2d');

_original2.default.setWidthElem($('#original-width'));
_original2.default.setHeightElem($('#original-height'));

_uploader2.default.setOriginal(_original2.default);
_uploader2.default.setDragDrop(canvas);

_spatialfilter2.default.setBoundary(_boundary2.default);

_filters2.default.setLinearFilter(_linearfilter2.default);
_filters2.default.setSpatialFilter(_spatialfilter2.default);

_processing2.default.setFilter(_filters2.default);


/*
 * 画像アップロード
 */
$('#uploader').bind('change', function () {
    var file = this.files[0];
    if (_uploader2.default.checkFormat(file.type) === false) {
        alert('対応していないファイル形式です。\nファイルはPNG, JPEG, GIFに対応しています。');
    }
    _uploader2.default.drawFile(file, canvas);
});

/*
 * オリジナル表示
 */
$('#original').on('click', function () {
    var originalData = _original2.default.getOriginalData();
    canvas.width = originalData.width;
    canvas.height = originalData.height;
    ctx.clearRect(0, 0, originalData.width, _original2.default.height);
    ctx.putImageData(originalData, 0, 0);
    $('#original-width').val(originalData.width);
    $('#original-height').val(originalData.height);
});

/*
 * アフィン変換
 */
$('#resize').on('click', function () {
    // リサイズ
    var size = {
        "width": $('#width').val(),
        "height": $('#height').val()
    };
    var ratio = $('#ratio').is(':checked');
    if (!_resize2.default.validate(size, ratio, _validation2.default)) {
        return false;
    }
    _resize2.default.run(canvas, size, ratio);
    return false;
});
$('#rotate-right').on('click', function () {
    // 右90度回転
    _rotate2.default.run(90, canvas);
    return false;
});
$('#rotate-left').on('click', function () {
    // 左90度回転
    _rotate2.default.run(-90, canvas);
    return false;
});

/*
 * フィルター処理
 */
$('.filtering').on('click', function () {
    var name = $(this).attr('id');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageData.data.set(_processing2.default.run(imageData, name));
    ctx.putImageData(imageData, 0, 0);
    return false;
});

/*
 * トリミング
 */
$('#open-trim-selection').on('click', function () {
    _trim2.default.openSelection($("#trim-selection"));
    return false;
});
$('#close-trim-selection').on(function () {
    _trim2.default.closeSelection($("#trim-selection"));
    return false;
});
$('#trim-selection').on('resize', function () {
    _trim2.default.resizeSelection($("#trim-width"), $("#trim-height"), $("#trim-selection"));
    return false;
});
$('#trim-width').on('keyup', function () {
    _trim2.default.setWidth($(this), $('#trim-selection'));
    return false;
});
$('#trim-height').on('keyup', function () {
    _trim2.default.setHeight($(this), $('#trim-selection'));
    return false;
});
$('#trimming').on('click', function () {
    _trim2.default.run(canvas, $("#trim-selection"));
    return false;
});

/*
 * 文字入力
 */
$('.lettering').on('click', function () {
    var letter = $('.lettering-input').val();
    var pos = {
        top: $('.lettering-top').val(),
        left: $('.lettering-left').val()
    };
    var size = $('.lettering-size').val();
    var color = $('.lettering-color').val();
    var family = 'sans-serif';
    _lettering2.default.draw(canvas, letter, pos, color, size, family);
    return false;
});

/*
 * 保存
 */
$('#save').on('click', function () {
    $('#save-dialog img').remove();
    var canvasData = canvas.toDataURL();
    var width = canvas.width + 40;
    var height = canvas.height + 80;
    $('#save-dialog').dialog({
        width: width,
        height: height
    });
    var img = $('<img>');
    img.width = canvas.width;
    img.height = canvas.height;
    img.appendTo($('#save-dialog'));
    img.get(0).setAttribute('src', canvasData);
});

},{"./Filter/boundary.js":1,"./Filter/filters.js":2,"./Filter/linearfilter.js":3,"./Filter/spatialfilter.js":4,"./data/original.js":5,"./filter/processing.js":6,"./lettering/lettering.js":7,"./transform/resize.js":9,"./transform/rotate.js":10,"./trim/trim.js":11,"./uploader/uploader.js":12,"./validation/validation.js":13}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * アフィン変換
 * @module Transform
 */
/**
 * アフィン変換 リサイズ
 *
 * @class resize
 */
exports.default = function () {
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
    function getFixSize(imageData, size) {
        var scale = void 0;
        if (size.width !== "") {
            scale = size.width / imageData.width;
        } else {
            scale = size.height / imageData.height;
        }
        return {
            'width': Math.round(imageData.width * scale),
            'height': Math.round(imageData.height * scale)
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
    function draw(canvas, before, after) {
        // 回転して描画
        // 1. 画像をimgに読み込む
        // 2. 現在のcanvasデータを一度img要素に読み込む
        // 3. canvasを変形
        // 4. imgデータをcanvasに再描画
        // 5. imgの削除
        var canvasData = canvas.toDataURL();
        var img = $('<img>').get(0);
        img.onload = function () {
            return function () {
                var ctx = canvas.getContext('2d');
                canvas.width = after.width;
                canvas.height = after.height;
                img.width = after.width;
                img.height = after.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, img.width, img.height);
                $(img).remove();
            };
        }();
        img.setAttribute('src', canvasData);
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
            if (!validation.isMoreThan0(size.width) || !validation.isMoreThan0(size.height)) {
                window.alert('横、縦へ0より大きな数を入力してください。');
                return false;
            }
        }
        if (ratio === true) {
            if (!validation.isNotEmpty(size.width) && !validation.isNotEmpty(size.height)) {
                window.alert('横、縦のどちらか0より大きな数を入力してください。');
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
    function run(canvas, size, ratio) {
        var before = {
            width: canvas.width,
            height: canvas.height
        };
        var after = void 0;
        if (ratio === true) {
            after = getFixSize(canvas, size);
        } else {
            after = size;
        }
        draw(canvas, before, after);
    }

    return {
        run: run,
        validate: validate
    };
}();

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
exports.default = function () {
    /**
     * 回転
     *
     * @method rotate
     * @private
     * @param {Number} angle 度数
     * @param {HTMLCanvasElement} canvas canvas要素です。
     * @param {HtmlImageElement} img img要素オブジェクトです。
     */
    function rotate(angle, canvas, img) {
        return function () {
            var ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            // 90度単位の回転なので縦横を入れ替えます。
            canvas.width = height;
            canvas.height = width;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 回転
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-img.width / 2, -img.height / 2);
            // 描画
            ctx.drawImage(img, 0, 0, img.width, img.height);
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
    function run(angle, canvas) {
        var canvasData = canvas.toDataURL();
        var img = $('<img>').get(0);
        img.onload = rotate(angle, canvas, img);
        img.setAttribute('src', canvasData);
    }

    return {
        run: run
    };
}();

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * トリミング
 *
 * @module Trim
 * @class trim
 */
exports.default = function () {
    /**
     * 選択範囲表示
     *
     * @method openSelection
     * @public
     * @param {jQuery} elem 選択範囲オブジェクトです。
     */
    function openSelection(elem) {
        var selection = elem instanceof jQuery ? elem : $(elem);
        selection.resizable();
        selection.draggable();
        selection.css({ 'display': 'block' });
    }

    /**
     * 選択範囲削除
     *
     * @method closeSelection
     * @param {jQuery} elem 選択範囲オブジェクトです。
     */
    function closeSelection(elem) {
        var selection = elem instanceof jQuery ? elem : $(elem);
        selection.css('display', 'none');
    }

    /**
     * 選択範囲変更
     *
     * @method resizeSelection
     * @param {jQuery} rect トリミング範囲オブジェクトです。
     * @param {jQuery} rectWidth トリミング範囲 横設定input要素です。
     * @param {jQuery} rectHeight トリミング範囲 縦設定input要素です。
     */
    function resizeSelection(rect, rectWidth, rectHeight) {
        rect = rect instanceof jQuery ? rect : $(rect);
        rectWidth = rectWidth instanceof jQuery ? rectWidth : $(rectWidth);
        rectHeight = rectHeight instanceof jQuery ? rectHeight : $(rectHeight);
        rectWidth.val(rect.width());
        rectHeight.val(rect.height());
    }

    /**
     * トリムエリア横幅設定
     *
     * @method setWidth
     * @public
     * @param {jQuery} elem トリミング範囲 横設定input要素です。
     * @param {jQuery} rect トリミング範囲オブジェクトです。
     */
    function setWidth(elem, rect) {
        elem = elem instanceof jQuery ? elem : $(elem);
        rect = rect instanceof jQuery ? rect : $(rect);
        if (elem.val() === '') {
            return false;
        }
        var width = parseInt(elem.val(), 10);
        // キャスト(キャストできないときはエラーではなくNaNを返します)
        if (isNaN(width)) {
            alert('数字を入力してください。');
        }
        if (width > 0 === false) {
            alert('0より大きい整数を入力してください。');
            return false;
        }
        rect.css('width', width + 'px');
    }

    /**
     * トリムエリア縦幅設定
     *
     * @method setHeight
     * @public
     * @param {jQuery} elem トリミング範囲 縦設定input要素です。
     * @param {jQuery} rect トリミング範囲オブジェクトです。
     */
    function setHeight(elem, rect) {
        elem = elem instanceof jQuery ? elem : $(elem);
        rect = rect instanceof jQuery ? rect : $(rect);
        if (elem.val() === '') {
            return false;
        }
        /* キャスト(キャストできないときはエラーではなくNaNを返します) */
        var height = parseInt(elem.val(), 10);
        if (isNaN(height)) {
            alert('数字を入力してください。');
        }
        /* 0より大きい数字以外はアラート */
        if (height > 0 === false) {
            alert('0より大きい数字を入力してください。');
            return false;
        }
        rect.css('height', height + 'px');
    }

    /**
     * トリミング
     *
     * @method run
     * @param {HTMLCanvasElement} canvas canvas要素です。
     * @param {jQuery} selection 選択範囲オブジェクトです。
     * @param {jQuery} parent 選択範囲オブジェクトの親オブジェクトです。
     * @return {Function}
     */
    function run(canvas, selection) {
        var ctx = canvas.getContext('2d');
        var rect = {};
        rect.top = parseInt(selection.css('top'), 10);
        rect.left = parseInt(selection.css('left'), 10);
        rect.width = selection.width();
        rect.height = selection.height();
        selection.css({ 'display': 'none' });
        /* 選択範囲画像取得 */
        var data = ctx.getImageData(rect.left, rect.top, rect.width, rect.height);
        /* 画像出力 */
        canvas.width = data.width;
        canvas.height = data.height;
        ctx.putImageData(data, 0, 0);
    }

    return {
        openSelection: openSelection,
        closeSelection: closeSelection,
        resizeSelection: resizeSelection,
        setWidth: setWidth,
        setHeight: setHeight,
        run: run
    };
}();

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * アップロード処理
 *
 * @module Uploader
 * @class uploader
 */
exports.default = function () {
    /**
     * オリジナル画像情報
     *
     * @property original
     * @private
     * @type {Object}
     */
    var original = void 0;

    function setOriginal(target) {
        original = target;
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
    function checkFormat(format) {
        if (format.match(/^image\/(png|jpeg)$/) === null) {
            alert('\u5BFE\u5FDC\u3057\u3066\u3044\u306A\u3044\u30D5\u30A1\u30A4\u30EB\u5F62\u5F0F\u3067\u3059\u3002\n                PNG\u307E\u305F\u306FjPG\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002');
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
    function imgToCanvas(img, canvas) {
        return function () {
            try {
                var ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                $(img).remove();
                // オリジナルデータ設定
                var originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                original.setOriginalData(originalData);
                original.setOriginalWidth(canvas.width);
                original.setOriginalHeight(canvas.height);
            } catch (e) {
                alert('画像をcanvasへ描画できませんでした。');
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
    function readFile(reader, canvas) {
        return function () {
            // 一時的にデータを読み込むimg要素を作成します。
            var img = $('<img>').get(0);
            img.onload = imgToCanvas(img, canvas);
            img.setAttribute('src', reader.result);
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
    function drawFile(file, canvas) {
        var reader = new FileReader();
        reader.onload = readFile(reader, canvas);
        reader.readAsDataURL(file);
    }

    /**
     * ドラッグアンドドロップ処理
     *
     * @method setDragDrop
     * @public
     * @param {HTMLCanvasElement} canvas canvas要素です。
     */
    function setDragDrop(canvas) {
        // ドラッグイベントのdefault処理をキャンセルするためfalseを返します。
        canvas.ondragover = function () {
            return false;
        };
        canvas.ondrop = function (evt) {
            /* 選択したファイル情報 */
            var file = void 0;
            /* 対象canvas */
            if (evt.dataTransfer.files.length === 0) {
                return false;
            }
            /* ドロップされたファイル情報 */
            file = evt.dataTransfer.files[0];
            /* ファイルタイプの確認 */
            if (checkFormat(file.type) === false) {
                alert('\u5BFE\u5FDC\u3057\u3066\u3044\u306A\u3044\u30D5\u30A1\u30A4\u30EB\u5F62\u5F0F\u3067\u3059\u3002\n                    PNG\u307E\u305F\u306FjPG\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002');
            }
            drawFile(file, canvas);
            return false;
        };
    }

    return {
        setOriginal: setOriginal,
        checkFormat: checkFormat,
        setDragDrop: setDragDrop,
        drawFile: drawFile
    };
}();

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * 入力検証
 *
 * @module Validation
 * @class validation
 */
exports.default = function () {

    /**
     * undefined, null, 空文字''のときはfalse。
     *
     * @param values  スカラー値または配列です。
     * 引数なしで呼び出されたときはfalseを返す。
     * ネストは考慮しない。
     */
    function isNotEmpty(values) {
        var operands = [];
        // 引数なし
        if (typeof values === 'undefined') {
            return false;
        }
        // scalar値は配列へ変換
        if (values instanceof Array === false) {
            operands.push(values);
        } else {
            operands = values;
        }
        for (var i = 0; i < operands.length; i++) {
            if (typeof operands[i] === 'undefined') {
                return false;
            }
            if (operands[i] === null) {
                return false;
            }
            if (operands[i] === '') {
                return false;
            }
        }
        return true;
    }

    /**
     * 0より大きい整数
     *
     * @param {Number} num
     * 0より大きい整数true。それ以外はfalseを返します。
     * 引数なしで呼び出したときはfalse
     */
    function isMoreThan0(num) {
        // キャスト失敗はNaNを返します(エラーではない)。
        // undefined, 空文字, nullはNaNを返します。
        var result = parseInt(num, 10);
        // 数字以外
        if (isNaN(result)) {
            return false;
        }
        // 0以下
        if (num <= 0 === true) {
            return false;
        }
        return true;
    }

    // 公開メソッド
    return {
        isNotEmpty: isNotEmpty,
        isMoreThan0: isMoreThan0
    };
}();

},{}]},{},[8]);
