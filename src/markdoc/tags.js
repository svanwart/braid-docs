import { Callout } from '@/components/Callout'
import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import Card from '@/components/Card'
import CardHorizontal from '@/components/CardHorizontal'
import CardVertical from '@/components/CardVertical'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },

  card: {
    selfClosing: true,
    render: Card,
    attributes: {
      title: { type: String },
      description: { type: String },
    },
  },

  'card-horizontal': {
    selfClosing: true,
    render: CardHorizontal,
    attributes: {
      img: { type: String },
      title: { type: String },
      text: { type: String },
      backgroundColor: { type: String },
      imgPosition: { type: String },
    },
  },

  'card-vertical': {
    selfClosing: true,
    render: CardVertical,
    attributes: {},
  },
}

export default tags
