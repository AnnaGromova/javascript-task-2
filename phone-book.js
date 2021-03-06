'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
const isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = {};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function add(phone, name, email) {
    if (!name || !/^\d{10}$/.test(phone) || phoneBook[phone]) {
        return false;
    }
    phoneBook[phone] = { name, email };

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function update(phone, name, email) {
    if (!name || !phoneBook[phone]) {
        return false;
    }
    phoneBook[phone] = { name, email };

    return true;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
function findAndRemove(query) {
    let foundPhones = findPhones(query);
    foundPhones.forEach(phone => {
        delete phoneBook[phone];
    });

    return foundPhones.length;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
function find(query) {
    let foundPhones = sortByName(findPhones(query));

    return formatContacts(foundPhones);
}

function findPhones(query) {
    if (!query) {
        return [];
    }
    let foundPhones = Object.keys(phoneBook);
    if (query === '*') {
        return foundPhones;
    }

    return foundPhones.filter(phone => {
        let email = phoneBook[phone].email || '';

        return phone.includes(query) ||
            phoneBook[phone].name.includes(query) ||
            email.includes(query);
    });
}

function sortByName(records) {
    return records.sort((a, b) => phoneBook[a].name > phoneBook[b].name);
}

function formatContacts(phones) {
    return phones.map(phone => {
        let email = phoneBook[phone].email ? ', ' + phoneBook[phone].email : '';

        return phoneBook[phone].name +
        ', +7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) +
        '-' + phone.slice(6, 8) + '-' + phone.slice(8, 10) +
        email;
    });
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
function importFromCsv(csv) {
    let lines = csv.split('\n');
    let modifiedContacts = 0;
    lines.forEach(line => {
        let phone = line.split(';')[1];
        let name = line.split(';')[0];
        let email = line.split(';')[2];
        if (add(phone, name, email) || update(phone, name, email)) {
            modifiedContacts++;
        }
    });

    return modifiedContacts;
}

module.exports = {
    add,
    update,
    findAndRemove,
    find,
    importFromCsv,

    isStar
};
