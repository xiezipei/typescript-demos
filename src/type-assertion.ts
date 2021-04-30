// ====== 类型断言 - 语法
// let someValue: any = "this is a string";

// let strLength: number = (<string>someValue).length; // 尖括号语法
// // let strLength: number = (someValue as string).length;   // as语法

// console.log(strLength);


// ====== 类型断言 - 一个使用场景
// 情况1
// const person = {};
// person.name = 'tommoy'; // Error: 属性不存在
// person.age = 20;    // Error: 属性不存在

// 情况2
// interface Person {
//     name: string,
//     age: number
// }
// const person = {} as Person;
// person.name = 'tommy';  // OK
// person.age = 18;    // OK


// ====== 类型守卫 - `instanceof`
// class Cat {
//     name  = 'cici';
//     color = 'white';
// }

// class Dog {
//     name = 'bubu';
//     weight = 90;
// }

// function getSometing(arg: Cat | Dog) {
//     // 类型细化为 `Cat`
//     if (arg instanceof Cat) {
//         console.log(arg.color); // OK
//         // console.log(arg.weight); // Error：类型“Cat”上不存在属性“weight”
//     }

//     // 类型细化为 `Dog`
//     if (arg instanceof Dog) {
//         // console.log(arg.color); // Error：类型“Dog”上不存在属性“color”
//         console.log(arg.weight); // OK
//     }
// }


// ====== 类型守卫 - `in`
// class Cat {
//     name  = 'cici';
//     color = 'white';
// }

// class Dog {
//     name = 'bubu';
//     weight = 90;
// }

// function getSometing(arg: Cat | Dog) {
//     if ('color' in arg) {
//         console.log(arg.color); // OK
//         // console.log(arg.weight); // Error：类型“Cat”上不存在属性“weight”
//     }

//     if ('weight' in arg) {
//         // console.log(arg.color); // Error：类型“Dog”上不存在属性“color”
//         console.log(arg.weight); // OK
//     }
// }


// ====== 类型守卫 - 字面量类型守卫
// type Cat = {
//     name: 'cici';
//     age: number;
// }

// type Dog = {
//     name: 'bubu';
//     weight: number;
// }

// function doSomething(arg: Cat | Dog) {
//     if (arg.name === 'cici') {
//         console.log(arg.age);   // OK
//         // console.log(arg.weight);    // Error: 类型“Cat”上不存在属性“weight”。
//     } else {
//         // console.log(arg.age);   // Error: 类型“Dog”上不存在属性“age”。
//         console.log(arg.weight);    // OK
//     }
// }