// const { addContact, listContacts, removeContact } = require("./contacts.js");

// async function main() {
//   try {
//     const newContact = await addContact(
//       "John Doe",
//       "john@example.com",
//       "1234567890"
//     );
//     console.log("New contact added:", newContact);

//     const contacts = await listContacts();
//     console.log("Contacts list:", contacts);

//     const contactIdToRemove = 1;
//     const removedContact = await removeContact(contactIdToRemove);
//     console.log("Removed contact:", removedContact);

//     const updatedContacts = await listContacts();
//     console.log("Updated contacts list:", updatedContacts);
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// main();
const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
