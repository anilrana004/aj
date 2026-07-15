import { ConfiguratorPart } from '@/types/part';

interface ProductSchemaProps {
  part: ConfiguratorPart;
  url: string;
}

export function ProductSchema({ part, url }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${part.name} | Apriliha Singh`,
    description: part.story.narrative,
    image: part.images[0]?.url,
    url,
    brand: {
      '@type': 'Brand',
      name: 'Apriliha Singh',
    },
    material: part.material.replace(/-/g, ' '),
    weight: {
      '@type': 'QuantitativeValue',
      value: part.weightGrams,
      unitCode: 'GRM',
    },
    offers: {
      '@type': 'Offer',
      price: part.price,
      priceCurrency: part.currency,
      availability: part.inStockQuantity > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Apriliha Singh',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Craft Time',
        value: part.story.craftTime,
      },
      {
        '@type': 'PropertyValue',
        name: 'Origin',
        value: part.story.originRegion,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
