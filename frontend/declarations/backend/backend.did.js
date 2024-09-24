export const idlFactory = ({ IDL }) => {
  const Contact = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
  });
  return IDL.Service({
    'getContacts' : IDL.Func([], [IDL.Vec(Contact)], ['query']),
    'submitContact' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
