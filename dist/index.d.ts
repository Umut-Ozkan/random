declare class FSAdapter {
    set(value: string): {
        [prop: string]: unknown;
    };
    get(): {
        [prop: string]: unknown;
    };
    init(): void;
}
declare class Database {
    private adapter;
    constructor(adapter?: FSAdapter);
    all(): {
        [prop: string]: unknown;
    };
    set(name: string, value: unknown): unknown;
    push(name: string, value: unknown): any[];
    pop(name: string): any;
    shift(name: string): any;
    unshift(name: string, value: unknown): any[];
    add(name: string, value: number): number;
    subtract(name: string, value: number): number;
    delete(name: string): Promise<boolean>;
    get(name: string): any;
    fetch: (name: string) => any;
    has: (name: string) => boolean;
}
declare const _default: Database;
export = _default;
