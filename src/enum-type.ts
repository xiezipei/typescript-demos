// ========= 数字枚举
// 定义枚举
// enum Direction {
//     Up,
//     Down,
//     Left,
//     Right
// }

// 自定义初始值
// enum Direction {
//     Up = 1,
//     Down,
//     Left,
//     Right
// }

// 使用枚举
// console.log(Direction[1], Direction.Up);    // Up 1（这里用 `Up` 或 `1` 都能找到对应的枚举值，即双向）


// ========= 字符串枚举
// 定义枚举
// enum Direction {
//     Up = 'UP',
//     Down = 'DOWN',
//     Left = 'LEFT',
//     Right = 'RIGHT',
// }

// 使用枚举
// console.log(Direction['Right'], Direction.Right);   // RIGHT RIGHT

// 【已解决】问题：假如我拿到 `RIGHT`，那怎么找到对应的枚举值？难道只能写成 `Right`？
// console.log(Direction['RIGHT']);    // Error
// 知道了，TS 不支持基于字符串枚举的反向映射


// ========= 异构枚举
// 定义枚举
// enum BooleanLikeEnum {
//     No = 0,
//     Yes = 'YES',
// }

// 使用枚举
// console.log(BooleanLikeEnum['No'], BooleanLikeEnum[0], BooleanLikeEnum.No, BooleanLikeEnum['Yes'], BooleanLikeEnum.Yes);


// ========= 指定枚举成员值 - 1 - 字面量枚举成员
// enum NoYes {
//     No = 'No',
//     Yes = 'Yes'
// }

// function func(x: NoYes) {
//     return x;
// }

// console.log(func(NoYes.No));    // No
// console.log(func(NoYes['No']));    // No
// console.log(func(NoYes.Yes));   // Yes
// console.log(func(NoYes['Yes']));   // Yes


// ========= 指定枚举成员值 - 2 - 常量枚举成员
// enum Perm {
//     UserRead     = 1 << 8,
//     UserWrite    = 1 << 7,
//     UserExecute  = 1 << 6,
//     GroupRead    = 1 << 5,
//     GroupWrite   = 1 << 4,
//     GroupExecute = 1 << 3,
//     AllRead      = 1 << 2,
//     AllWrite     = 1 << 1,
//     AllExecute   = 1 << 0,
// }
// console.log(Perm.UserRead);


// ========= 指定枚举成员值 - 3 - 计算枚举成员
enum NoYesSum {
    No = 123,
    Yes = Math.random(),
}
console.log(NoYesSum.Yes);  // OK