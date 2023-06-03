export interface JwtPayload {
  tenant_id: string;
  user: string;
  roles?: string[];
  groups?: string[];
  permissions: Array<string>;
}
