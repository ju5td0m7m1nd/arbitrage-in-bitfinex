import BFX from "bitfinex-api-node";

const apiKey='put your api key here'
const apiSecretKey='put your api secret key here'

const bfxRest = new BFX(apiKey, apiSecretKey, { version: 1 }).rest;

const placeOrder = (usd, usdInA, btcOutA, btcInB, usdOutB, startAmount, bBitBTC) => {
  console.log(`Start amount: ${startAmount}`)
  bfxRest.new_order(
    usdInA,
    startAmount,
    "123456",
    "bitfinex",
    "buy",
    "exchange market",
    (err, res) => {
      if (err) console.log(err);
      else {
        console.log(`${usdInA} done, at price: ${res.price}, amount: ${startAmount}`)
         console.log(res)
        const price = res.price;
        //const usdInA_amount = usd / price * 0.998;
        //const usdInA_amount

        bfxRest.new_order(
          btcOutA,
          startAmount,
          "123456",
          "bitfinex",
          "sell",
          "exchange market",
          (err, res) => {
            if (err) console.log(err);
            else {
              console.log(`${btcOutA} done, at price: ${res.price}, amount: ${startAmount}`)
              const price = res.price;
              console.log(res)
              const startBTC = startAmount * price * 0.998;
              const bAmount = ( (startBTC*0.998) / bBitBTC).toString()
             
              bfxRest.new_order(
                btcInB,
                bAmount,
                "123456",
                "bitfinex",
                "buy",
                "exchange market",
                (err, res) => {
                  if (err) console.log(err);
                  else {
                    console.log(`${btcInB} done, at price: ${res.price}, amount: ${bAmount}`)
                     console.log(res)
                    // const price = res.price;
                    // const btcInB_amount = btcOutA_amount / price  * 0.998;
                    bfxRest.new_order(
                      usdOutB,
                      bAmount,
                      "123456",
                      "bitfinex",
                      "sell",
                      "exchange market",
                      (err, res) => {
                        if (err) console.log(err);
                        else {
                           console.log(`${usdOutB} done`)
                          console.log("Arbitrage Done")
                          console.log(res)
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

export default placeOrder;
