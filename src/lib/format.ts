export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area: number) {
  return `${area.toLocaleString("es-MX")}m²`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString("es-MX", {
    month: "short",
    day: "numeric",
  });
} 