import mongoose, { Schema, Document } from "mongoose";

import { hash } from 'bcrypt';

export interface IAddress {
  state: string;
  city: string;
  street: string;
  complement?: string;
  number: string;
  addressName: string;
  cep: string;
} 

export interface IContact {
  phone: string;
  telephone: string;
  email: string;
}

export interface IListPatients {
  _id: mongoose.Types.ObjectId;
}

export interface IUser extends Document {
  name: string;
  password: string;
  cpf: string;
  gender: "M" | "F" | "O";
  type_user: "EMPRESA";
  isAdmin: boolean; 
  contact: IContact;
  address: IAddress;
  enterprise: mongoose.Types.ObjectId;
  listPatients: IListPatients[];
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    type_user: {
      type: String,
      default: "EMPRESA"
    },
    cpf:{
      type: String,
    },
    listPatients: [{_id: Schema.Types.ObjectId}],
    enterprise: {
      type: Schema.Types.ObjectId,
      ref: 'enterprises'
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      phone:{
        type: String,
      },
      telephone:{
        type: String,
      },
    },
    address: {
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
        number: {
          type: String,
        },
        complement: {
          type: String,
        },
        addressName: {
          type: String,
        },
        cep: {
          type: String,
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

UserSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 8);
  next();
});

export const UserModel = mongoose.model('users', UserSchema);
