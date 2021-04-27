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
let passcode!: string;
class Employee {
    private _fullName!: string; // `!`赋值断言

    get fullName(): string {
        return this._fullName;
    }
    set fullName(value: string) {
        if (passcode && passcode === 'secret') {    // 密码不匹配，则拒绝修改
            this._fullName = value;
        } else {
            console.log('Error, Unauthorized update of employee!');
        }
    }
}

const setName = (name: string) => {
    let employee = new Employee();
    employee.fullName = name;
    if (employee.fullName) {
        console.log(employee.fullName);
    }
}

passcode = 'secret';
setName('Tony');    // OK

passcode = 'hahaha';
setName('Marry');    // Error, Unauthorized update of employee!