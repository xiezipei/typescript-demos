// ========== 类 - 示例
// class Greeter {
//     greeting: string;   // 属性
//     constructor(message: string) {  // 构造函数
//         this.greeting = message;
//     }
//     greet() {   // 方法
//         return "Hello, " + this.greeting;
//     }
// }

// let greeter = new Greeter("world");
// greeter.greet();    // OK


// ========== 类 - 继承
// class Animal {
//     move(distanceInMeters: number = 0) {
//         console.log(`Animal moved ${distanceInMeters}m.`);
//     }
// }

// class Dog extends Animal {
//     bark() {
//         console.log('Woof! Woof!');
//     }
// }

// const dog = new Dog();
// dog.bark(); // OK
// dog.move(10);   // OK
// dog.bark(); // OK


// ========== 类 - 继承 - 更复杂的情况
// // 基类：Animal
// class Animal {
//     name: string;
//     constructor(theName: string) {
//         this.name = theName;
//     }
//     move(distanceInMeters: number = 0) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`);
//     }
// }

// // 派生类：Snake
// class Snake extends Animal {
//     constructor(name: string) {
//         super(name);    // 调用基类构造方法
//     }
//     move(distanceInMeters = 5) {    // 重写父类方法
//         console.log('Slithering...');
//         super.move(distanceInMeters);
//     }
// }

// // 派生类：Horse
// class Horse extends Animal {
//     constructor(name: string) {
//         super(name);    // 调用基类构造方法
//     }
//     move(distanceInMeters = 45) {   // 重写父类方法
//         console.log('Galloping...');
//         super.move(distanceInMeters);
//     }
// }

// let sam: Horse = new Snake('Sammy the Python'); // 即使声明为`Horse`类型，还是会调用`Snake`里重写方法
// let tom: Animal = new Horse('Tommy the Palomino');  // 即使声明为`Animal`类型，还是会调用`Horse`里重写方法

// sam.move(); // OK
// tom.move(34);   // OK


// ========== 类 - 存取器 - 不使用存取器
// class Employee {
//     fullName!: string;
// }

// let employee = new Employee();
// employee.fullName = "Bob Smith";    // 可以随意更改（方便但会有麻烦）
// if (employee.fullName) {
//     console.log(employee.fullName);
// }


// ========== 类 - 存取器 - 使用存取器
// let passcode!: string;
// class Employee {
//     private _fullName!: string; // `!`赋值断言

//     get fullName(): string {
//         return this._fullName;
//     }
//     set fullName(value: string) {
//         if (passcode && passcode === 'secret') {    // 密码不匹配，则拒绝修改
//             this._fullName = value;
//         } else {
//             console.log('Error, Unauthorized update of employee!');
//         }
//     }
// }

// const setName = (name: string) => {
//     let employee = new Employee();
//     employee.fullName = name;
//     if (employee.fullName) {
//         console.log(employee.fullName);
//     }
// }

// passcode = 'secret';
// setName('Tony');    // OK

// passcode = 'hahaha';
// setName('Marry');    // Error, Unauthorized update of employee!


// ========== 类 - 实例成员
// // 创建 Foo
// class Foo {
//     str = 'Hello';  // 实例属性
//     constructor() {
//         console.log(this.str);
//     }
//     classMethod() { // 实例方法
//         console.log('method');
//     }
// }

// // 创建 Foo 实例：foo
// // 1. 由于会调用Foo构造函数，所以会输出Hello
// const foo = new Foo();  // => Hello

// // 创建 Bar 并继承自 Foo
// class Bar extends Foo {
//     constructor() {
//         super();
//     }
// }

// // 创建 Bar 实例
// const bar = new Bar();  // => Hello

// // 用 `.` 语法可以访问基类实例成员
// console.log(bar.str);   // => Hello
// bar.classMethod();  // => method


// ========== 类 - 静态成员
// class Foo {
//     static str = 'Hello';
//     constructor() {
//         // console.log(this.str);  // Error: 属性“str”在类型“Foo”上不存在。你的意思是改为访问静态成员“Foo.str”吗?
//         console.log(Foo.str);   // 用类名访问
//     }
//     static classMethod() {
//         console.log('Method');
//     }
// }

// const foo = new Foo();  // => Hello

// class Bar extends Foo {
//     static barStr = 'Hello Bar';
//     constructor() {
//         super();    // 执行完父类构造方法（输出`Hello`），继续往下执行
//         // console.log(this.barStr);   // Error：同上错误
//         console.log(Bar.barStr);    // OK
//     }
//     static classMethod() {
//         console.log('Method Bar');
//     }
// }

// const bar = new Bar();  // => Hello; => Hello Bar
// // console.log(bar.barStr);    // Error: 属性“barStr”在类型“Bar”上不存在。你的意思是改为访问静态成员“Bar.barStr”吗?
// console.log(Bar.barStr);    // => Hello Bar
// // bar.classMethod();  // Error: 属性“classMethod”在类型“Bar”上不存在。
// Bar.classMethod();  // => Method Bar


// ========== 类 - 访问限定符 - public
// class Car {
//     public run() {
//         console.log('启动...');
//     }
// }

// const car = new Car();

// car.run();  // OK, 类外部使用


// ========== 类 - 访问限定符 - protected
// class Car {
//     protected run() {
//         console.log('启动...')
//     }
// }

// class GTR extends Car {
//     init() {
//         this.run();
//     }
// }

// const car = new Car();
// const gtr = new GTR();

// // car.run();  // Error, 类外部不能使用
// gtr.init(); // OK，子类可用
// // gtr.run();  // Error，该方法只能在Car类内部或其子类访问


// // ========== 类 - 访问限定符 - private
// class Car {
//     private run() {
//         console.log('启动...');
//     }
// }

// const car = new Car();

// // car.run();  // Error, 私有属性只能Car类内部使用


// // ========== 类 - 抽象类
// abstract class Deparment {
//     constructor(public name: string) {}

//     printName(): void {
//         console.log(`Department name: ${this.name}`);
//     }

//     abstract printMeeting(): void;  // 必须在派生类中实现
// }

// class AccountingDepartment extends Deparment {
//     constructor() {
//         super('Accounting and Auditing');   // 在派生类的构造函数中必须调用`super()`
//     }

//     printMeeting(): void {
//         console.log('The Accounting Department meets each Monday at 10am');
//     }

//     generateReports(): void {
//         console.log('Generating accounting reports...');
//     }
// }

// let department: Deparment;  // OK, 允许创建一个对抽象类型的引用
// // department = new Deparment();   // Error, 不能创建抽象类的实例
// department = new AccountingDepartment();    // OK, 可以对抽象类的子类进行初始化和赋值
// department.printName();  // OK
// department.printMeeting();  // OK
// // department.generateReports();   // Error, 类型“Deparment”上不存在属性“generateReports”。


// // ========== 类 - 把类当做接口使用
// class Point {
//     x!: number;
//     y!: number;
// }

// interface Point3d extends Point {
//     z: number;
// }

// let point3d: Point3d = { x: 1, y: 2, z: 3 };