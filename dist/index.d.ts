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
    private json;
    constructor(adapter?: FSAdapter);
    private getDefaultData;
    set(name: string, value: unknown): unknown;
    push(name: string, value: unknown): any[];
    pop(name: string): any;
    shift(name: string): any;
    unshift(name: string, value: unknown): any[];
    add(name: string, value: number): number;
    subtract(name: string, value: number): number;
    delete(name: string): Promise<{
        [prop: string]: unknown;
    }>;
    all: () => {
        [prop: string]: unknown;
    };
    get: (name: string) => unknown;
    fetch: (name: string) => unknown;
    has: (name: string) => boolean;
}
declare const _default: Database;
export = _default;
