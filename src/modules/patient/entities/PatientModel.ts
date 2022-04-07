import mongoose, { Schema, Document } from "mongoose";

import { hash } from 'bcrypt';

export interface IAddress {
  numberAndComplement: string;
  street: string;
  cityAndComplement: string;
  addressName: string;
  cep: string;
  cityAndState: string;
} 

export interface IPatient {
  responsibleEnterpriseUser: mongoose.Types.ObjectId; 
  responsibleName: string;
  customerPortal: boolean;
  profession: string;
  heKnew: string;
  observation: string;
}

export interface IContact {
  phone: string;
  telephone: string;
  email: string;
}

export interface IPatient extends Document {
  name: string;
  password: string;
  cpf: string;
  matriculation: mongoose.Types.ObjectId;
  gender: "M" | "F" | "O";
  type_user: "EMPRESA" | "PACIENTE";
  birthDate: Date;
  isAdmin: boolean; 
  contact: IContact;
  address: IAddress;
  patientOpciones: IPatient;
}

const PatientSchema = new Schema<IPatient>(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    responsibleName: {
      type: String,
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
      default: 'PACIENTE'
    },
    cpf:{
      type: String,
    },
    matriculation: {
      type: Schema.Types.ObjectId,
      ref: 'matriculations'
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
        cityAndState: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
        numberAndComplement: {
          type: String,
        },
        addressName: {
          type: String,
        }, 
        cep: {
          type: String,
        }
    },
    patientOpciones: {
      responsibleEnterpriseUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      customerPortal: {
        type: Boolean,
        default: false,
      },
      profession: {
        type: String,
      },
      heKnew: {
        type: String,
      },
      observation: {
        type: String,
      },
      responsibleName:{
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

PatientSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 8);
  next();
});

export const PatientModel = mongoose.model('patients', PatientSchema);
