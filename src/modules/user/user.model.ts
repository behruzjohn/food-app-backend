import { model, Schema, Types } from 'mongoose';
import { MODELS } from '../../constants/models';
import { UserRoleEnum } from 'src/enums/userRole.enum';
import mongoosePaginate from 'mongoose-paginate-v2';
import { hash } from 'src/utils/bcrypt';
import { PASSWORD_HASH_ROUNDS } from 'src/constants/auth';

const userSchema = new Schema({
  photo: { type: String },
  name: { type: String, required: true },
  role: { type: String, enum: Object.keys(UserRoleEnum), required: true },
  telegramId: { type: String },
  phone: {
    type: String,
    validator: (v: string) => v.startsWith('+998'),
  },
  favoriteFoods: {
    type: [{ type: Types.ObjectId, ref: MODELS.FOOD }],
    default: [],
  },
  password: { type: String },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, PASSWORD_HASH_ROUNDS);
  }
  next();
});

userSchema.plugin(mongoosePaginate);

export const User = model(MODELS.USER, userSchema);
