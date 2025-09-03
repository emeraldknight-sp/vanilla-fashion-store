interface Product {
  id: string;
  category: string[];
  image: string;
  name: string;
  price: number;
  size: 'P' | 'M' | 'G' | 'GG' | 'XG' | string[];
  amountDiscount: number;
}
