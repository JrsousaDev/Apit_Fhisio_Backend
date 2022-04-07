import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAddress {
  state: string;
  city: string;
  street: string;
  cep: string;
  number: string;
  addressName: string;
  country: 'BRASIL' | 'PORTUGAL'
} 

export interface IContact {
  phone: string;
  email: string;
}

export interface IEnterprise extends Document {
  responsibleUser: Types.ObjectId;
  regMunicipal: string;
  name: string;
  cnpj: string;
  responsibleName: string;
  address: IAddress;
  contact: IContact;
}
  

const EnterpriseSchema = new Schema<IEnterprise>(
  {
    responsibleUser: {
     type: Schema.Types.ObjectId, 
     ref: 'users',
     required: true,
   },
   regMunicipal: {
     type: String,
   },
   responsibleName: {
     type: String
   },
   name: {
    type: String,
    required: true
   },

   cnpj: {
    type: String,
   },
   contact: {
    email: {
      type: String,
      required: true
     },
     phone: {
      type: String
    },
   },
   address: {
     state:{
       type: String,
       required: true
     },
     city:{
       type: String,
       required: true, 
     },
     cep:{
       type: String,
       required: true, 
     },
     number:{
       type: String,
       required: true, 
     },
     addressName:{
       type: String,
       required: true, 
     },
     street:{
       type: String,
       required: true, 
     },
     country: {
       type: String,
       required: true, 
       default: 'brasil'
     }
   }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

export const EnterpriseModel = mongoose.model('enterprises', EnterpriseSchema);