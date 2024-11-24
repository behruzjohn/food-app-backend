import { model, Schema, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { PASSWORD_HASH_ROUNDS } from 'src/constants/auth';
import { RoleEnum } from 'src/enums/role.enum';
import { hash } from 'src/utils/bcrypt';
import { MODELS } from '../../constants/models';

const userSchema = new Schema(
  {
    photo: { type: String },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: Object.keys(RoleEnum),
      default: MODELS.USER,
    },
    telegramId: { type: String },
    phone: { type: String, validator: (v: string) => v.startsWith('+998') },
    favoriteFoods: [{ type: Types.ObjectId, ref: MODELS.FOOD }],
    password: { type: String },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, PASSWORD_HASH_ROUNDS);
  }
  next();
});

userSchema.plugin(mongoosePaginate);

export const User = model(MODELS.USER, userSchema);
