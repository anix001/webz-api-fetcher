export class WebzQueryBuilder {
    private readonly _url: string;
    private _token?: string;
    private _searchTerm?: string;
    private _size?:number=10;
    private _from?:number=0;

    constructor(url: string) {
        if (!url) {
            throw new Error("Base URL is required");
        }
        this._url = url;
    }

    // [Set the token]
    setToken(token: string): this {
        if (!token) {
            throw new Error("Token is required");
        }
        this._token = token;
        return this;
    }

    // [Set the search term]
    setSearchTerm(searchTerm: string): this {
        if (!searchTerm) {
            throw new Error("Search term is required");
        }
        this._searchTerm = encodeURIComponent(searchTerm);
        return this;
    }
    // [Set the from size]
    setFrom(from: number): this {
        if (from < 0) {
            throw new Error("From must start from 0 or higher");
        }
        this._from = from;
        return this;
    }

    // [set the result size]
    setSize(size:number):this{
        if (size <= 0) {
            throw new Error("Size must be a positive number");
        }
        this._size=size;
        return this;
    }

    // [Build the URL with query parameters]
    build(): string {
        if (!this._token) {
            throw new Error("Token is required to build the URL");
        }

        const queryParams: string[] = [];
        queryParams.push(`token=${this._token}`);

        if (this._searchTerm) {
            queryParams.push(`q=${this._searchTerm}`);
        }
        if (this._from !== undefined) { 
            queryParams.push(`from=${this._from.toString()}`);
        }
        if (this._size !== undefined) { 
            queryParams.push(`size=${this._size.toString()}`);
        }

        return `${this._url}?${queryParams.join('&')}`;
    }
}