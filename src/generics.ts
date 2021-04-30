// ========== 泛型 - 是什么 - 示例 1
/**
 * 定义一个通用的 identity 函数
 * 1. 首先支持 Number 类型的参数
 * 2. 不可扩展
 */
// function identity(value: number) {
//     return value;
// }

/**
 * 用any适配各种类型缺陷：
 * 1. 失去了定义应该返回哪种类型的能力
 * 2. 编译器失去了类型保护的作用
 */
// function identity(value: any) {
//     return value;
// }

/**
 * 让函数可以适用于任何特定的类型：用泛型解决！
 */
// function identity <T>(value: T): T {
//     return value;
// }

// console.log(identity(123)); // OK
// console.log(identity('abc'));   // OK


// ========== 泛型 - 是什么 - 示例 2 - 单类型返回
// function identity<T, U>(value: T, message: U): T {
//     console.log(message);
//     return value;
// }

// console.log(identity<number, string>(68, "Tony"));  // OK


// ========== 泛型 - 是什么 - 示例 2 - 多类型返回
// function identity<T, U>(value: T, message: U): [T, U] {
//     console.log(message);
//     return [value, message];
// }

// console.log(identity<number, string>(68, "Tony"));  // OK


// ========== 泛型 - 泛型接口
// interface Identities<V, M> {
//     value: V,
//     message: M
// }

// function identity<T, U> (value: T, message: U): Identities<T, U> {
//     console.log(value + ': ' + typeof(value));
//     console.log(message + ': ' + typeof(message));
//     let identities: Identities<T, U> = {
//         value,
//         message
//     }
//     return identities;
// }

// console.log(identity(68, 'Tony'));  // OK


// ========== 泛型 - 泛型类
// interface GenericInterface<U> {
//     value: U,
//     getIdentity: () => U
// }

// // `IdentityClass` 实现 `GenericInterface<T>`，
// // 当 `T` 表示 `number` 类型时，等于 `IdentityClass` 实现了 `GenericInterface<number>`
// class IdentityClass<T> implements GenericInterface<T> {
//     value: T;

//     constructor(value: T) {
//         this.value = value;
//     }

//     getIdentity(): T {
//         return this.value;
//     }
// }

// const myNumberClass = new IdentityClass<number>(68);
// console.log(myNumberClass.getIdentity());   // => 68

// const myStringClass = new IdentityClass<string>('Tony');
// console.log(myStringClass.getIdentity());   // => Tony


// ========== 泛型 - 泛型约束 - 示例 1 - 问题
// function identity<T>(arg: T): T {
//     console.log(arg.length); // Error, 类型“T”上不存在属性“length”
//     return arg;
// }


// ========== 泛型 - 泛型约束 - 示例 1 - 解决方法 1
// interface Length {
//     length: number;
// }

// // 让 `T` 实现继承接口类型 `Length`
// function identity<T extends Length>(arg: T): T {
//     console.log(arg.length);
//     return arg;
// }

// // identity(68);   // Error, 类型“number”的参数不能赋给类型“Length”的参数。
// identity('string'); // OK
// identity([1, 2, 3]);    // OK


// ========== 泛型 - 泛型约束 - 示例 1 - 解决方法 2
// function identity<T>(arg: T[]): T[] {
//     console.log(arg.length);
//     return arg;
// }

// // or
// // function identity<T>(arg: Array<T>): Array<T> {
// //     console.log(arg.length);
// //     return arg;
// // }

// // identity(68);   // Error, 类型“number”的参数不能赋给类型“unknown[]”的参数。
// identity([1, 2, 3]);


// ========== 泛型 - 泛型约束 - keyof 操作符
// interface Person {
//     name: string,
//     age: number,
//     location: string,
// }

// type K1 = keyof Person;
// type K2 = keyof Person[];
// type K3 = keyof { [x: string]: Person };

// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//     return obj[key];
// }


// ========== 泛型 - 泛型约束 - keyof 使用示例
// enum Difficulty {
//     Easy,
//     Intermediate,
//     Hard
// }

// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//     return obj[key];
// }

// let tsInfo = {
//     name: 'TS',
//     superSetOf: 'JS',
//     difficulty: Difficulty.Intermediate
// }

// // 获取 `tsInof` 的 `difficulty` 属性值
// let difficulty: Difficulty = getProperty(tsInfo, 'difficulty'); // OK

// // 获取 `tsInof` 的 `superSetOf` 属性值
// // let superSetOf: string = getProperty(tsInfo, '_superSetOf');    // Error


// ========== 泛型 - 参数默认类型
// interface A<T = string> { name: T } // 泛型接口A默认为 `string` 类型

// const strA: A = { name: 'Tony' }    // OK

// const numB: A<number> = { name: 1000 }  // OK


// ========== 泛型 - 泛型条件类型
// // 定义一个泛型接口Dictionary；T默认为类型为any；键为string，值为T
// interface Dictionary<T = any> {
//     [key: string]: T
// }

// // 用类型别名 `type` 并基于 `Dictionary` 弄了一个新类型，名为 `StrDict`
// type StrDict = Dictionary<string>;

// // ???
// type DictMember<T> = T extends Dictionary<infer V> ? V : never;
// // ???
// type StrDictMember = DictMember<StrDict>;


// ========== 泛型 - 泛型条件类型 - 示例：获取 Promise 对象的返回值类型
// interface Person {
//     name: string,
//     age: number
// }

// async function stringPromise() {
//     return 'Hello, Tony';
// }

// async function personPromise() {
//     return { name: 'Tony', age: 30 } as Person;
// }

// type PromiseType<T> = (args: any[]) => Promise<T>;
// type UnPromiseify<T> = T extends PromiseType<infer U> ? U : never;  // `infer` ???

// type extractStringPromise = UnPromiseify<typeof stringPromise>;
// type extractPersonPromise = UnPromiseify<typeof personPromise>;


// ========== 泛型 - 泛型工具类型 - Partial 示例
// interface Todo {
//     title: string,
//     description: string
// }

// function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
//     return { ...todo, ...fieldsToUpdate };   // ???
// }

// const todo1 = {
//     title: 'organize desk',
//     description: 'clear clutter'
// }

// const todo2 = updateTodo(todo1, {
//     description: 'throw out trash'
// })

// console.log(todo1); // => {title: "organize desk", description: "clear clutter"}
// console.log(todo2); // => {title: "organize desk", description: "throw out trash"}


// ========== 泛型 - 泛型工具类型 - Record 示例
// interface PageInfo {
//     title: string,
// }

// type Page = `home` | `about` | `concact`;

// const x: Record<Page, PageInfo> = {
//     about: { title: 'about' },
//     concact: { title: 'concact' },
//     home: { title: 'home' }
// }


// ========== 泛型 - 泛型工具类型 - Pick 示例
// interface Todo {
//     title: string,
//     description: string,
//     completed: boolean
// }

// type TodoPreview = Pick<Todo, 'title' | 'completed'>;

// const todo: TodoPreview = {
//     title: 'Clean room',
//     completed: false
// }


// ========== 泛型 - 泛型工具类型 - Exclude 示例
// type T0 = Exclude<'a' | 'b', 'a'>;  // 'b' | 'c'
// type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;  // 'c
// type T2 = Exclude<string | number | (() => void), Function>;    // string | number


// ========== 泛型 - 泛型工具类型 - ReturnType 示例
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>;  //void
type T2 = ReturnType<<T>() => T>;   // {}；???
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]；障眼法？
type T4 = ReturnType<any>;  // any
type T5 = ReturnType<never>;    // any
// type T6 = ReturnType<string>;   // Error: 类型“string”不满足约束“(...args: any) => any”。
// type T7 = ReturnType<Function>; // Error: 类型“Function”不满足约束“(...args: any) => any”