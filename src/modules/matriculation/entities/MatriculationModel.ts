import mongoose, { Schema, Document } from "mongoose";

interface IPaymentModel {
  enrollmentValue: number;
  billingMethod: "Semestral" | "Bimestral"
  enrollmentFee: number;
  expiryDay: number;
  firstPaymentDay: Date;
  enrollmentPlan: string;
  dueDate: Date,
}

interface ISessionsModel {
  sessionRoom: string;
  dayOfSessions: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
}

export interface IMatriculation extends Document {
  responsibleEnterpriseUser: mongoose.Types.ObjectId;
  patientName: mongoose.Types.ObjectId;
  physicalTherapist: string;
  dateMatriculation: Date;
  modality: string;
  observation: string;
  status: string;
  sessions: ISessionsModel;
  payment: IPaymentModel;
}
  

const MatriculationSchema = new Schema<IMatriculation>(
  {
    responsibleEnterpriseUser: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    patientName: {
      type: Schema.Types.ObjectId,
      ref: 'patients'
    },
    physicalTherapist: {
      type: String,
    },
    dateMatriculation: {
      type: Date,
      required: true,
    },
    modality: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
    },
    status: {
      type: String,
    },
    sessions: {
      dayOfSessions: {
        type: String,
        required: true,
      },
      sessionRoom: {
        type: String,
        required: true,
      },
      singleTime: {
        type: String,
        required: true,
        default: false,
      }
    },
    payment: {
      expiryDay: {
        type: Number,
        required: true,
      },
      firstPaymentDay: {
        type: Date,
      },
      enrollmentFee: {
        type: Number,
      },
      billingMethod: {
        type: String,
        required: true,
      },
      enrollmentValue: {
        type: Number,
      },
      enrollmentPlan: {
        type: String,
      },
      dueDate: {
        type: Date,
      }
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

export const MatriculationModel = mongoose.model('matriculations', MatriculationSchema);