export interface Product {
    id : number;
    name: string;
        img: string;
        category: string;
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
        rating: number;
        lon: number;
        lat: number;
        zoom: number;
        address: string;
        price: number;
        quantity: number;
        available: number;
        providerId: number;
        provider: string;
        tax: number;
        createdAt?: any;
        updatedAt?: any;

}

export interface Order{
        user_id?: number;
        product_id?: number;
        product_name?: string;
        user_name?: string;
        lon?: number;
        lat?: number;
        zoom?: number;
        address?:string;
        cost?: number;
        tax?: number;
        status?: string;
        quantity?: number;
        income?: number;
        providerId?: number;
        provider?: string;
        phno?:number;
    }