export class Farmer {
   id?: number;
   fullName: string;
   email?: string;
   password: string;
   phone: string;
   admin?: boolean;
   activate?: boolean;
   avatar?: string;
   role?: Role;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN"
}
