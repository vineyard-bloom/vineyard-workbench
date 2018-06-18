export declare type StringMap = {
    [key: string]: string;
};
export declare function installProject(projectName: string, branch: string): void;
export declare function linkDependencies(dependencies: StringMap): void;
export declare function crossLink(projectName: string): void;
export declare function initializeFolder(path: string): void;
