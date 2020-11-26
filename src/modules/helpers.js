export function pipe(...ops) {

    const bundle = ops.reduce((prevOp, nextOp) => {
        return (arg) => nextOp(prevOp(arg));
    });

    return bundle;
}