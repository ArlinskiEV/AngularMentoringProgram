import { AppState } from '../reducers';
import { User, Name } from '../entities';

export const appInitialState: AppState = {
  // user: new User()
  user: new User({
    id: 2905,
    token: '58ebfdf7ec92657b493b24da',
    name: new Name('Brock', 'Beasley'),
    login: 'Morales',
    password: 'id'
  }),
  course: [],
};
