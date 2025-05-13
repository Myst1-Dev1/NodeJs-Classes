console.log('Hello nodejs from typescript');

//basic types
let isDone : boolean = false;

let num : number = 1000

let str : string = "Peter"

let list : number[] = [1, 2, 3 ,4]

let products : Array<string> = ['product 1', 'product 2', 'product 3']

let randomVal : any = 4

randomVal = 'Peter'

let xyz : undefined = undefined;
let yz : null = null;

enum Color {
    Red, Green, Blue
}

let d: Color = Color.Blue;

//tuple

let abc : [string, number] = ["hi", 400];

//interfaces types

interface User {
    name: string;
    id: number;
    email?: string; //optional
    readonly createdAt: Date;
}

const user : User = {
    name : 'Peter',
    id : 1,
    createdAt : new Date(),
    email : 'peter@gmail.com'
}

type Product = {
    title : string,
    price : number
}

const product1: Product = {
    title : 'Produto 1',
    price : 550
}

//functions with type annotations

function multiply(a : number, b : number): number {
    return a * b
};

const add = (num1 : number, num2 : number): number => {
    return num1 + num2
}

function greet(name : string, greeting? : string): string {
    return `${name} ${greeting}`
}

console.log(greet('Peter', 'Hello'));