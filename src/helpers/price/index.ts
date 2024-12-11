export const calculateTotalPrice = <T extends string>({
  priceField,
  quantityField,
  discountField,
}: {
  priceField: T;
  quantityField?: T;
  discountField?: T;
}) => {
  return (items: Partial<Record<T, number>>[]) => {
    return items.reduce<number>((acc, cur) => {
      let price = (acc += cur[priceField]);

      if (discountField && cur[discountField]) {
        price -= (price * cur[discountField]) / 100;
      }

      if (quantityField && cur[quantityField]) {
        price *= cur[quantityField];
      }

      return price;
    }, 0);
  };
};
