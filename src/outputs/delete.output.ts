import mongodb from 'mongodb';

export type DeleteOutput = {
  payload: mongodb.DeleteResult;
};
