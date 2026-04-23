// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

console.log("Print subArray");

let arr = [2, 4, 6, 8, 10];

function printSubArray(Arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            for (let k = i; k <= j; k++) {
                process.stdout.write(String(Arr[k]) + " ");
            }
            console.log(" ");

        }
        console.log("");
    }
}

printSubArray(arr);