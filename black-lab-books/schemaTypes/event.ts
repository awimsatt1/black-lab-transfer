import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
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
      name: 'date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'Optional. For multi-day events like conventions.',
    }),
    defineField({
      name: 'location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venueType',
      title: 'Venue Type',
      type: 'string',
      options: {
        list: [
          {title: 'Farmers Market', value: 'farmersMarket'},
          {title: 'Brewery / Taproom', value: 'brewery'},
          {title: 'Comic Shop', value: 'comicShop'},
          {title: 'Festival / Convention', value: 'festival'},
          {title: 'Pop-Up', value: 'popup'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'Link to the event page, ticket sales, etc.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
      media: 'image',
    },
    prepare({title, date, location, media}) {
      const d = date ? new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) : ''
      return {
        title,
        subtitle: `${d} · ${location || ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date: Upcoming First',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})
