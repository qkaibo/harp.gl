/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { assert } from "chai";
import { ColorUtils } from "../lib/ColorUtils";

// tslint:disable:only-arrow-functions
// tslint:disable:no-bitwise

describe("ColorUtils", function() {
    it("support rgba in signed int range", function() {
        const encoded = ColorUtils.getHexFromRgba(0.1, 0.5, 1.0, 0.45)!;
        assert.isNumber(encoded);
        assert.isBelow(encoded, 0);

        const decodedAlpha = ColorUtils.getAlphaFromHex(encoded);
        assert.approximately(decodedAlpha, 0.45, 1 / 255);

        const decoded = ColorUtils.getRgbaFromHex(encoded);
        assert.approximately(decoded.r, 0.1, 1 / 255);
        assert.approximately(decoded.g, 0.5, 1 / 255);
        assert.approximately(decoded.b, 1.0, 1 / 255);
        assert.approximately(decoded.a, 0.45, 1 / 255);
    });

    it("is able to recover bits shifted to sign range", function() {
        const a = 0x01 << 24;
        assert.isAbove(a, 0);
        assert.equal(ColorUtils.extractUint8FromSigned(a >> 24), 0x01);

        const b = 0x7f << 24;
        assert.isAbove(b, 0);
        assert.equal(ColorUtils.extractUint8FromSigned(b >> 24), 0x7f);

        const c = 0x80 << 24;
        assert.isBelow(c, 0);
        assert.equal(ColorUtils.extractUint8FromSigned(c >> 24), 0x80);

        const d = 0xff << 24;
        assert.isBelow(d, 0);
        assert.equal(ColorUtils.extractUint8FromSigned(d >> 24), 0xff);
    });
});
