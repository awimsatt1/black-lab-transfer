import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Consignment', value: 'consignment'},
          {title: 'Indie Spotlight', value: 'indie'},
          {title: 'Merch', value: 'merch'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publisher',
      type: 'reference',
      to: [{type: 'publisher'}],
    }),
    defineField({
      name: 'creator',
      title: 'Creator(s)',
      type: 'string',
      description: 'Writer & artist, e.g. "Robert Kirkman & Cory Walker"',
    }),
    defineField({
      name: 'price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      description: 'Retail price before consignment discount. Leave blank for non-consignment items.',
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'In Stock', value: 'inStock'},
          {title: 'Low Stock', value: 'lowStock'},
          {title: 'Sold Out', value: 'soldOut'},
        ],
      },
      initialValue: 'inStock',
    }),
    defineField({
      name: 'isNewArrival',
      title: 'New Arrival?',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle on to feature in the New Arrivals filter.',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'creator',
      media: 'image',
      category: 'category',
    },
    prepare({title, subtitle, media, category}) {
      const badge = category === 'consignment' ? '📦' : category === 'indie' ? '🌟' : '🐕'
      return {
        title: `${badge} ${title}`,
        subtitle: subtitle || '',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Price: Low to High',
      name: 'priceAsc',
      by: [{field: 'price', direction: 'asc'}],
    },
    {
      title: 'Price: High to Low',
      name: 'priceDesc',
      by: [{field: 'price', direction: 'desc'}],
    },
  ],
})
