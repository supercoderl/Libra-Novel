import * as z from 'zod';

export const profileSchema = z.object({
    firstname: z
        .string()
        .min(3, { message: 'Product Name must be at least 3 characters' }),
    lastname: z
        .string()
        .min(3, { message: 'Product Name must be at least 3 characters' }),
    email: z
        .string()
        .email({ message: 'Product Name must be at least 3 characters' }),
    contactno: z.coerce.number(),
    country: z.string().min(1, { message: 'Please select a category' }),
    city: z.string().min(1, { message: 'Please select a category' }),
    // jobs array is for the dynamic fields
    
});

export type ProfileFormValues = z.infer<typeof profileSchema>;