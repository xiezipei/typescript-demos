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
// type T0 = ReturnType<() => string>; // string
// type T1 = ReturnType<(s: string) => void>;  //void
// type T2 = ReturnType<<T>() => T>;   // {}；???
// type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]；障眼法？
// type T4 = ReturnType<any>;  // any
// type T5 = ReturnType<never>;    // any
// // type T6 = ReturnType<string>;   // Error: 类型“string”不满足约束“(...args: any) => any”。
// // type T7 = ReturnType<Function>; // Error: 类型“Function”不满足约束“(...args: any) => any”


// ========== 泛型 - 使用泛型创建对象 - 构造签名
// class FirstClass {
//     id: number | undefined;
// }

// class SecondClass {
//     name: string | undefined;
// }

// class GenericCreator<T> {
//     create(): T {
//         // return new T(); // Error: “T”仅表示类型，但在此处却作为值使用。
//     }
// }

// const creator1 = new GenericCreator<FirstClass>();
// const firstClass: FirstClass = creator1.create();

// const creator2 = new GenericCreator<SecondClass>();
// const secondClass: SecondClass = creator2.create();


// ========== 泛型 - 构造函数类型的应用 - 错误示例
// interface Point {
//     new (x: number, y: number): Point,
//     x: number,
//     y: number
// }

// class Point2D implements Point {    // Error: 类“Point2D”错误实现接口“Point”
//     readonly x: number;
//     readonly y: number;

//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
// }

// const point: Point = new Point2D(1, 2);


// ========== 泛型 - 构造函数类型的应用 - 正确示例
// interface Point {
//     x: number,
//     y: number
// }

// interface PointConstructor {
//     new (x: number, y: number): Point
// }

// class Point2D implements Point {
//     readonly x: number;
//     readonly y: number;

//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
// }

// // 工厂函数
// function newPoint(
//     pointConstructor: PointConstructor,
//     x: number,
//     y: number
// ): Point {
//     return new pointConstructor(x, y);
// }

// const point: Point = newPoint(Point2D, 1, 2);


// // ========== 泛型 - 使用泛型创建对象
// class FirstClass {
//     id: number | undefined;
//   }
  
// class SecondClass {
//     name: string | undefined;
// }

// class GenericCreator<T> {
//     // 重构 `create` 方法
//     create<T>(c: { new (): T }): T {
//         return new c();
//     }
// }

// const creator1 = new GenericCreator<FirstClass>();
// const firstClass: FirstClass = creator1.create(FirstClass);

// const creator2 = new GenericCreator<SecondClass>();
// const secondClass: SecondClass = creator2.create(SecondClass);


// // ========== 泛型 - 泛型是什么 - 示例 3
// function swap<T, U>(tuple: [T, U]): [U, T] {
//     return [tuple[1], tuple[0]];
// }

// swap([7, 'seven']); // => ['seven', 7]


// // ========== 泛型 - 泛型索引 - 错误示例
// function getValue(obj: object, key: string) {
//     return obj[key];    // Error, 类型为 "string" 的表达式不能用于索引类型 "{}"
// }

// function getValue<T extends object>(obj: T, key: string) {
//     return obj[key];    // Error, same tips
// }


// // ========== 泛型 - 泛型索引 - 正确示例
// function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
//     return obj[key];    // OK
// }

// const person = { name: 'Tony', age: 18 };
// getValue(person, 'age');    // OK


// // ========== 泛型 - 泛型索引 - 多重类型的泛型约束 - 没有同时约束示例
// interface FirstInterface {
//     dosomething(): number
// }

// interface SecondInterface {
//     dosomethingElse(): string
// }

// class Demo<T extends FirstInterface, SecondInterface> {
//     private genericProperty!: T;

//     useT() {
//         this.genericProperty.dosomething();  // OK
//         // this.genericProperty.dosomethingElse(); // Error, 类型“T”上不存在属性“dosomethingElse”
//     }
// }


// ========== 泛型 - 泛型索引 - 多重类型的泛型约束 - 同时约束错误示例
// interface FirstInterface {
//     dosomething(): number
// }

// interface SecondInterface {
//     dosomethingElse(): string
// }

// class Demo<T extends FirstInterface, T extends SecondInterface> {   // Error, 标识符“T”重复。
//     private genericProperty!: T;

//     useT() {
//         this.genericProperty.dosomething();  // OK
//         // this.genericProperty.dosomethingElse(); // Error, 类型“T”上不存在属性“dosomethingElse”
//     }
// }


// ========== 泛型 - 泛型索引 - 多重类型的泛型约束 - 同时约束示例 1：使用子接口
// interface FirstInterface { dosomething(): number };
// interface SecondInterface { dosomethingElse(): string };
// interface childInterface extends FirstInterface, SecondInterface {};    // here

// class Demo<T extends childInterface> {
//     private genericProperty!: T;

//     useT() {
//         this.genericProperty.dosomething(); // OK
//         this.genericProperty.dosomethingElse(); // OK
//     }
// }


// ========== 泛型 - 泛型索引 - 多重类型的泛型约束 - 同时约束示例 2：使用交叉类型
interface FirstInterface { dosomething(): number };
interface SecondInterface { dosomethingElse(): string };

class Demo<T extends FirstInterface & SecondInterface> {
    private genericProperty!: T;

    useT() {
        this.genericProperty.dosomething(); // OK
        this.genericProperty.dosomethingElse(); // OK
    }
}