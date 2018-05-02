export interface ServerType {
  type: string;
}

export enum ServerTypes {
  ID = 'ID',
  GENERALL = 'GENERALL'
}

/* tslint:disable:max-classes-per-file */

export class ServerId implements ServerType {
  public readonly type = ServerTypes.ID;
  constructor(public id: number) {}
}

export class ServerInfo implements ServerType {
  public readonly type = ServerTypes.GENERALL;
  public sort: any = null;
  public query: any = null;
  constructor(public start: number, public count: number) {}
}

/* tslint:enable */
export type ServerQuery =
  | ServerId
  | ServerInfo
  ;
