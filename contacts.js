const fs = require("fs");
const path = require("path");

const contactsPath = path.normalize(
  path.join(__dirname, "db", "contacts.json")
);
console.log(contactsPath);

function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFileAsync(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, "utf8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function listContacts() {
  return JSON.parse(await readFileAsync(contactsPath));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContact = contacts.find((contact) => contact.id === contactId);

  if (!removedContact) return null;

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  try {
    await writeFileAsync(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return removedContact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: Date.now(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);

  try {
    await writeFileAsync(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };
