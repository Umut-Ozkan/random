declare class Database {
    private filname;
    all(): any;
    set(name: string, value: unknown): any;
    push(name: string, value: unknown): any[];
    add(name: string, value: number): any;
    subtract(name: string, value: number): any;
    delete(name: string): boolean;
    get(name: string): any;
    fetch: (name: string) => any;
    has: (name: string) => boolean;
}
declare const _default: Database;
export = _default;
