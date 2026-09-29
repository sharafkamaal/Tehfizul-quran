import { z } from 'zod';

/**
 * Error messages are translation keys under `form.errors` in /content/*.json,
 * so the same schema can be used on the client (localised) and on the server.
 */
const phone = z
  .string()
  .trim()
  .min(1, 'required')
  .regex(/^\+?[0-9\s-]{8,16}$/, 'phone');

const text = (max: number) => z.string().trim().min(1, 'required').max(max, 'tooLong');

export const contactSchema = z.object({
  type: z.literal('contact'),
  name: text(100),
  phone,
  email: z.union([z.literal(''), z.string().trim().email('email').max(150, 'tooLong')]),
  subject: text(150),
  message: z.string().trim().min(1, 'required').min(10, 'tooShort').max(3000, 'tooLong'),
  company: z.string().max(0).optional(), // honeypot – must stay empty
});

export const admissionSchema = z.object({
  type: z.literal('admission'),
  studentName: text(100),
  parentName: text(100),
  phone,
  department: text(50),
  message: z.string().trim().max(3000, 'tooLong').optional().default(''),
  company: z.string().max(0).optional(),
});

export const enquirySchema = z.discriminatedUnion('type', [contactSchema, admissionSchema]);

export type ContactInput = z.infer<typeof contactSchema>;
export type AdmissionInput = z.infer<typeof admissionSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
