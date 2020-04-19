export const getItemCount = (item) => item.count;

export const getTotalItemPrice = (item) => (+item.price * item.count);

export const getTotalListPrice = (list) => list.reduce((acc, item) => acc + getTotalItemPrice(item), 0).toFixed(2);