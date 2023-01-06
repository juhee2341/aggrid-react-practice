export interface IROW {
  make: string;
  model: string;
  price: number;
}

export const dummyData = () => {
  return [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'HyunDai', model: 'Avante', price: 21000 },
    { make: 'Ford', model: 'Mondeo', price: 42000 },
    { make: 'Kia', model: 'Boxter', price: 28000 },
    { make: 'Toyota', model: 'Celica', price: 36000 },
    { make: 'Kia', model: 'K3', price: 19000 },
    { make: 'Porsche', model: 'Boxter', price: 62000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'HyunDai', model: 'Genesis', price: 36000 },
    { make: 'Porsche', model: 'Boxter', price: 99000 },
  ];
}