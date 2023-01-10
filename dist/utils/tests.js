"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakerToArb = void 0;
const faker_1 = require("@faker-js/faker");
const fast_check_1 = require("fast-check");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakerToArb = (fakerGen) => {
    return (0, fast_check_1.integer)()
        .noBias()
        .noShrink()
        .map((seed) => {
        faker_1.faker.seed(seed);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return fakerGen();
    });
};
exports.fakerToArb = fakerToArb;
//# sourceMappingURL=tests.js.map