// ========== 函数 - 两种函数
// // Named function
// function add(x, y) {
//     return x + y;
// }

// // Anonymous function
// let myAdd = function(x, y) { return x + y };


// ========== 函数 - 书写函数类型
// // Named function with Function Type
// function add(x: number, y: number): number {
//     return x + y;
// }

// // Anonymous function with Function Type
// let myAdd: (x: number, y: number) => number = function(x: number, y: number): number { return x + y };


// ========== 函数 - 类型推论
// // Anonymous function with Function Type (Only Left)
// let myAdd1 = function(x: number, y: number): number { return x + y };

// // Anonymous function with Function Type (Only Right)
// let myAdd2: (x: number, y: number) => number = function(x, y) { return x + y };


// ========== 函数 - 可选参数
// function buildName(firstName: string, lastName?: string) {  // here
//     if (lastName) {
//         return `${firstName} ${lastName}`;
//     } else {
//         return firstName;
//     }
// }
// buildName('bob');   // OK
// buildName('bob', undefined);   // OK
// buildName('bob', 'Smith');   // OK


// ========== 函数 - 默认参数
// function buildName(firstName: string, lastName = 'Smith') {  // here
//     if (lastName) {
//         return `${firstName} ${lastName}`;
//     } else {
//         return firstName;
//     }
// }
// buildName('bob');   // OK
// buildName('bob', undefined);   // OK
// buildName('bob', 'Adams');   // OK


// ========== 函数 - 剩余参数
// function buildName(firstName: string, ...restOfName: string[]) {
//     return firstName + ' ' + restOfName.join(' ');
// }

// let buildNameFun: (name: string, ...restName: string[]) => string = buildName;


// ========== 函数 - 函数重载
// declare function test(a: number): number;
// declare function test(a: string): string;

// const resStr = test('Hello');   // OK
// const resNum = test(123);   // OK


// ========== 函数 - 函数重载 - 更复杂一点 1
// interface User {
//     name: string;
//     age: number;
// }

// // 要求：传user时，不传flag；传number时，传入flag
// declare function test(params: User | number, flag?: boolean): number;

// const user = {
//     name: 'Jack',
//     age: 666
// }

// test(user, false);  // 没报错，但不是想要的


// ========== 函数 - 函数重载 - 更复杂一点 2
// interface User {
//     name: string;
//     age: number;
// }

// // 要求：传user时，不传flag；传number时，传入flag
// declare function test(params: User): number;
// declare function test(params: number, flag: boolean): number;

// const user = {
//     name: 'Jack',
//     age: 666
// }

// // test(user, false);  // Error, 是想要的！
// test(user); // OK
// test(123, false);  // OK