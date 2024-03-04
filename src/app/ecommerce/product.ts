export class Product {
    id: number;
    description: string;
    name: string;
    imagePath: string;
    price: number;
}

export class ProdAndQty {
  product: Product;
  qty: number;
}

export class OrderData {
  order: ProdAndQty[] = [];
  payementType: string;
  userId: number;
}
