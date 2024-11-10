interface DatabaseOptions {
    filePath: string;
    autoSave?: boolean;
}
declare class JsonDB {
    private data;
    private filePath;
    private autoSave;
    constructor(options: DatabaseOptions);
    private load;
    private save;
    get(path: string): any;
    set(path: string, value: any): void;
    increment(path: string, value?: number): void;
    exists(path: string): boolean;
    saveManually(): void;
}
export default JsonDB;
