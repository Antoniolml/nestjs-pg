import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/constants/ket-decorators';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
