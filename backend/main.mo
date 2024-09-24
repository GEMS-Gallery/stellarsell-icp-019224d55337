import Func "mo:base/Func";

import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
  // Define a type for contact submissions
  type Contact = {
    name: Text;
    email: Text;
    message: Text;
  };

  // Store contacts in a stable array
  stable var contacts : [Contact] = [];

  // Function to submit a new contact
  public func submitContact(name: Text, email: Text, message: Text) : async () {
    let newContact : Contact = {
      name = name;
      email = email;
      message = message;
    };
    contacts := Array.append(contacts, [newContact]);
  };

  // Function to get all contacts (for admin purposes)
  public query func getContacts() : async [Contact] {
    contacts
  };
}
