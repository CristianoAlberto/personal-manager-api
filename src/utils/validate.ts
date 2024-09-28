import Joi from "joi"

export class Validate<T>{
  validateEmptyFields(fields: string[], data: T): string | undefined {
    return fields.find((field) => !(data as Record<string, any>)[field])
  }
}


// codeEstablishment,admissionDate,employeeId,departmentCode,situation
export const userschema = Joi.object({
  employeeId: Joi.number().required(),
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
  phoneNumber: Joi.number().required(),
  gender: Joi.string().min(3).max(32).required(),
  address: Joi.string().min(5).max(32).required(),
  codeEstablishment: Joi.string().min(2).max(4).required(),
  admissionDate: Joi.date().required(),
  departmentCode: Joi.string().min(3).max(32).required(),
  situation: Joi.string().min(3).max(32).required(),
   mecCoordinator: Joi.string().min(3).max(32).required(),
})

export const userSchemaUpdate = Joi.object({
  employeeId: Joi.number(),
  name: Joi.string().min(3).max(32),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(100),
  phoneNumber: Joi.number(),
  gender: Joi.string().min(3).max(32),
  address: Joi.string().min(5).max(32),
  codeEstablishment: Joi.string().min(2).max(4),
  admissionDate: Joi.date(),
  departmentCode: Joi.string().min(3).max(32),
  situation: Joi.string().min(3).max(32),
  mecCoordinator: Joi.string().min(3).max(32),
  deletedAt: Joi.date()
})

export const taskschema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  description: Joi.string().min(5).max(65).required(),
  priority: Joi.number().required(),
  location: Joi.string().required(),
  hour: Joi.date().required()
})

export const companieSitesSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  adress: Joi.string().min(3).max(32).required(),
  workerNumber: Joi.number().required(),
  qtyMaterials: Joi.number().required(),
  qtyEquipment: Joi.number().required()
})

