export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    type?: string;
    gender?: string;
    rating: number;
    reviews: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface BillingDetails {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    card: string;
    exp: string;
    cvv: string;
}

export interface Order {
    id: number;
    date: string;
    items: CartItem[];
    total: number;
    status: string;
    billingDetails: BillingDetails;
}

export interface User {
    id: string | number;
    email: string;
    role: 'admin' | 'user';
    name?: string;
    status?: string;
}

export interface Dispute {
    id: number | string;
    orderId: number | string;
    customerId: string | number;
    sellerId: string | number;
    subject: string;
    description: string;
    status: 'open' | 'resolved';
    resolution?: string;
}

export interface ShopContextType {
    products: Product[];
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    orders: Order[];
    placeOrder: (billingDetails: BillingDetails) => Order;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    verifyUser: (userId: string | number) => Promise<boolean>;
    resolveDispute: (disputeId: string | number, resolution: string) => Promise<boolean>;
}
