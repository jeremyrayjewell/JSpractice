function squared(max) {
    return {
        [Symbol.iterator]() {
            let n = 0;

            return {
                next() {
                    n++;

                    if (n <= max) {
                        return {
                            value: n * n,
                            done: false
                        };
                    }

                    return {
                        value: undefined,
                        done: true
                    };
                }
            };
        }
    };
}

const squaredIterator = squared(10);

for (const n of squaredIterator) {
    console.log(n);
}
