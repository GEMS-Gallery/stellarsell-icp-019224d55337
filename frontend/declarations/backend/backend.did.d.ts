import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Contact {
  'name' : string,
  'email' : string,
  'message' : string,
}
export interface _SERVICE {
  'getContacts' : ActorMethod<[], Array<Contact>>,
  'submitContact' : ActorMethod<[string, string, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
