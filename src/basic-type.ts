// ========== boolean
const isSpinning: boolean = false;


// ========== number
const size: number = 6;


// ========== string
const customer: string = 'Tonny';


// ========== void
function sayHi(): void {
    alert('Hi');
}
// let v: void = null; // strictNullChecks设置false时，null才能赋值给void


// ========== null
let n: null = null;


// ========== undefined
let u: undefined = undefined;


// ========== symbol
const sym1: symbol = Symbol('key1');
const sym2: symbol = Symbol('key2');
// console.log(Symbol('key1') === Symbol('key1'));  // false


// ========== bigint
const MAX = Number.MAX_SAFE_INTEGER;    // 最大可能整数
const max1 = MAX + 1;
const max2 = MAX + 2;
// console.log(max1 === max2); // true

const MAX_BIGINIT: bigint = BigInt(Number.MAX_SAFE_INTEGER);    // 最大可能整数
const max1n = MAX_BIGINIT + 1n;
const max2n = MAX_BIGINIT + 2n;
// console.log(max1n === max2n);  // false


// ========== any & unknown
let a: any;
a = 1;   // OK

let un: unknown;
// un[0] = 1;  // Error：未确定类型之前不能进行操作
if (un instanceof Array) {  // 缩小范围类型，让unknow可以执行操作
    un[0] = 1;  // OK
}


// ========== never
// 返回never的函数必须存在无法到达的终点
function error(message: string): never {
    throw new Error(message);
}


// ========== tuple
let t: [string, number]
t = ['hi', 10]; // OK
// t = [10, 'hi']; // Error: 元素类型顺序有误
// t = ['hi', 10, 10]; // Error: 数组长度