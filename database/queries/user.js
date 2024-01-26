const { from } = require("../../database");
const { knex } = require("../knex");

async function getUser(username) {
  return await knex("user").select("*").where({ username }).first();
}

async function createUser(fullname, usern, email) {
  return knex("user").insert({
    fullName: fullname,
    userName: usern,
    email: email,
  });
}

async function profile(username) {
  return await knex('user').join('wallet', { 'user.id': 'wallet.id' });
}

async function addWallet(name, balance, currency, cardnumber) {
  return await knex('wallet').insert({
    name: name,
    balance: balance,
    currency: currency,
    cardNumber: cardnumber
  })
}



async function transfer(sender, reciever, amount) {

  const fromB = await knex('wallet').select('balance').where({ cardNumber: sender });

  const toB = await knex('wallet').select('balance').where({ cardNumber: reciever });


  //outgoing from sender

  const send = Number(fromB[0].balance) - amount;
  await knex('wallet').where({ cardNumber: sender }).update({ balance: send })
  await knex('history').insert({
    cardnumber:sender,
    outgoing:amount
  });

  //incoming to receiver

  const recieve = Number(toB[0].balance) + amount;
  await knex('wallet').where({ cardNumber: reciever }).update({ balance: recieve })
  await knex('history').insert({
    cardnumber:reciever,
    incoming:amount
  })


}

async function transfersHistory(cardnumber){
  return await knex('history').select('*').where({cardnumber:cardnumber});
}


async function walletS(cardnumber) {
  return await knex('wallet').select('name', 'balance', 'currency').where({ cardNumber: cardnumber })
}

module.exports = { getUser, createUser, profile, addWallet, transfer, walletS, transfersHistory};
