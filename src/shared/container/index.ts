import { container } from 'tsyringe';

import IUserRepository from '../../modules/users/repositories/IUserRepository';
import UserRepository from '../../modules/users/infra/typeorm/repositories/UserRepository';

import IMembershipRepository from '../../modules/memberships/repositories/IMembershipRepository';
import MembershipRepository from '../../modules/memberships/infra/typeorm/repositories/MembershipRepository';

import IStudentRepository from '../../modules/students/repositories/IStudentRepository';
import StudentRepository from '../../modules/students/infra/typeorm/repositories/StudentRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IMembershipRepository>(
  'MembershipRepository',
  MembershipRepository,
);

container.registerSingleton<IStudentRepository>(
  'StudentRepository',
  StudentRepository,
);
