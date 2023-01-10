import { Arbitrary } from 'fast-check';
export declare const fakerToArb: <Generator_1 extends (...args: any[]) => any>(fakerGen: Generator_1) => Arbitrary<ReturnType<Generator_1>>;
