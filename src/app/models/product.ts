export interface IProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
}
export const fromServer = (doc: any): IProduct => ({
  id: doc.id,
  title: doc.title,
  category: doc.category,
  description: doc.description,
  price: Number(doc.price),
  image: doc.image
})
