export async function pricingPageLoader() {
  const data = { title: "Pricing" };

  return data;
}

export type PricingPageData = Awaited<ReturnType<typeof pricingPageLoader>>;
