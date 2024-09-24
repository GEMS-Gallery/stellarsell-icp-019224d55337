import Array "mo:base/Array";
import Text "mo:base/Text";
import Random "mo:base/Random";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Time "mo:base/Time";
import Blob "mo:base/Blob";

actor {
  type Contact = {
    name: Text;
    email: Text;
    message: Text;
  };

  stable var contacts : [Contact] = [];

  public func submitContact(name: Text, email: Text, message: Text) : async () {
    let newContact : Contact = {
      name = name;
      email = email;
      message = message;
    };
    contacts := Array.append(contacts, [newContact]);
  };

  public query func getContacts() : async [Contact] {
    contacts
  };

  // Updated function to generate random numbers for the memory game
  public func getRandomNumbers(count: Nat) : async [Nat] {
    let seed = Blob.fromArray(Array.freeze(Array.init<Nat8>(8, 0)));
    let rand = Random.Finite(seed);
    Array.tabulate<Nat>(count, func(_) {
      switch (rand.byte()) {
        case null { 0 };
        case (?byte) { Nat8.toNat(byte % 100) };
      }
    })
  };
}
