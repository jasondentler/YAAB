interface WindowEx extends Window {
    data: any;
}

export function get<T>(key: string) : T {
    var w = (<WindowEx>window);
    var data = (w.data || {});
    return <T> data[key];
}