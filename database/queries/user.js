// const { from } = require("../../database");
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

/// look up, try on, 

const a=[1,2,3]
const b=[1,2,3]
console.log(a===b)

async function profile(id) {
  return await knex('user').join('wallet', { 'user.id': 'wallet.user_id' });
}

async function addWallet(name, balance, currency, cardnumber, user_id) {
  return await knex('wallet').insert({
    name: name,
    balance: balance,
    currency: currency,
    cardNumber: cardnumber,
    user_id: user_id
  })
}



async function transfer(sender, reciever, amount) {

  const fromBP = knex('wallet').select('balance').where({ cardNumber: sender });
  const toBP = knex('wallet').select('balance').where({ cardNumber: reciever });
  const [fromB, toB] = await Promise.all([fromBP, toBP])



  //outgoing from sender

  const send = Number(fromB[0].balance) - amount;
  await knex('wallet').where({ cardNumber: sender }).update({ balance: send })
  await knex('history').insert({
    cardnumber: sender,
    outgoing: amount
  });

  //incoming to receiver

  const recieve = Number(toB[0].balance) + amount;
  await knex('wallet').where({ cardNumber: reciever }).update({ balance: recieve })
  await knex('history').insert({
    cardnumber: reciever,
    incoming: amount
  })


}

async function transfersHistory(cardnumber) {
  return await knex('history').select('*').where({ cardnumber: cardnumber });
}


async function walletS(cardnumber) {
  return await knex('wallet').select('name', 'balance', 'currency').where({ cardNumber: cardnumber })
}


async function invoice(sender, receiver, amount, currency) {

  function cardHide(cardnumber) {
    const fullNumber = String(cardnumber);
    const last4Digits = fullNumber.slice(-4);
    return last4Digits.padStart(fullNumber.length, '*');
  }

  const senDer = cardHide(sender);
  const rec = cardHide(receiver);
  var datetime = new Date();

  await knex('invoice').insert({
    details: `From ${senDer} to ${rec} at ${datetime} `,
    amount: amount,
    currency: currency,
    sender: sender,
    receiver: receiver,

  })
}

async function getInvoice(cardnumber) {
  await knex('invoice').select('details', 'amount', 'currency').where({ sender: cardnumber })
}

module.exports = { getUser, createUser, profile, addWallet, transfer, walletS, transfersHistory, invoice, getInvoice };
