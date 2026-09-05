import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Bitácora: una entrada por aprendizaje colaborativo (AC1, AC2, …).
// Misma forma que la colección `weeks` del blog de Realidad Nacional para
// reutilizar PostCard, Cover, Gallery y Music sin cambios.
const bitacora = defineCollection({
  loader: glob({ base: 'src/content/bitacora', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      number: z.string(),
      order: z.number(),
      title: z.string(),
      topic: z.string(),
      date: z.string(),
      summary: z.string(),
      /** Sección del portafolio que alimenta esta entrada */
      section: z.string().default('Manifiesto'),
      surface: z
        .enum(['peach', 'mint', 'yellow', 'mustard', 'canvas'])
        .default('canvas'),
      authors: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      cover: z
        .object({
          src: image(),
          alt: z.string().default(''),
          credit: z.string().optional()
        })
        .optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().default(''),
            caption: z.string().optional(),
            credit: z.string().optional()
          })
        )
        .optional(),
      music: z
        .object({
          spotify: z.string().optional(),
          youtube: z.string().optional(),
          title: z.string().optional(),
          note: z.string().optional()
        })
        .optional()
    })
});

export const collections = { bitacora };
