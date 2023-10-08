const FORMATTER = new Intl.NumberFormat(undefined, { currency: "INR", style: "currency" });

export const FormatProductTitle = (title: string) => title.length > 30 ? title.substring(0, 28).concat("...") : title;

export const FormatProductPrice = (price: number) => FORMATTER.format(price);