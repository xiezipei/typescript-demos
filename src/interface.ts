// ========== 接口 - 使用示例
// interface User {    // 定义user接口类型
//     name: string,
//     age: number,
// }
// const getUserName = (user) => user.name;  // Error: 参数“user”隐式具有“any”类型
// const getUserName = (user: User) => user.name;  // OK
// console.log(getUserName({ name: 'Tony', age: 18 }));    // OK


// ========== 接口 - 可选属性
// interface User {
//     name: string,
//     age?: number,    // 可选属性
// }

// const getUserName = (user: User) => user.name;  // OK
// console.log(getUserName({ name: 'Tony' }));    // OK


// ========== 接口 - 只读属性
// interface User {
//     name: string,
//     readonly age: number,   // 只读属性
// }

// const getUserName = (user: User) => user.age++;  // Error: 无法分配到 "age" ，因为它是只读属性。


// ========== 接口 - 函数类型 - 方式1 - 直接在内部描述函数
// interface User {
//     name: string,
//     greet: (username: string) => string
// }
// const user: User = {
//     name: 'Tony',
//     greet: (username: string) => `Hi~${username}!`
// }
// console.log(user.greet('Jack'));    // OK


// ========== 接口 - 函数类型 - 方式2 - 先用接口描述函数类型，再在内部使用该函数类型接口
// interface Greet {   // here
//     (username: string) : string
// }

// interface User {
//     name: string,
//     greet: Greet    // here
// }
// const user: User = {
//     name: 'Tony',
//     greet: (username: string) => `Hi~${username}!`
// }
// console.log(user.greet('Jack'));    // OK


// ========== 接口 - 属性检查
// interface SquareConfig {
//     color?: string;
//     width?: number;
// }

// function createSquare(config: SquareConfig) : { color: string; area : number } {
//     return {
//         color: config.color ? config.color : 'white',
//         area: config.width ? config.width * config.width : 0,
//     }
// }

// 正常
// let square = createSquare({ color: 'green', width: 50 });   // OK

// 问题
// let square = createSquare({ colour: 'red', width: 100 });    // Error: “colour”中不存在类型“SquareConfig”

// 方法 1 - 使用类型断言
// let square = createSquare({ colour: 'red', width: 100 } as SquareConfig);   // OK

// 方法 2 - 使用字符串索引签名（只要新属性不叫color、width, 什么类型也无所谓）
// interface SquareConfig { // 修改接口
//     color?: string;
//     width?: number;
//     [propName: string]: any;
// }
// let square = createSquare({ colour: 'red', width: 100 });  // OK

// 方法 3 - 将字面量赋值给另外一个变量（本质上转化为any类型，不推荐）
// let options: any = { colour: 'red', width: 100 };
// let square = createSquare(options); // OK

// console.log(square);


// ========= 接口：可索引类型
// interface Email {
//     [name: string]: string  // 索引签名
// }

// interface User {
//     name: string,
//     age?: number,
//     readonly isMale: boolean,
//     say: () => string,
//     email: Email    // here
// }

// const user: User = {
//     name: 'Tony',
//     age: 18,
//     isMale: true,
//     say: () => 'Hi!',
//     email: {
//         qq: 'tony@qq.com',
//         foxmail: 'tony@foxmail.com',
//         gmail: 'tony@gmail.com',
//     }
// }


// ========= 接口：继承接口
// interface User {    // 定义user接口类型
//     name: string,
//     age: number,
// }

// interface VipUser extends User {    // 继承单个接口
//     color: number
// }

// interface SuperVipUser extends User, VipUser {  // 继承多个接口
//     assistant: string
// }
