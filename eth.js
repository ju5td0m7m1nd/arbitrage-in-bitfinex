import BFX from "bitfinex-api-node";

const coinList = [
  "ltc",
  "eth",
  "etc",
  "rrt",
  "zec",
  "xmr",
  "dsh",
  "bcc",
  "bcu",
  "xrp",
  "iot",
  "eos",
  "san",
  "omg",
  "bch",
  "neo",
  "etp",
  "qtm",
  "bt1",
  "bt2",
  "avt",
  "edo",
  "btg",
  "dat",
  "qsh",
  "yyw"
];

const pairList_USD = [
  "btcusd",
  "ltcusd",
  "ethusd",
  "etcusd",
  "rrtusd",
  "zecusd",
  "xmrusd",
  "dshusd",
  "bccusd",
  "bcuusd",
  "xrpusd",
  "iotusd",
  "eosusd",
  "sanusd",
  "omgusd",
  "bchusd",
  "neousd",
  "etpusd",
  "qtmusd",
  "bt1usd",
  "bt2usd",
  "avtusd",
  "edousd",
  "btgusd",
  "datusd",
  "qshusd",
  "yywusd"
];

const pairList_ETH = [
  "ioteth",
  "eoseth",
  "saneth",
  "omgeth",
  "bcheth",
  "neoeth",
  "etpeth",
  "qtmeth",
  "avteth",
  "edoeth",
  "dateth",
  "qsheth",
  "yyweth"
];

const pairList_BTC = [
  "ltcbtc",
  "ethbtc",
  "etcbtc",
  "rrtbtc",
  "zecbtc",
  "xmrbtc",
  "dshbtc",
  "bccbtc",
  "bcubtc",
  "xrpbtc",
  "iotbtc",
  "eosbtc",
  "sanbtc",
  "omgbtc",
  "bchbtc",
  "neobtc",
  "etpbtc",
  "qtmbtc",
  "bt1btc",
  "bt2btc",
  "avtbtc",
  "edobtc",
  "btgbtc",
  "datbtc",
  "qshbtc",
  "yywbtc"
];

const coin_BTC2USD = {};

const initCoin = () => {
  coinList.forEach(coinId =>
    Object.assign(coin_BTC2USD, {
      [coinId]: {
        bid: {
          usd: 0,
          btc: 0,
          ratio: 0
        },
        ask: {
          usd: 0,
          btc: 0,
          ratio: 0
        }
      }
    })
  );
};

initCoin();

const cb = response => {
  console.log(response);
};

const opts = {
  version: 2,
  transform: true
};

const bws = new BFX(
  "aUZKjyEDAzranUPPJRySrJGpzzim6RHeHpR526dOj57",
  "oldv0oz8ZbKLrgUuZwqbYHQ7EtaDzXY4Y35KLjMGJb0",
  opts
).ws;

const bfx = new BFX(
  "aUZKjyEDAzranUPPJRySrJGpzzim6RHeHpR526dOj57",
  "oldv0oz8ZbKLrgUuZwqbYHQ7EtaDzXY4Y35KLjMGJb0",
  opts
);

//bfx.rest.ticker('tBTCUSD',  (error, response, body) => console.log(response))

/*
const getCoinTicket = async () => {
  const timestamp = new Date();
  //console.log(timestamp);
  const firstBatch = await batchRequest(
    0,
    Math.floor(pairList_USD.length / 3),
    pairList_USD,
    0
  );

  const secondBatch = await batchRequest(
    Math.ceil(pairList_USD.length / 3),
    Math.floor(pairList_USD.length * (2 / 3)),
    pairList_USD,
    Math.floor(pairList_USD.length / 3) * 100
  );
  const third = await batchRequest(
    Math.floor(pairList_USD.length * (2 / 3)),
    pairList_USD.length,
    pairList_USD,
    Math.floor(pairList_USD.length * (2 / 3)) * 100
  );

  const btcfirstBatch = await batchRequest(
    0,
    Math.floor(pairList_BTC.length / 3),
    pairList_BTC,
    1000
  );

  const  btcsecondBatch = await batchRequest(
    Math.ceil(pairList_BTC.length / 3),
    Math.floor(pairList_BTC.length * (2 / 3)),
    pairList_BTC,
    1000 + Math.floor(pairList_BTC.length / 3) * 100
  );
  const  btcthird = await batchRequest(
    Math.floor(pairList_BTC.length * (2 / 3)),
    pairList_BTC.length,
    pairList_BTC,
    1000 + Math.floor(pairList_BTC.length * (2 / 3)) * 100
  );
};

const batchRequest = (start, end, coinArray, startTime) => {
  return new Promise((resolve, reject) => {
    let posttime = startTime;
    const coinStream = coinArray.slice(start, end).map(item => {
      posttime += 100;
      return ticketFunc(item, posttime);
    });
    Promise.all(coinStream).then(() => {
      resolve();
    });
  });
};

const ticketFunc = (key, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      bfx.rest.ticker(`t${key.toUpperCase()}`, (error, response, body) => {
        console.log(`${key} ${response.LAST_PRICE}`);
        resolve();
      });
    }, time);
  });
};

getCoinTicket();
*/

bws.on("auth", () => {
  // emitted after .auth()
  // needed for private api endpoints

  console.log("authenticated");
  // bws.submitOrder ...
});

bws.on("open", () => {
  pairList_USD.forEach(item => {
    bws.subscribeTicker(item);
    //bws.subscribeOrderBook(item)
    //bws.subscribeTrades(item)
  });
  pairList_ETH.forEach(item => {
    bws.subscribeTicker(item);
    //bws.subscribeOrderBook(item)
    //bws.subscribeTrades(item)
  });
  pairList_BTC.forEach(item => {
    bws.subscribeTicker(item);
    //bws.subscribeOrderBook(item)
    //bws.subscribeTrades(item)
  });
});
bws.on("ticker", (pair, ticker) => {
  //console.log(ticker)
  const coinType = pair.slice(1, 4).toLowerCase();
  const dollar = pair.slice(4, 7).toLowerCase();
  console.log(dollar)
  if (
    Object.keys(coin_BTC2USD).indexOf(coinType) > -1 &&
    ticker.VOLUME > 100000
  ) {
    coin_BTC2USD[coinType]["ask"][dollar] = ticker.ASK;
    coin_BTC2USD[coinType]["bid"][dollar] = ticker.BID;
    //console.log(`${coinType} ${dollar} ${ticker.LAST_PRICE}`);
  }
});

const GET_COIN_RATIO = () => {
  //console.log(new Date());
  Object.keys(coin_BTC2USD).forEach(item => {
    if (
      coin_BTC2USD[item]["ask"]["usd"] !== 0 &&
      coin_BTC2USD[item]["ask"]["btc"] !== 0 &&
      coin_BTC2USD[item]["bid"]["usd"] !== 0 &&
      coin_BTC2USD[item]["bid"]["btc"] !== 0
    ) {
      coin_BTC2USD[item]["ask"]["ratio"] =
        coin_BTC2USD[item]["bid"]["btc"] / coin_BTC2USD[item]["ask"]["usd"];
      coin_BTC2USD[item]["bid"]["ratio"] =
        coin_BTC2USD[item]["bid"]["usd"] / coin_BTC2USD[item]["ask"]["btc"];
      // console.log(
      //   `${item} ${coin_BTC2USD[item]["usd"] / coin_BTC2USD[item]["btc"]}`
      // );
    }
  });
};
var usd =50;
const arbitrage = () => {
  const keys = Object.keys(coin_BTC2USD);
  const arbitrageRank = [];
  keys.map(item => {
    if (
      coin_BTC2USD[item]["ask"]["usd"] !== 0 &&
      coin_BTC2USD[item]["ask"]["btc"] !== 0 &&
      coin_BTC2USD[item]["bid"]["usd"] !== 0 &&
      coin_BTC2USD[item]["bid"]["btc"] !== 0
    ) {
      keys.map(key => {
        const profitMargin =
          coin_BTC2USD[item]["ask"]["ratio"] *
          coin_BTC2USD[key]["bid"]["ratio"];
        if (profitMargin > 1) {
          arbitrageRank.push(
            `${item} -> ${key} : ${(profitMargin - 1).toFixed(4) * 100}% `
          );
        }
      });
      // console.log(
      //   `${item} ${coin_BTC2USD[item]["usd"] / coin_BTC2USD[item]["btc"]}`
      // );
    }
  });
  arbitrageRank.sort((a, b) => {
    if (a.split(": ")[1].split("%")[0] > b.split(": ")[1].split("%")[0]) {
      return -1;
    } else {
      return 1;
    }
  });
  try {
    console.log(arbitrageRank.slice(1, 6));
    usdFlow(
      usd,
      arbitrageRank[2].split(" -> ")[0],
      arbitrageRank[2].split(" -> ")[1].split(" ")[0]
    ).then(profit => {});
  } catch (err) {}
};

const usdFlow = (usd, aCoin, bCoin) => {
  return new Promise((resolve, reject) => {
    const a2USD = coin_BTC2USD[aCoin]["ask"]["usd"];
    const a2BTC = coin_BTC2USD[aCoin]["bid"]["btc"];

    const aPhase1 = usd / a2USD * 0.998;
    const aPhase2 = aPhase1 * a2BTC * 0.998;

    const b2USD = coin_BTC2USD[bCoin]["bid"]["usd"];
    const b2BTC = coin_BTC2USD[bCoin]["ask"]["btc"];

    const bPhase1 = aPhase2 / b2BTC * 0.998;
    const bPhase2 = bPhase1 * b2USD * 0.998;

    console.log(
      `USD: ${usd} -> ${aPhase1} -> ${aPhase2} -> ${bPhase1} -> ${bPhase2}`
    );
    //resolve(bPhase2)
  });
};
//setInterval(GET_COIN_RATIO, 1000);
//setInterval(arbitrage, 1000);
                                  