import Joi from "joi"

export class Validate<T> {
  validateEmptyFields(fields: string[], data: T): string | undefined {
    return fields.find((field) => !(data as Record<string, any>)[field])
  }
}
export const saleSchema = Joi.object({
  name: Joi.string().min(3).max(32),
  description: Joi.string().min(3).max(32).required(),
  reference: Joi.string().min(3).max(10).required(),
  amount: Joi.number().min(1).required(),
  price: Joi.number().required(),
  deliveryValue: Joi.number().required(),
  total: Joi.number().required(),
  operation: Joi.boolean()
})